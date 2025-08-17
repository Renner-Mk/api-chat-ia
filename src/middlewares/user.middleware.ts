import { NextFunction, Request, Response } from "express";
import repository from "../database/prisma.connection.js";
import { missingFieldError, serverError } from "../utils/response.helpers.js";

export async function validateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { firstName, email, password, lastName } = req.body;

    if (!firstName || !email || !password || !lastName) {
      return missingFieldError(res);
    }

    const userEmail = await repository.user.findUnique({
      where: { email: email.toLowerCase().trim() },
    });

    if (userEmail) {
      return res.status(400).json({
        success: false,
        code: res.statusCode,
        message: "Email ja cadastrado",
      });
    }

    next();
  } catch (error) {
    return serverError(res, error);
  }
}
