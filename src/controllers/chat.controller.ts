import type { Request, Response } from "express";
import { GeminiService } from "../service/gemini.service.js";
import { serverError } from "../utils/response.helpers.js";

const geminiService = new GeminiService();

export class ChatController {
  public async create(req: Request, res: Response) {
    try {
      const { prompt } = req.body;
      const result = await geminiService.chat(prompt);

      return res.status(result.code).json(result);
    } catch (error) {
      return serverError(res, error);
    }
  }
}
