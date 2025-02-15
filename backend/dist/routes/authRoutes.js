import express from "express";
import { loginOrRegister } from "../controller/authController";
const router = express.Router();
router.post("/login", loginOrRegister);
export default router;
