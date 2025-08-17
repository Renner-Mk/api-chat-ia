import { Request, Response } from "express";
import { serverError } from "../utils/response.helpers.js";
import { UserService } from "../service/user.service.js";

const userService = new UserService();

export class UserController {
  public async index(req: Request, res: Response) {
    try {
      const result = await userService.index();

      return res.status(result.code).json(result);
    } catch (error) {
      return serverError(res, error);
    }
  }

  //   public async show(req: Request, res: Response) {
  //     try {
  //       const { userId } = req.params;

  //       const result = await userService.show({ userId });

  //       return res.status(result.code).json(result);
  //     } catch (error) {
  //       return serverError(res, error);
  //     }
  //   }

  public async create(req: Request, res: Response) {
    try {
      const { firstName, email, password, lastName } = req.body;

      const result = await userService.create({
        firstName,
        lastName,
        email,
        password,
      });

      return res.status(result.code).json(result);
    } catch (error) {
      return serverError(res, error);
    }
  }

  //   public async delete(req: Request, res: Response) {
  //     try {
  //       const { userId } = req.params;

  //       const result = await userService.delete({
  //         userId,
  //       });

  //       return res.status(result.code).json(result);
  //     } catch (error) {
  //       return serverError(res, error);
  //     }
  //   }

  //   public async updateProfile(req: Request, res: Response) {
  //     try {
  //       const { userId } = req.params;
  //       const updates = req.body;

  //       if (updates.password) {
  //         updates.password = await bcrypt.hash(updates.password, 10);
  //       }

  //       if (updates.id) {
  //         delete updates.id;
  //       }

  //       if (!Object.keys(updates).length) {
  //         return res.status(400).json({
  //           success: false,
  //           code: res.statusCode,
  //           message: "Nenhum campo para atualizar",
  //         });
  //       }

  //       const result = await userService.update(updates, userId);

  //       return res.status(result.code).json(result);
  //     } catch (error) {
  //       return serverError(res, error);
  //     }
  //   }
}
