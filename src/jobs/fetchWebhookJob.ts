import { Request, Response } from "express";

export const receiveWebhook = async (req: Request, res: Response) => {
    console.log("📩 Webhook recebido!");
    console.log("📨 Dados recebidos:", req.body);

    const { email } = req.body;

    if (!email) {
        console.error("❌ Erro: Email não encontrado!");
        return res.status(400).json({ error: "Email é obrigatório." });
    }

    console.log(`✅ Webhook processado para: ${email}`);
    return res.status(200).json({ message: "Webhook recebido com sucesso!" });
};
