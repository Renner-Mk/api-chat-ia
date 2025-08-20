import { WebSocket } from "ws";
import { GeminiService } from "../../service/gemini.service.js";
import { JWTAdapter } from "../../adapters/jwt.adapter.js";
import { AuthUserDto, messageDTO, wsDTO } from "../../dtos/index.js";
import { IncomingMessage } from "http";
import { ChatService } from "../../service/chat.service.js";
import { MessageService } from "../../service/message.service.js";
import { WSMessage } from "../../types/index.js";

const geminiService = new GeminiService();
const chatService = new ChatService();
const messageService = new MessageService();

const jwt = new JWTAdapter();

const userChatHistories = new Map<string, Map<string, WSMessage[]>>();

export async function registerWSHandlers(ws: WebSocket, user: AuthUserDto) {
  const userChats = await chatService.index(user.id);
  const userMap = new Map<string, WSMessage[]>();

  for (const chat of userChats) {
    const messages = await messageService.history(chat.id);
    userMap.set(chat.id, messages || []);
  }

  userChatHistories.set(user.id, userMap);

  ws.on("message", async (data) => {
    try {
      const msg: wsDTO = JSON.parse(data.toString());

      const { chatId, content, action } = msg;

      const chatMap = userChatHistories.get(user.id);
      if (!chatMap || !chatMap.has(chatId)) {
        ws.send(
          JSON.stringify({ type: "error", message: "Chat não encontrado" })
        );
        return;
      }

      const messages = chatMap.get(chatId)!;

      switch (action) {
        case "getHistory":
          ws.send(
            JSON.stringify({
              chatId: msg.chatId,
              content: messages,
            })
          );
          break;
        default:
          const userMessage: WSMessage = { sender: "user", content };
          messages.push(userMessage);

          const geminiRes = await geminiService.chat(messages);

          if (!geminiRes) {
            ws.send(
              JSON.stringify({
                type: "error",
                message: "Gemini Não conseguiu responder.",
              })
            );
            return;
          }

          const modelMessage: WSMessage = {
            sender: "model",
            content: geminiRes.parts[0].text,
          };

          messages.push(modelMessage);

          await messageService.create({ chatId, sender: "user", content });
          await messageService.create({
            chatId,
            sender: "model",
            content: geminiRes.parts[0].text,
          });

          ws.send(
            JSON.stringify({
              chatId: msg.chatId,
              sender: "model",
              content: geminiRes.parts[0].text,
            })
          );
          break;
      }
    } catch (error) {
      ws.send(JSON.stringify({ error: "Erro na conecção" }));
      ws.close();
      return null;
    }
  });
}

export function authWSHandleder(
  req: IncomingMessage,
  ws: WebSocket
): AuthUserDto | null {
  try {
    const token = new URL(req.url!, "http://localhost").searchParams.get(
      "token"
    );

    if (!token) throw new Error("Token não fornecido");

    const data = jwt.decodeToken<AuthUserDto>(token);
    if (!data) throw new Error("Token invalido");

    return data;
  } catch (error) {
    ws.send(JSON.stringify({ error: "Erro na conecção" }));
    ws.close();
    return null;
  }
}
