import dotenv from "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { readFileSync } from "fs";
import express from "express";

const app = express();

const googleClient = new GoogleGenAI({
  apiKey: process.env.GEMINI_KEY,
});


async function generateImage(){
    const response = await googleClient.models.generateContent({
        model: "gemini-2.5-flash",
        contents: "Create an image of a lion standing in antartica"
    })

    console.log(response.candidates[0].content);
}

generateImage();
