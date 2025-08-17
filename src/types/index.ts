export interface ResponseData<T = unknown> {
  success: boolean;
  code: number;
  message: string;
  data?: T;
}

export interface UserIndexDTO {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
}
