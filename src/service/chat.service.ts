import { StatusCodes } from "http-status-codes";
import repository from "../database/prisma.connection.js";
import { chatDTO } from "../dtos/chat.dto.js";
import { Chat } from "../models/chat.model.js";
import { ResponseData } from "../types/index.js";

export class ChatService {
  public async create(userId: string): Promise<ResponseData<chatDTO>> {
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

      return {
        success: true,
        code: StatusCodes.CREATED,
        message: "Chat Criado",
        data: createChat,
      };
    } catch (error) {
      return {
        success: false,
        code: StatusCodes.BAD_REQUEST,
        message: "Erro ao criar o Chat",
      };
    }
  }

  public async index(userId: string): Promise<ResponseData<chatDTO[]>> {
    const chats = await repository.chat.findMany({
      where: { userId },
      orderBy: { updatedAt: "asc" },
      select: {
        id: true,
        userId: true,
        updatedAt: true,
      },
    });

    return {
      success: true,
      code: StatusCodes.OK,
      message:
        chats.length == 0
          ? "Não há chats para Exibir"
          : "Chats Listados com sucesso",
      data: chats,
    };
  }

  public async delete(id: string): Promise<ResponseData<chatDTO>> {
    try {
      const chat = await repository.chat.delete({
        where: { id },
      });

      return {
        success: true,
        code: StatusCodes.OK,
        message: "Chat Deletado com sucesso",
        data: chat,
      };
    } catch (error) {
      return {
        success: false,
        code: StatusCodes.BAD_REQUEST,
        message: "Erro ao deletar o Chat: registro não encontrado",
      };
    }
  }
}
