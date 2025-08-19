declare namespace Express {
  interface Request {
    authUser?: {
      id: string;
      firstName: string;
      lastName: string;
    };
  }
}
