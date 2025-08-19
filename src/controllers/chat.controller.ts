import type { Request, Response } from "express";
import { serverError } from "../utils/response.helpers.js";
import { ChatService } from "../service/chat.service.js";
import { MessageService } from "../service/message.service.js";
import { Message } from "../models/message.model.js";

const chatService = new ChatService();
const messageService = new MessageService();

export class ChatController {
  public async create(req: Request, res: Response) {
    try {
      const user = req.authUser!;

      const result = await chatService.create(user.id);

      if (!result) throw new Error(result);

      const newMessage = new Message(
        result.data?.id!,
        "user",
        "Nao responder a essa mensagem: ${dateTime} é a data de hoje e hora atual informações necessarias para o melhor funcionamento, responda as perguntas futuras com naturalidade"
      );
      await messageService.create(newMessage);

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
