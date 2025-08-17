import repository from "../database/prisma.connection.js";
import { UserCreateDTO } from "../dtos/user.dto.js";
import { User } from "../models/user.model.js";
import { ResponseData, UserIndexDTO } from "../types/index.js";
import bcrypt from "bcrypt";
import { captalizeWords, usernameLowerCase } from "../utils/captalizeWords.js";

export class UserService {
  public async create({
    firstName,
    lastName,
    password,
    email,
  }: UserCreateDTO): Promise<ResponseData> {
    const hashedPassword = await bcrypt.hash(password, 10);

    const nameFormated = captalizeWords(firstName);
    const lastNameFormated = captalizeWords(lastName);

    const newUser = new User(
      nameFormated,
      lastNameFormated,
      email.trim().toLowerCase(),
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

    return {
      success: true,
      code: 201,
      message: "Usuario criado com sucesso!",
    };
  }

  public async index(): Promise<ResponseData<UserIndexDTO[]>> {
    const users = await repository.user.findMany({
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
      },
    });

    return {
      success: true,
      code: 200,
      message:
        users.length === 0
          ? "Não há usuários registrados!!"
          : "Usuarios listados com sucesso!!",
      data: users,
    };
  }

  //   public async show({
  //     userId,
  //   }: UserDTO): Promise<ResponseData<UserShowResDTO>> {
  //     const student = await repository.user.findUnique({
  //       where: { id: userId },
  //       select: {
  //         id: true,
  //         name: true,
  //         email: true,
  //         username: true,
  //         urlImg: true,
  //       },
  //     });

  //     if (!student) {
  //       return {
  //         success: false,
  //         code: 404,
  //         message: "Usuario não encontrado",
  //       };
  //     }

  //     return {
  //       success: true,
  //       code: 200,
  //       message: "Usuario listado com sucesso",
  //       data: student,
  //     };
  //   }

  //   public async delete({ userId }: UserDTO): Promise<ResponseData> {
  //     const user = await repository.user.findUnique({ where: { id: userId } });

  //     if (!user) {
  //       return {
  //         success: false,
  //         code: 404,
  //         message: "Não foi possivel deletar o usuário",
  //       };
  //     }

  //     await repository.user.delete({
  //       where: { id: userId },
  //       select: {
  //         id: true,
  //         name: true,
  //         email: true,
  //         username: true,
  //         urlImg: true,
  //       },
  //     });

  //     return {
  //       success: true,
  //       code: 200,
  //       message: "Usuário deletado com sucesso",
  //     };
  //   }

  //   public async update(
  //     updates: UserUpdateDTO,
  //     userId: string
  //   ): Promise<ResponseData<UserShowResDTO>> {
  //     const user = await repository.user.findUnique({ where: { id: userId } });

  //     if (!user) {
  //       return {
  //         success: false,
  //         code: 404,
  //         message: "Não foi possivel atualizar usuário",
  //       };
  //     }

  //     if (updates.name) {
  //       updates.name = capitalizeWords(updates.name);
  //     }

  //     if (updates.username) {
  //       updates.username = usernameLowerCase(updates.username);
  //     }

  //     if (updates.email) {
  //       updates.email = updates.email.trim().toLowerCase();
  //     }

  //     const updateUser = await repository.user.update({
  //       where: { id: userId },
  //       data: updates,
  //       select: {
  //         id: true,
  //         name: true,
  //         email: true,
  //         username: true,
  //         urlImg: true,
  //       },
  //     });

  //     return {
  //       success: true,
  //       code: 200,
  //       message: "Usuário atualizado com sucesso",
  //       data: updateUser,
  //     };
  //   }
}
