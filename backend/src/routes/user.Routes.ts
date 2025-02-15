import express from "express";
import { getUserProfile } from "../controller/userController";
import { authMiddleware } from "../middlewares/authMiddlewares"; 

const router = express.Router();

//  Rota para buscar informações do usuário autenticado
router.get("/profile", authMiddleware as any, getUserProfile as any) ;

export default router;
