import cron from "node-cron";
import axios from "axios";
const cronTyped = cron;
cronTyped.schedule("0 * * * *", async () => {
    console.log("🔄 Buscando dados do webhook...");
    const response = await axios.get("https://app.thenewscc.com.br/case");
    const data = response.data;
    for (const item of data) {
        await axios.post("http://localhost:4000/webhook/newsletter-open", item);
    }
});
