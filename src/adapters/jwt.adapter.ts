import jwt from "jsonwebtoken";
import ms from "ms";
import { envs } from "../envs/index.js";

export class JWTAdapter {
  private readonly secret: string = envs.JWT_SECRET_KEY;
  private readonly expireIn: ms.StringValue =
    envs.JWT_EXPIRE_IN as ms.StringValue;

  public generateToken(dado: string | Buffer | object): string {
    return jwt.sign(dado, this.secret, {
      expiresIn: this.expireIn,
    });
  }

  public decodeToken<T>(token: string): T | undefined {
    const data = jwt.verify(token, this.secret);

    if (!data) return undefined;

    return data as T;
  }
}
