import express, { Request, Response } from "express";
import { processWebhook } from "../controller/webhookController"; 

const router = express.Router();


router.post("/newsletter-open", (req: Request, res: Response) => {
    processWebhook(req, res);
});


router.get("/newsletter-open", (req: Request, res: Response) => {
    processWebhook(req, res);
  });

export default router;
