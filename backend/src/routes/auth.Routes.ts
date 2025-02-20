import express, { Request, Response } from "express";
import { loginOrRegister } from "../controller/authController";

const router = express.Router();

router.post("/login", async (req: Request, res: Response) => loginOrRegister(req, res));

export default router;
