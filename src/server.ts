import express from "express";
import cors from "cors";

import geminiRouter from "./routes/chat.routes.js";

export function createApp() {
  const app = express();
  app.use(express.json());
  app.use(cors());

  app.use(geminiRouter);

  return app;
}
