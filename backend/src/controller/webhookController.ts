import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";
import dayjs from "dayjs";

export const processWebhook = async (req: Request, res: Response) => {
  try {
    // Extraindo os parâmetros da query string
    const { email, id: postId } =  req.query;

    if (!email || !postId) {
      return res.status(400).json({ error: "Email e ID da newsletter são obrigatórios!" });
    }

    console.log("📩 Webhook recebido!", { email, postId });

    // Converta os valores para string, se necessário
    const emailStr = String(email);
    const postIdStr = String(postId);

    // Busca ou cria o usuário
    let user = await prisma.user.findUnique({ where: { email: emailStr } });
    if (!user) {
      user = await prisma.user.create({ data: { email: emailStr } });
    }

    // Busca ou cria a newsletter
    let newsletter = await prisma.newsletter.findUnique({ where: { postId: postIdStr } });
    if (!newsletter) {
      newsletter = await prisma.newsletter.create({ data: { postId: postIdStr, sentAt: new Date() } });
    }

    // Verifica se já existe um registro de abertura para essa newsletter pelo usuário
    const existingOpen = await prisma.newsletterOpen.findFirst({
      where: { userId: user.id, newsletterId: newsletter.id },
    });

    let updatedUserStreak = null;
    if (!existingOpen) {
      // Cria o registro de abertura
      await prisma.newsletterOpen.create({
        data: { userId: user.id, newsletterId: newsletter.id },
      });

      // Obtém a data atual e ignora domingos para atualização de streak
      const today = dayjs().startOf("day");
      const todayDayOfWeek = today.day(); // 0 = domingo, 1 = segunda, etc.

      if (todayDayOfWeek !== 0) { // Se não for domingo, atualiza o streak
        let userStreak = await prisma.userStreak.findUnique({ where: { userId: user.id } });

        if (!userStreak) {
          userStreak = await prisma.userStreak.create({
            data: { userId: user.id, streak: 1, lastOpened: today.toDate() },
          });
        } else {
          const lastOpened = dayjs(userStreak.lastOpened).startOf("day");
          const lastOpenedDayOfWeek = lastOpened.day();

          const isConsecutiveMonday =
            lastOpenedDayOfWeek === 6 &&
            todayDayOfWeek === 1 &&
            lastOpened.add(2, "day").isSame(today, "day");

          const isConsecutiveDay =
            lastOpened.add(1, "day").isSame(today, "day") &&
            lastOpenedDayOfWeek !== 6;

          if (isConsecutiveMonday || isConsecutiveDay) {
            userStreak = await prisma.userStreak.update({
              where: { userId: user.id },
              data: { streak: userStreak.streak + 1, lastOpened: today.toDate() },
            });
          } else {
            userStreak = await prisma.userStreak.update({
              where: { userId: user.id },
              data: { streak: 1, lastOpened: today.toDate() },
            });
          }
        }
        updatedUserStreak = userStreak;
      } else {
        console.log("Hoje é domingo, streak não atualizado.");
        updatedUserStreak = await prisma.userStreak.findUnique({ where: { userId: user.id } });
      }
    } else {
      // Se o registro já existe, apenas recupera o streak atual
      updatedUserStreak = await prisma.userStreak.findUnique({ where: { userId: user.id } });
    }

    // Consulta as aberturas da newsletter usando o campo "openedAt"
    const newsletterOpens = await prisma.newsletterOpen.findMany({
      where: { newsletterId: newsletter.id },
      orderBy: { openedAt: "asc" },
    });

    // Monta o objeto de resposta com todas as informações necessárias
    const responseData = {
      message: "Registro atualizado!",
      user: {
        id: user.id,
        email: user.email,
      },
      streak: updatedUserStreak, // Contém os campos "streak" e "lastOpened"
      newsletter: {
        id: newsletter.id,
        postId: newsletter.postId,
        sentAt: newsletter.sentAt,
        totalOpens: newsletterOpens.length,
        opens: newsletterOpens.map((open) => ({
          userId: open.userId,
          openedAt: open.openedAt,
        })),
      },
    };

    console.log(`✅ Webhook processado com sucesso para: ${emailStr}`);
    return res.status(200).json(responseData);
  } catch (error) {
    console.error("Erro ao processar webhook:", error);
    return res.status(500).json({ error: "Erro interno ao processar webhook." });
  }
};
