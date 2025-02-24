import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";

export const getUserStreak = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId; // Obtém o ID do usuário autenticado
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                createdAt: true,
                streak: {
                    select: { streak: true, lastOpened: true }
                },
                opens: {
                    select: {
                        openedAt: true
                    },
                    orderBy: {
                        openedAt: "desc"
                    }
                }
            }
        });
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }
        res.json({
            id: user.id,
            email: user.email,
            createdAt: user.createdAt,
            streak: user.streak || { streak: 0, lastOpened: null }, // Garante que o streak sempre tenha valores
            history: user.opens // Adiciona o histórico de aberturas
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar perfil do usuário" });
    }
};
