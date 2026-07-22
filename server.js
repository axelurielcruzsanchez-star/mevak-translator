import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.send("✅ Mevak Translator funcionando");
});

app.post("/translate", async (req, res) => {
    try {
        const { text } = req.body;

        const response = await axios.post(
            "https://libretranslate.de/translate",
            {
                q: text,
                source: "es",
                target: "en",
                format: "text"
            },
            {
                headers: {
                    "Content-Type": "application/json"
                }
            }
        );

        res.json({
            translatedText: response.data.translatedText
        });

    } catch (error) {
        console.error(error.message);
        res.status(500).json({
            error: "Error al traducir"
        });
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor iniciado");
});