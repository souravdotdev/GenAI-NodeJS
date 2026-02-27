import dotenv from "dotenv/config"
import {ChatGoogle} from "@langchain/google"

const client = new ChatGoogle({
    model: "gemini-2.5-flash",
    apiKey: process.env.GEMINI_KEY,
});


async function generateResponse(){
    // const response = await client.invoke("Tell me 5 good reasons to visit Ottapalam in Kerala");

    // console.log(response.content);

    // const response = await client.batch([
    //     "Tell me 5 animals startitng with A",
    //     "Tell me 5 football players starting with C"
    // ])

    // for(let i = 0; i < response.length; i++){
    //     console.log(response[i].content);
    // }


    const response = await client.stream("Tell me 5 reasons to visit Ottapalam in Kerala");

    for await (let chunks of response){
        console.log(chunks.content);
    }

}

generateResponse();