import dotenv from "dotenv/config"
import { GoogleGenAI } from "@google/genai"

const googleClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_KEY
})

async function getResponse(question){
    const response = await googleClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents: question,
    })

    console.log(response.text)
}

getResponse("Tell me about the place called Ottapalam in Kerala");

