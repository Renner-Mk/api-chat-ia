import { WebSocket, WebSocketServer } from "ws";

export function registerWSHandlers(ws: WebSocket, wss: WebSocketServer) {
  ws.on("message", (data) => {
    console.log(data.toString());
  });
}
