import { randomUUID } from "crypto";

export class User {
  private _id: string;

  constructor(
    private _firstName: string,
    private _lastName: string,
    private _email: string,
    private _password: string
  ) {
    this._id = randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get firstName(): string {
    return this._firstName;
  }

  get lastName(): string {
    return this._lastName;
  }

  get email(): string {
    return this._email;
  }

  get password(): string {
    return this._password;
  }
}
