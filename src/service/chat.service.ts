import type { ResponseData } from "../types/index.js";
import * as dotenv from "dotenv";

dotenv.config();

export class GeminiService {
  public async chat(data: string): Promise<ResponseData> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: data }],
          },
        ],
      }),
    });

    const geminiReponse = await response.json();
    console.log(geminiReponse.candidates[0].content);

    if (!response.ok) {
      throw new Error(`Erro na API Gemini: ${response.statusText}`);
    }

    return {
      success: true,
      code: 200,
      message: "Resposta gerada com sucesso!",
      data: geminiReponse.candidates[0].content.parts[0].text,
    };
  }
}
