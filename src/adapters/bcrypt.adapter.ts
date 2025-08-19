import bcrypt from "bcrypt";
import { envs } from "../envs/index.js";

export class BcryptAdapter {
  private readonly salt: number = envs.BCRYPT_SALT;

  public async generateHash(plainText: string): Promise<string> {
    const hash = await bcrypt.hash(plainText, this.salt);
    return hash;
  }

  public async compareHash(command: {
    plainText: string;
    hash: string;
  }): Promise<boolean> {
    const isMatch = await bcrypt.compare(command.plainText, command.hash);
    return isMatch;
  }
}
