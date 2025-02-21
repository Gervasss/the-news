import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";
import dayjs from "dayjs";

export const processWebhook = async (req: Request, res: Response) => {
    try {
        console.log("📩 Webhook recebido!", req.body);

        const { email, id: postId } = req.body;
        if (!email || !postId) {
            return res.status(400).json({ error: "Email e ID da newsletter são obrigatórios!" });
        }

        // Verifica se o usuário já existe, se não, cria
        let user = await prisma.user.findUnique({ where: { email } });
        if (!user) {
            user = await prisma.user.create({ data: { email } });
        }

        // Verifica se a newsletter já existe, se não, cria
        let newsletter = await prisma.newsletter.findUnique({ where: { postId } });
        if (!newsletter) {
            newsletter = await prisma.newsletter.create({ data: { postId, sentAt: new Date() } });
        }

        // Verifica se já existe um registro de abertura para essa newsletter
        const existingOpen = await prisma.newsletterOpen.findFirst({
            where: { userId: user.id, newsletterId: newsletter.id },
        });

        if (!existingOpen) {
            await prisma.newsletterOpen.create({
                data: { userId: user.id, newsletterId: newsletter.id },
            });

            // Obtém a data atual e ignora domingos
            const today = dayjs().startOf("day");
            const todayDayOfWeek = today.day(); // 0 = domingo, 1 = segunda, ..., 6 = sábado

            if (todayDayOfWeek === 0) {
                console.log(" Hoje é domingo, streak não atualizado.");
                return res.status(200).json({ message: "Hoje é domingo, streak não atualizado." });
            }

            // Obtém o streak do usuário
            let userStreak = await prisma.userStreak.findUnique({ where: { userId: user.id } });

            if (!userStreak) {
                // Se não existe um streak, cria um novo
                await prisma.userStreak.create({
                    data: { userId: user.id, streak: 1, lastOpened: today.toDate() },
                });
            } else {
                const lastOpened = dayjs(userStreak.lastOpened).startOf("day");
                const lastOpenedDayOfWeek = lastOpened.day();

                // Se o último streak foi no sábado, e hoje é segunda, continua
                const isConsecutiveMonday =
                    lastOpenedDayOfWeek === 6 && todayDayOfWeek === 1 && lastOpened.add(2, "day").isSame(today, "day");

                // Se ontem foi um dia válido (segunda a sexta) e a sequência continua
                const isConsecutiveDay =
                    lastOpened.add(1, "day").isSame(today, "day") && lastOpenedDayOfWeek !== 6;

                if (isConsecutiveMonday || isConsecutiveDay) {
                    // Se a sequência continua, incrementa o streak
                    await prisma.userStreak.update({
                        where: { userId: user.id },
                        data: { streak: userStreak.streak + 1, lastOpened: today.toDate() },
                    });
                } else {
                    // Se houve quebra (ignora domingo), reseta para 1
                    await prisma.userStreak.update({
                        where: { userId: user.id },
                        data: { streak: 1, lastOpened: today.toDate() },
                    });
                }
            }
        }

        console.log(`✅ Webhook processado com sucesso para: ${email}`);
        return res.status(200).json({ message: "Registro atualizado!" });

    } catch (error) {
        console.error("Erro ao processar webhook:", error);
        return res.status(500).json({ error: "Erro interno ao processar webhook." });
    }
};
