import ms from "ms";
import repository from "../database/prisma.connection.js";

import { BcryptAdapter } from "../adapters/bcrypt.adapter.js";
import { JWTAdapter } from "../adapters/jwt.adapter.js";
import { AuthUserDto, LoginDto } from "../dtos/auth.dto.js";
import { envs } from "../envs/index.js";
import { HTTPError } from "../utils/http.error.js";

export class AuthService {
  private readonly bcrypt = new BcryptAdapter();

  public async login({
    email,
    password,
  }: LoginDto): Promise<{ authToken: string; authUser: AuthUserDto }> {
    const user = await repository.user.findUnique({
      where: { email: email.trim().toLowerCase() },
    });

    if (!user) {
      throw new HTTPError(401, "Credenciais inválidas");
    }

    const bcrypt = new BcryptAdapter();

    const isPasswordMatch = await bcrypt.compareHash({
      plainText: password,
      hash: user.password,
    });

    if (!isPasswordMatch) {
      throw new HTTPError(401, "Credenciais inválidas");
    }

    const jwt = new JWTAdapter(
      envs.JWT_SECRET_KEY,
      envs.JWT_EXPIRE_IN as ms.StringValue
    );

    const authUser: AuthUserDto = {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    const token = jwt.generateToken(authUser);
    console.log(token);

    return {
      authToken: token,
      authUser,
    };
  }
}
