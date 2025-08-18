import { Request, Response } from "express";
import { AuthService } from "../service/auth.service.js";
import { StatusCodes } from "http-status-codes";
import { onError } from "../utils/on-error.js";

export class AuthController {
  public async login(req: Request, res: Response): Promise<void> {
    try {
      const { email, password } = req.body;

      const service = new AuthService();

      const result = await service.login({ email, password });

      res.status(StatusCodes.OK).json({
        success: true,
        message: "Login realizado com sucesso.",
        data: result,
      });
    } catch (error) {
      onError(error, res);
    }
  }
}
