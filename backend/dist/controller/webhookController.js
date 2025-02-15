import { prisma } from "../prisma/prisma";
export const processWebhook = async (req, res) => {
    const { email, id: postId } = req.body;
    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
        user = await prisma.user.create({ data: { email } });
    }
    let newsletter = await prisma.newsletter.findUnique({ where: { postId } });
    if (!newsletter) {
        newsletter = await prisma.newsletter.create({ data: { postId, sentAt: new Date() } });
    }
    const existingOpen = await prisma.newsletterOpen.findFirst({
        where: { userId: user.id, newsletterId: newsletter.id },
    });
    if (!existingOpen) {
        await prisma.newsletterOpen.create({ data: { userId: user.id, newsletterId: newsletter.id } });
        const lastStreak = await prisma.userStreak.findFirst({ where: { userId: user.id } });
        if (!lastStreak || new Date(lastStreak.lastOpened).getDate() !== new Date().getDate() - 1) {
            await prisma.userStreak.upsert({
                where: { userId: user.id },
                update: { streak: 1, lastOpened: new Date() },
                create: { userId: user.id, streak: 1, lastOpened: new Date() },
            });
        }
        else {
            await prisma.userStreak.update({
                where: { userId: user.id },
                data: { streak: lastStreak.streak + 1, lastOpened: new Date() },
            });
        }
    }
    res.status(200).json({ message: "Registro atualizado!" });
};
