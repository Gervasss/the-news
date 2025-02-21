const { PrismaClient } = require('@prisma/client');
import { Request, Response } from "express";
const prisma = new PrismaClient();

// Criar uma nova mensagem

export const createMensagem = async (req:Request, res:Response) => {
    try {
        const { conteudo, userId } = req.body;
        const mensagem = await prisma.mensagem.create({
            data: { conteudo, userId }
        });
        res.status(201).json(mensagem);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao criar mensagem' });
    }
};

// Obter todas as mensagens

export const getMensagens = async (req:Request, res:Response) => {
    try {
        const mensagens = await prisma.mensagem.findMany();
        res.status(200).json(mensagens);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar mensagens' });
    }
};

// Obter uma mensagem por ID

export const getMensagemById = async (req:Request, res:Response) => {
    try {
        const { id } = req.params;
        const mensagem = await prisma.mensagem.findUnique({
            where: { id: parseInt(id) }
        });
        if (!mensagem) return res.status(404).json({ error: 'Mensagem não encontrada' });
        res.status(200).json(mensagem);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar mensagem' });
    }
};

// Atualizar uma mensagem

 
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

// Deletar uma mensagem

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