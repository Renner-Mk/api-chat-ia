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
    console.log("oi");

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

export async function validateJWT(token: string) {
  const data = jwt.decodeToken<AuthUserDto>(token);
}
