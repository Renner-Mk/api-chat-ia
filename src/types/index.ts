export interface ResponseData<T = unknown> {
  success: boolean;
  code: number;
  message: string;
  data?: T;
}

export interface WSMessage {
  sender: string;
  content: string;
}
