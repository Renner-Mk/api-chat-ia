import express from "express";
import { UserController } from "../../controllers/user.controller.js";
import { validateUser } from "../../middlewares/user.middleware.js";

const router = express.Router();

const usercontroller = new UserController();

router.post("/register", validateUser, usercontroller.create);
router.get("/users", usercontroller.index);

export default router;
