import express from "express";
import cors from "cors";
import { WebSocketServer } from "ws";
import { registerWSHandlers } from "./server/ws/index.js";
import userRouter from "./server/router/user.routes.js";
import authRouter from "./server/router/auth.routes.js";

export function createServer(port: number) {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use(userRouter);
  app.use(authRouter);

  const server = app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
  });

  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws) => {
    console.log("Cliente Conectado");
    registerWSHandlers(ws, wss);
  });

  console.log(`Servidor WebSocket rodando em ws://localhost:${port}`);

  return { app, server, wss };
}
