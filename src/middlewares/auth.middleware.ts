import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { HTTPError } from "../utils/http.error.js";
import { JWTAdapter } from "../adapters/jwt.adapter.js";
import { envs } from "../envs/index.js";
import ms from "ms";
import { AuthUserDto } from "../dtos/auth.dto.js";
import { onError } from "../utils/on-error.js";

export async function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const auth = req.headers.authorization;

    if (!auth) {
      throw new HTTPError(
        StatusCodes.UNAUTHORIZED,
        "Token de autenticação não informado."
      );
    }

    const [, token] = auth.split(" ");
    if (!token) throw new HTTPError(StatusCodes.UNAUTHORIZED, "Token inválido");

    const jwt = new JWTAdapter(
      envs.JWT_SECRET_KEY,
      envs.JWT_EXPIRE_IN as ms.StringValue
    );

    const data = jwt.decodeToken<AuthUserDto>(token);

    if (!data) {
      throw new HTTPError(StatusCodes.UNAUTHORIZED, "Token inválido.");
    }

    req.authUser = data;

    next();
  } catch (error) {
    onError(error, res);
  }
}
