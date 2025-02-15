import express from "express";
import { processWebhook } from "../controller/webhookController";
const router = express.Router();
router.post("/newsletter-open", processWebhook);
export default router;
