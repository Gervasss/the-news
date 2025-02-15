import express from "express";
import { getMetrics } from "../controller/adminController";

const router = express.Router();

router.get("/metrics", getMetrics);

export default router;
