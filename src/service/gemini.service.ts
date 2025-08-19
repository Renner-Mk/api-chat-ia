import { messageDTO } from "../dtos/chat.dto.js";
import type { ResponseData } from "../types/index.js";
import * as dotenv from "dotenv";

dotenv.config();

export class GeminiService {
  public async chat(data: messageDTO): Promise<ResponseData> {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${process.env.GEMINI_API_KEY}`;

    const dateTime = new Date();
    console.log(dateTime);

    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: data.content }],
            role: data.sender,
          },
        ],
      }),
    });

    console.log(response);

    const geminiReponse = await response.json();

    if (!response.ok) {
      throw new Error(`Erro na API Gemini: ${response.statusText}`);
    }

    return {
      success: true,
      code: 200,
      message: "Resposta gerada com sucesso!",
      data: geminiReponse.candidates[0].content,
    };
  }
}
