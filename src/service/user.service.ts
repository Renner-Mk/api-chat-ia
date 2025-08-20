import repository from "../database/prisma.connection.js";
import { UserCreateDTO, UserIndexDTO } from "../dtos/index.js";
import { User } from "../models/user.model.js";
import { ResponseData } from "../types/index.js";
import bcrypt from "bcrypt";
import { captalizeWords, emailLowerCase } from "../utils/captalizeWords.js";
import { HTTPError } from "../utils/http.error.js";
import { StatusCodes } from "http-status-codes";

export class UserService {
  public async create({
    firstName,
    lastName,
    password,
    email,
  }: UserCreateDTO): Promise<boolean> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const nameFormated = captalizeWords(firstName);
    const lastNameFormated = captalizeWords(lastName);

    const newUser = new User(
      nameFormated,
      lastNameFormated,
      emailLowerCase(email),
      hashedPassword
    );

    await repository.user.create({
      data: {
        id: newUser.id,
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        password: newUser.password,
      },
    });

    return true;
  }

  public async index(): Promise<UserIndexDTO[]> {
    const users = await repository.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    return users;
  }
}
