import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";
import { authWSHandleder, registerWSHandlers } from "./server/ws/index.js";
import userRouter from "./server/router/user.routes.js";
import authRouter from "./server/router/auth.routes.js";
import chatRouter from "./server/router/chat.routes.js";

export async function createServer(port: number) {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use(userRouter);
  app.use(authRouter);
  app.use(chatRouter);

  const server = app.listen(port, () => {
    console.log(`Servidor Rest rodando na porta ${port}`);
  });

  const wss = new WebSocketServer({ server });

  wss.on("connection", async (ws, req) => {
    try {
      const user = authWSHandleder(req, ws);
      if (!user) return;

      console.log("Cliente Conectado");

      registerWSHandlers(ws, user);
    } catch (err: any) {
      ws.send(JSON.stringify({ type: "error", message: err.message }));
      ws.close();
      return;
    }
  });

  console.log(`Servidor WebSocket rodando ws://localhost:${port}`);

  return { app, server, wss };
}
