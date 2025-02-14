import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";

export const getUserStreak = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId; // Obtém o ID do usuário autenticado

        const streak = await prisma.userStreak.findUnique({
            where: { userId },
            select: { streak: true, lastOpened: true },
        });

        if (!streak) {
            return res.status(404).json({ message: "Nenhum streak encontrado para este usuário." });
        }

        res.json({ streak: streak.streak, lastOpened: streak.lastOpened });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar streak do usuário." });
    }
};
