export interface ResponseData<T = unknown> {
  success: boolean;
  code: number;
  message: string;
  data?: T;
}
