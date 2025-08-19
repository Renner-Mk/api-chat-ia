import { StatusCodes } from "http-status-codes";
import repository from "../database/prisma.connection.js";
import { messageDTO } from "../dtos/chat.dto.js";
import { Message } from "../models/message.model.js";

export class MessageService {
  public async create(data: messageDTO) {
    try {
      const newMessage = new Message(data.chatId, data.sender, data.content);

      const createMessage = await repository.message.create({
        data: {
          id: newMessage.id,
          chatId: newMessage.chatId,
          sender: newMessage.sender,
          content: newMessage.content,
        },
      });

      return {
        success: true,
        code: StatusCodes.CREATED,
        message: "Mensagem Criada",
        data: createMessage,
      };
    } catch (error) {
      return {
        success: false,
        code: StatusCodes.BAD_REQUEST,
        message: "Erro ao criar mensagem",
      };
    }
  }

  public async history(chatId: string) {
    try {
      const history = await repository.message.findMany({
        where: { chatId },
        orderBy: { createdAt: "asc" },
        select: {
          chatId: true,
          sender: true,
          content: true,
          createdAt: true,
        },
      });

      return {
        success: true,
        code: history.length > 0 ? StatusCodes.OK : StatusCodes.NO_CONTENT,
        message:
          history.length > 0
            ? "Historico recuperado"
            : "Não há historico na conversas",
        data: history,
      };
    } catch (error) {
      return {
        success: false,
        code: StatusCodes.BAD_REQUEST,
        message: "Erro ao buscar histórico",
      };
    }
  }
}
