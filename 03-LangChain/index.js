import dotenv from "dotenv/config"
import {ChatGoogle} from "@langchain/google"

const client = new ChatGoogle({
    model: "gemini-2.5-flash",
    apiKey: process.env.GEMINI_KEY,
});


async function generateResponse(){
    const response = await client.invoke("Tell me 5 good reasons to visit Ottapalam in Kerala");

    console.log(response.content);
}

generateResponse();