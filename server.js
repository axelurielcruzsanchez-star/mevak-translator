import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(express.json());

// Ruta principal
app.get("/", (req, res) => {
    res.send("✅ Mevak Translator funcionando");
});

// Ruta para traducir
app.post("/translate", async (req, res) => {

    try {

        const { text } = req.body;

        console.log("Texto recibido:", text);

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

        console.log(response.data);

        res.json({
            translatedText: response.data.translatedText
        });

    } catch (error) {

        console.error(error.response?.data || error.message);

        res.status(500).json({
            error: "Error al traducir"
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor iniciado");
});