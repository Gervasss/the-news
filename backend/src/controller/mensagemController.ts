const { PrismaClient } = require('@prisma/client');
import { Request, Response } from "express";
const prisma = new PrismaClient();

export const createMensagem = async (req: Request, res: Response) => {
    try {
        const { conteudo, userId } = req.body;

        console.log("Recebido:", { conteudo, userId }); // Adiciona log para ver o que chega

        const mensagem = await prisma.mensagem.create({
            data: { conteudo, userId }
        });

        res.status(201).json(mensagem);
    } catch (error) {
        console.error("Erro ao criar mensagem:", error); // Mostra erro detalhado
        res.status(500).json({ error: "Erro ao criar mensagem", details: error });
    }
};



export const getMensagens = async (req:Request, res:Response) => {
    try {
        const mensagens = await prisma.mensagem.findMany();
        res.status(200).json(mensagens);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar mensagens' });
    }
};
export const getMensagemById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: "ID inválido. Deve ser um número." });
        }

        const mensagem = await prisma.mensagem.findUnique({
            where: { id }
        });

        if (!mensagem) {
            return res.status(404).json({ error: "Mensagem não encontrada" });
        }

        return res.status(200).json(mensagem);
    } catch (error) {
        console.error("Erro ao buscar mensagem:", error);
        return res.status(500).json({ error: "Erro ao buscar mensagem." });
    }
};



export const updateMensagem = async (req:Request, res:Response) => {
    try {
        const { id } = req.params;
        const { conteudo } = req.body;
        const mensagem = await prisma.mensagem.update({
            where: { id: parseInt(id) },
            data: { conteudo }
        });
        res.status(200).json(mensagem);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao atualizar mensagem' });
    }
};
export const deleteMensagem = async (req:Request, res:Response) => {
    try {
        const { id } = req.params;
        await prisma.mensagem.delete({
            where: { id: parseInt(id) }
        });
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar mensagem' });
    }
};