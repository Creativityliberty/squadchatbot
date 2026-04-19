import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from "dotenv";
import fs from "fs";

// Charge .env ou .env.local s'ils existent
if (fs.existsSync(".env.local")) {
  dotenv.config({ path: ".env.local" });
} else {
  dotenv.config();
}

const API_KEY = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export type GeminiModel = 
  | "gemini-3.1-pro-preview" 
  | "gemini-3-flash-preview" 
  | "gemini-3.1-flash-lite-preview"
  | "gemini-2.5-flash";

/**
 * Service central pour appeler les modèles Gemini.
 * @param prompt Le prompt à envoyer
 * @param modelName Le nom du modèle (par défaut gemini-3-flash-preview)
 */
export async function callLLM(prompt: string, modelName: GeminiModel = "gemini-3-flash-preview"): Promise<string> {
  if (!API_KEY) {
    throw new Error("Clé API GEMINI_API_KEY manquante dans le fichier .env");
  }

  try {
    const model = genAI.getGenerativeModel({ model: modelName });
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error(`[LLM Error] Erreur avec le modèle ${modelName}:`, error);
    return "Erreur lors de la génération.";
  }
}
