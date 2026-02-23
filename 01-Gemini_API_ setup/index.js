import dotenv from "dotenv/config"
import { GoogleGenAI } from "@google/genai"
import express from "express"

const app = express();

const googleClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_KEY
})

app.get("/" , async (req, res)=>{
       const response = await googleClient.models.generateContentStream({
        model: "gemini-2.5-flash",
        contents: "Tell me about AI",
    })

    for await (const chunks of response){
        let text = chunks.text;
        res.write(text);
    }
})

app.listen(3000);

 





