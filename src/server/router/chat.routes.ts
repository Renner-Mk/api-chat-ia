import express from "express";
import { ChatController } from "../../controllers/chat.controller.js";
import { authMiddleware } from "../../middlewares/auth.middleware.js";

const router = express.Router();

const chatController = new ChatController();

router.post("/chats", authMiddleware, chatController.create);
router.get("/chats", authMiddleware, chatController.index);
router.delete("/chats", authMiddleware, chatController.delete);

export default router;
