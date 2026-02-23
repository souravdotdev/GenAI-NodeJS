import dotenv from "dotenv/config";
import { GoogleGenAI } from "@google/genai";
import { readFileSync } from "fs";
import express from "express";

const app = express();

const googleClient = new GoogleGenAI({
  apiKey: process.env.GEMINI_KEY,
});

const base64Img = readFileSync("framework.webp", {
  encoding: "base64",
});

const contents = [
  {
    inlineData: {
      mimeType: "image/webp",
      data: base64Img,
    },
  },
  {
    text: "Caption this image",
  },
];

const response = await googleClient.models.generateContent({
  model: "gemini-3-flash-preview",
  contents: contents,
});

console.log(response.text);

app.listen(3000);
