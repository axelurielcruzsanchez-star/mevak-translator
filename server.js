import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();

app.use(cors());
app.use(express.json());

// Página de prueba
app.get("/", (req, res) => {
    res.send("✅ Mevak Translator funcionando");
});

// Ruta para traducir
app.post("/traducir", async (req, res) => {

    try {

        const { texto, origen, destino } = req.body;

        const respuesta = await axios.post(
            "https://translate.argosopentech.com/translate",
            {
                q: texto,
                source: origen,
                target: destino,
                format: "text"
            }
        );

        res.json({
            traduccion: respuesta.data.translatedText
        });

    } catch (error) {

        console.log(error.message);

        res.status(500).json({
            error: "No fue posible traducir."
        });

    }

});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Servidor iniciado");
});