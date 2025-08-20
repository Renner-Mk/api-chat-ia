import { StatusCodes } from "http-status-codes";
import repository from "../database/prisma.connection.js";
import { chatDTO } from "../dtos/chat.dto.js";
import { Chat } from "../models/chat.model.js";
import { ResponseData } from "../types/index.js";
import { HTTPError } from "../utils/http.error.js";

export class ChatService {
  public async create(userId: string): Promise<chatDTO | null> {
    try {
      const chat = new Chat(userId);
      const createChat = await repository.chat.create({
        data: {
          id: chat.id,
          userId: chat.userId,
        },
        select: {
          id: true,
          userId: true,
          updatedAt: true,
        },
      });

      return createChat;
    } catch (error) {
      return null;
    }
  }

  public async index(userId: string): Promise<chatDTO[]> {
    const chats = await repository.chat.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        userId: true,
        updatedAt: true,
      },
    });

    return chats;
  }

  public async delete(id: string): Promise<boolean> {
    try {
      await repository.chat.delete({
        where: { id },
      });

      return true;
    } catch (error: any) {
      if (error.code === "P2025") {
        throw new HTTPError(StatusCodes.NOT_FOUND, "Chat não encontrado");
      }
      throw new HTTPError(
        StatusCodes.INTERNAL_SERVER_ERROR,
        "Erro ao deletar chat"
      );
    }
  }

  public async show(chatId: string): Promise<chatDTO> {
    const chats = await repository.chat.findFirst({
      where: { id: chatId },
      select: {
        id: true,
        userId: true,
        updatedAt: true,
      },
    });

    if (!chats) {
      throw new HTTPError(StatusCodes.NOT_FOUND, "Chat não encontrado");
    }

    return chats;
  }
}
