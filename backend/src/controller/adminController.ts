import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";

export const getMetrics = async (req: Request, res: Response) => {
    try {
        const totalUsers = await prisma.user.count();
        const totalOpens = await prisma.newsletterOpen.count();

        // Buscar os 10 usuários com maior streak
        const topUsers = await prisma.user.findMany({
            include: {
                streak: true, 
            },
            orderBy: {
                streak: {
                    streak: "desc"
                }
            },
            take: 10,
        });

        // Buscar os newsletters mais abertos
        const newsletterStats = await prisma.newsletter.findMany({
            include: {
                opens: true,
            },
        });

        // Formata os dados de usuários
        const formattedUsers = topUsers.map(user => ({
            email: user.email,
            streak: user.streak?.streak || 0, // Se não tiver streak, coloca 0
            lastOpened: user.streak?.lastOpened || null,
        }));

        // Formata os dados das newsletters
        const formattedNewsletters = newsletterStats
            .map(newsletter => ({
                postId: newsletter.postId, 
                openCount: newsletter.opens.length, 
            }))
            .sort((a, b) => b.openCount - a.openCount); 

        res.json({
            totalUsers,
            totalOpens,
            topUsers: formattedUsers,
            newsletterStats: formattedNewsletters, 
        });
    } catch (error) {
        console.error("Erro ao buscar métricas:", error);
        res.status(500).json({ error: "Erro ao buscar métricas." });
    }
};
