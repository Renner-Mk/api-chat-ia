import jwt from "jsonwebtoken";
import ms from "ms";

export class JWTAdapter {
  private readonly secret: string;
  private readonly expireIn: ms.StringValue;

  constructor(secret: string, expireIn: ms.StringValue) {
    this.secret = secret;
    this.expireIn = expireIn;
  }

  public generateToken(dado: string | Buffer | object): string {
    const token = jwt.sign(dado, this.secret, {
      expiresIn: this.expireIn,
    });

    return token;
  }

  public decodeToken<T>(token: string): T | undefined {
    const data = jwt.verify(token, this.secret);

    if (!data) return undefined;

    return data as T;
  }
}
