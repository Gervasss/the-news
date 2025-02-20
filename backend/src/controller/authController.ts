import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { prisma } from "../prisma/prisma";

export const loginOrRegister = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email } = req.body;

        if (!email) {
            res.status(400).json({ error: "E-mail é obrigatório." });
            return;
        }

       
        let user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            res.status(401).json({ error: "E-mail não cadastrado." });
            return;
        }

        //  Gera o token JWT e retorna os dados do usuário
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string, { expiresIn: "7d" });

        res.json({ token, user });
    } catch (error) {
        console.error("Erro no login:", error);
        res.status(500).json({ error: "Erro interno no servidor." });
    }
};
