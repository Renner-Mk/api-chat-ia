import express from "express";
import { GeminiController } from "../controllers/chat.controller.js";

const router = express.Router();

const geminiController = new GeminiController();

router.post("/chat", geminiController.chat);

export default router;
