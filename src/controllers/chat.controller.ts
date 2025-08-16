import type { Request, Response } from "express";
import { GeminiService } from "../service/chat.service.js";
import { serverError } from "../utils/response.helpers.js";

const geminiService = new GeminiService();

export class GeminiController {
  public async chat(req: Request, res: Response) {
    try {
      const { prompt } = req.body;
      const result = await geminiService.chat(prompt);

      return res.status(result.code).json(result);
    } catch (error) {
      return serverError(res, error);
    }
  }
}
