import { geminiResponseDTO, messageGetDTO } from "../dtos/index.js";

import * as dotenv from "dotenv";

dotenv.config();

export class GeminiService {
  public async chat(data: messageGetDTO[]): Promise<geminiResponseDTO | null> {
    try {
      const geminiResponse = await this.gemini(data);
      if (!geminiResponse) throw new Error("Erro na resposta do gemini");

      return geminiResponse;
    } catch (error) {
      return null;
    }
  }

  async gemini(data: messageGetDTO[]): Promise<geminiResponseDTO | null> {
    try {
      const hist = data.map((m) => ({
        parts: [{ text: m.content }],
        role: m.sender === "user" ? "user" : "model",
      }));

      const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: hist,
        }),
      });

      const geminiReponse = await response.json();

      if (!response.ok) {
        throw new Error(`Erro na API Gemini: ${response.statusText}`);
      }

      return geminiReponse.candidates[0].content;
    } catch (error) {
      return null;
    }
  }
}
