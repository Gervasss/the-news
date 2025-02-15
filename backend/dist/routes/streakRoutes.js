import express from "express";
import { getUserStreak } from "../controller/streakController";
import { authMiddleware } from "../middlewares/authMiddlewares";
const router = express.Router();
// 🔹 Rota para buscar o streak do usuário autenticado
router.get("/", authMiddleware, getUserStreak);
export default router;
