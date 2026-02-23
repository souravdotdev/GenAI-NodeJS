import dotenv from "dotenv/config"
import { GoogleGenAI } from "@google/genai"

const googleClient = new GoogleGenAI({
    apiKey: process.env.GEMINI_KEY
})

const response = await googleClient.models.embedContent({
    model: 'gemini-embedding-001',
    contents: "This is my life"
})

console.log(response.embeddings);