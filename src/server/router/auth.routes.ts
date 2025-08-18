import express from "express";
import { AuthController } from "../../controllers/auth.controller.js";

const router = express.Router();

const authcontroller = new AuthController();

router.post("/login", authcontroller.login);

export default router;
