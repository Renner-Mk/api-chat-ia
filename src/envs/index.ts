import "dotenv/config";

export const envs = {
  PORT: Number(process.env.PORT),
  DATABASE_URL: process.env.DATABASE_URL as string,
  GEMINI_API_KEY: process.env.GEMINI_API_KEY as string,
  JWT_SECRET_KEY: process.env.JWT_SECRET_KEY as string,
  JWT_EXPIRE_IN: process.env.JWT_EXPIRE_IN as string,
  BCRYPT_SALT: Number(process.env.BCRYPT_SALT),
};
