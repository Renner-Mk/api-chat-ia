import { randomUUID } from "crypto";

export class Message {
  private _id: string;

  constructor(
    private _chatId: string,
    private _sender: string,
    private _content: string
  ) {
    this._id = randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get chatId(): string {
    return this._chatId;
  }

  get sender(): string {
    return this._sender;
  }

  get content(): string {
    return this._content;
  }
}
