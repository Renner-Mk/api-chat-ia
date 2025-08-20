import { Request, Response } from "express";
import { serverError, serverResponse } from "../utils/response.helpers.js";
import { UserService } from "../service/user.service.js";
import { StatusCodes } from "http-status-codes";
import { HTTPError } from "../utils/http.error.js";

const userService = new UserService();

export class UserController {
  public async index(req: Request, res: Response) {
    try {
      const result = await userService.index();

      if (result.length === 0)
        throw new HTTPError(StatusCodes.NOT_FOUND, "Nenhum usuario encontrado");

      return serverResponse(
        res,
        StatusCodes.OK,
        "Usuarios listados com sucesso!",
        result
      );
    } catch (error) {
      return serverError(res, error);
    }
  }

  public async create(req: Request, res: Response) {
    try {
      const { firstName, email, password, lastName } = req.body;

      const result = await userService.create({
        firstName,
        lastName,
        email,
        password,
      });

      if (!result)
        throw new HTTPError(StatusCodes.BAD_REQUEST, "Erro ao criar usuario.");

      return serverResponse(res, StatusCodes.OK, "Usuario criado com sucesso!");
    } catch (error) {
      return serverError(res, error);
    }
  }
}
