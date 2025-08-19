import { randomUUID } from "crypto";

export class Chat {
  private _id: string;

  constructor(private _userId: string) {
    this._id = randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get userId(): string {
    return this._userId;
  }
}
