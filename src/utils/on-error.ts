import { Response } from "express";
import { HTTPError } from "./http.error.js";
import jwt from "jsonwebtoken";
import { StatusCodes } from "http-status-codes";

export function onError(error: unknown, res: Response): Response {
  if (error instanceof HTTPError) {
    return res.status(error.statusCode).json({
      success: false,
      message: error.message,
    });
  }

  if (error instanceof jwt.JsonWebTokenError) {
    return res.status(StatusCodes.UNAUTHORIZED).json({
      success: false,
      message: "Invalid or expired token",
    });
  }

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
    success: false,
    message: "Internal server error",
    detail: (error as Error).toString(),
  });
}
