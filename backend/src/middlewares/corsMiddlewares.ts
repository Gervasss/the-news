import cors from "cors";
import app from "../app";

// Configuração do CORS
app.use(cors({ origin: "*" }));
