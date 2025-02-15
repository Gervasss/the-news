import { prisma } from "../prisma/prisma";
export const getMetrics = async (req, res) => {
    const totalUsers = await prisma.user.count();
    const totalOpens = await prisma.newsletterOpen.count();
    const topUsers = await prisma.userStreak.findMany({
        orderBy: { streak: "desc" },
        take: 10,
        include: { user: true },
    });
    res.json({ totalUsers, totalOpens, topUsers });
};
