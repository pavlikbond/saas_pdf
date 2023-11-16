import { Pinecone } from "@pinecone-database/pinecone";

let pinecone: Pinecone | null = null;

export const getPineconeClietn = async () => {
  if (!pinecone) {
    pinecone = new Pinecone({
      apiKey: process.env.PINECONE_API_KEY!,
      environment: process.env.PINECONE_ENVIRONMENT!,
    });
  }
  return pinecone;
};

export async function loadS3IntoPinecone(fileKey: string) {
  //obtain pdf, download and read from pdf
}
