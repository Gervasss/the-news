import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization?.split(" ")[1];
    console.log("🛡 Token recebido:", req.headers.authorization);


    if (!token) {
        return res.status(401).json({ error: "Token não fornecido" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as { userId: number };
        (req as any).userId = decoded.userId; // Armazena o ID do usuário na requisição
        next();
    } catch (error) {
        return res.status(401).json({ error: "Token inválido" });
    }
};
