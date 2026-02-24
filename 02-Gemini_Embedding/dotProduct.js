import {read, readFileSync} from "fs"
import { createDimensions } from "./index.js";

async function calculateSimilarity() {
    let embeddingFileData = readFileSync("embedding.json");
    embeddingFileData = JSON.parse(embeddingFileData);

    const animalResult = await createDimensions("animal");
    const animalEmbedding = animalResult[0].values; // Get the first (and only) embedding's values

    let similarity = embeddingFileData.map((embeddingItem) => {
        const embedding = embeddingItem.embedding.values;
        
        // Calculate dot product
        const dotProduct = embedding.map((value, index) => {
            return embedding[index] * animalEmbedding[index];
        }).reduce((sum, product) => sum + product, 0);
        
        return {
            input: embeddingItem.input,
            similarity: dotProduct
        };
    });

    similarity.sort((a,b)=> b.similarity - a.similarity);

    console.log(similarity);
}

calculateSimilarity();


