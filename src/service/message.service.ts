import repository from "../database/prisma.connection.js";
import { messageGetDTO, messageServiceDTO, msgDTO } from "../dtos/index.js";
import { Message } from "../models/message.model.js";
export class MessageService {
  public async create(data: messageServiceDTO): Promise<msgDTO | null> {
    try {
      const newMessage = new Message(data.chatId, data.sender, data.content);

      const createMessage = await repository.message.create({
        data: {
          id: newMessage.id,
          chatId: newMessage.chatId,
          sender: newMessage.sender,
          content: newMessage.content,
        },
        select: {
          id: true,
          chatId: true,
          sender: true,
          content: true,
        },
      });

      return createMessage;
    } catch (error) {
      return null;
    }
  }

  public async history(chatId: string): Promise<messageGetDTO[]> {
    try {
      const history = await repository.message.findMany({
        where: { chatId },
        orderBy: { createdAt: "asc" },
        select: {
          sender: true,
          content: true,
        },
      });

      return history;
    } catch (error) {
      return [];
    }
  }
}
