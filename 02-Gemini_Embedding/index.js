import dotenv from "dotenv/config"
import { GoogleGenAI } from "@google/genai"
import {readFileSync, writeFileSync} from "fs"

async function readJsonFile(){
    const data = readFileSync("data.json");
    const stringData = JSON.parse(data.toString())

    let responseData = await createDimensions(stringData);
    responseData = responseData.map((item, index)=>{
        return {input: stringData[index], embedding: item}
    })
    createJsonFile(responseData, "embedding.json");
}

async function createDimensions(data){
    const googleClient = new GoogleGenAI({
        apiKey: process.env.GEMINI_KEY
    })

    let response = await googleClient.models.embedContent({
        model: 'gemini-embedding-001',
        contents: data
    })

    return response.embeddings;
}

function createJsonFile(data, file){
    const fileData = JSON.stringify(data);
    writeFileSync(file, fileData);
}

readJsonFile();