import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import authRoutes from "./routes/auth.Routes";
import userRoutes from "./routes/user.Routes";
import adminRoutes from "./routes/admin.Routes";
import streakRoutes from "./routes/streak.Routes";
import webhookRoutes from "./routes/webhook.Routes";
import mensagemRoutes from "./routes/mensagem.Routes";

dotenv.config();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.json());  

//  Adicione a rota de teste ANTES das outras rotas
app.get("/", (req, res) => {
    res.json({ message: "API funcionando!" });
});


app.use("/auth", authRoutes);
app.use("/user", userRoutes);
app.use("/admin", adminRoutes);
app.use("/streak", streakRoutes);
app.use("/webhook", webhookRoutes);
app.use("/mensagens", mensagemRoutes);


  

export default app;
