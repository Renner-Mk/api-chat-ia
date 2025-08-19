import { WebSocket, WebSocketServer } from "ws";
import { GeminiService } from "../../service/gemini.service.js";
import { JWTAdapter } from "../../adapters/jwt.adapter.js";
import { envs } from "../../envs/index.js";
import ms from "ms";
import { AuthUserDto } from "../../dtos/auth.dto.js";
import { messageDTO } from "../../dtos/chat.dto.js";

const geminiService = new GeminiService();

const jwt = new JWTAdapter(
  envs.JWT_SECRET_KEY,
  envs.JWT_EXPIRE_IN as ms.StringValue
);

export async function registerWSHandlers(ws: WebSocket, wss: WebSocketServer) {
  ws.on("message", async (data) => {
    const msg: messageDTO = JSON.parse(data.toString());

    const geminiResponse = await geminiService.chat(msg);

    ws.send(
      JSON.stringify({
        action: "message_response",
        chatId: "geminiResponse.data",
        sender: "IA",
        content: geminiResponse.data,
      })
    );
  });
}

export function authWSHandleder(ws: WebSocket, token: string): boolean {
  try {
    const data = jwt.decodeToken<AuthUserDto>(token);

    if (!data) {
      ws.send(JSON.stringify({ error: "Token não fornecido" }));
      ws.close();

      return false;
    }

    ws.send(JSON.stringify({ message: "Autenticado com sucesso!" }));
    return true;
  } catch (error) {
    ws.send(JSON.stringify({ error: "Erro na conecção" }));
    ws.close();
    return false;
  }
}
