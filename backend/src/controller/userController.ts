import { Request, Response } from "express";
import { prisma } from "../prisma/prisma";

export const getUserProfile = async (req: Request, res: Response) => {
    try {
        const userId = (req as any).userId; // ID do usuário autenticado

        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                email: true,
                createdAt: true,
                streak: { select: { streak: true, lastOpened: true } },
                opens: { 
                    select: { openedAt: true }  //  Agora retorna todas as aberturas do usuário
                }
            }
        });

        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        res.json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Erro ao buscar perfil do usuário" });
    }
};
