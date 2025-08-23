import type { Request, Response } from "express";
import { serverError, serverResponse } from "../utils/response.helpers.js";
import { ChatService } from "../service/chat.service.js";
import { MessageService } from "../service/message.service.js";
import { Message } from "../models/message.model.js";
import { StatusCodes } from "http-status-codes";

const chatService = new ChatService();
const messageService = new MessageService();

export class ChatController {
  public async create(req: Request, res: Response) {
    try {
      const user = req.authUser!;

      const result = await chatService.create(user.id);

      if (!result) throw new Error("Erro ao criar criar chat");

      serverResponse(res, StatusCodes.OK, "Chat Criado com sucesso!", result);
    } catch (error) {
      return serverError(res, error);
    }
  }

  public async index(req: Request, res: Response) {
    try {
      const user = req.authUser!;

      const result = await chatService.index(user.id);

      if (result.length === 0) {
        serverResponse(res, StatusCodes.NOT_FOUND, "Não há chats para listar!");
      }

      serverResponse(
        res,
        StatusCodes.OK,
        "Chats listados com sucesso!",
        result
      );
    } catch (error) {
      return serverError(res, error);
    }
  }

  public async delete(req: Request, res: Response) {
    try {
      const { chatId } = req.body;

      const result = await chatService.delete(chatId);

      serverResponse(
        res,
        StatusCodes.OK,
        "Chats deletado com sucesso!",
        result
      );
    } catch (error) {
      return serverError(res, error);
    }
  }
}
