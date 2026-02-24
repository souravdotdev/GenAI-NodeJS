import { CloudClient } from "chromadb";
import dotenv from "dotenv/config";
import { createDimensions } from "./index.js";

const client = new CloudClient({
  apiKey: process.env.CHROMA_API_KEY,
  tenant: process.env.CHROMA_TENANT,
  database: process.env.CHROMA_DATABASE,
});

const chromaCollection = client.getOrCreateCollection({
  name: "sourav",
});

async function storeDataInDb() {
  const embedding = await createDimensions([
    "Sourav is 22 years old",
    "Sourav completed his Btech in 2025",
    "Sourav is a software developer",
    "Sourav owns a Ferrari",
  ]);
  (await chromaCollection).add({
    ids: ["1", "2", "3", "4"],
    documents: [
      "Sourav is 22 years old",
      "Sourav completed his Btech in 2025",
      "Sourav is a software developer",
      "Sourav owns a Ferrari",
    ],
    embeddings: embedding.map((item) => item.values),
  });

  console.log("Data added to DB");
}

// storeDataInDb();

async function queryDatabase() {
  const colors = await client.getCollection({
    name: "sourav",
  });

  const queryEmbedding = await createDimensions("What is sourav's age?");

  const result = await colors.query({
    queryEmbeddings: [queryEmbedding[0].values],
    nResults: 1,
  });

  console.log(result);
}

queryDatabase();
