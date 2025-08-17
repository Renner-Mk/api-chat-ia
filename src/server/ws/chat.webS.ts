import { WebSocket, WebSocketServer } from "ws";
import { GeminiService } from "../../service/chat.service.js";

const geminiService = new GeminiService();

export async function registerWSHandlers(ws: WebSocket, wss: WebSocketServer) {
  ws.on("message", async (data) => {
    const msg = JSON.parse(data.toString());

    const geminiResponse = await geminiService.chat(msg.content);

    ws.send(
      JSON.stringify({
        action: "message_response",
        chatId: msg.chatId,
        sender: "ai",
        content: geminiResponse.data,
      })
    );
  });
}
