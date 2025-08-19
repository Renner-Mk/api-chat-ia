import type { Request, Response } from "express";
import { serverError } from "../utils/response.helpers.js";
import { ChatService } from "../service/chat.service.js";

const chatService = new ChatService();

export class ChatController {
  public async create(req: Request, res: Response) {
    try {
      const user = req.authUser!;

      const result = await chatService.create(user.id);

      return res.status(result.code).json(result);
    } catch (error) {
      return serverError(res, error);
    }
  }

  public async index(req: Request, res: Response) {
    try {
      const user = req.authUser!;

      const result = await chatService.index(user.id);

      return res.status(result.code).json(result);
    } catch (error) {
      return serverError(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { chatId } = req.body;

      const result = await chatService.delete(chatId);

      return res.status(result.code).json(result);
    } catch (error) {
      return serverError(res, error);
    }
  }
}
