import "dotenv/config";

export const envs = {
  PORT: Number(process.env.PORT),
  DATABASE_URL: process.env.DATABASE_URL as string,
  JWT_SECRET: process.env.JWT_EXPIRE_IN as string,
  GEMINI_API_KEY: process.env.JWT_EXPIRE_IN as string,
};
