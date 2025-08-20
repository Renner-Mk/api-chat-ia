import type { Response } from "express";

export function missingFieldError(reponse: Response) {
  return reponse.status(400).json({
    success: false,
    code: 400,
    message: "Preencha os campos obrigatórios.",
  });
}

export function serverError(response: Response, error?: any) {
  return response.status(500).json({
    success: false,
    code: response.statusCode,
    message: error ? error.toString() : "Error genérico",
  });
}

export function serverResponse(
  response: Response,
  status: number,
  message: string,
  data?: Object
) {
  return response.status(status).json({
    success: true,
    code: response.statusCode,
    message,
    data,
  });
}
