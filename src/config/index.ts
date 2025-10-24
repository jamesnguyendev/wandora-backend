import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 4000;

export const DATABASE_URL = process.env.DATABASE_URL!;

export const REDIS_URL = process.env.REDIS_URL!;

export const RABBITMQ_URL = process.env.RABBITMQ_URL!;

export const JWT_SECRET = process.env.JWT_SECRET || "devsecret";
export const JWT_ACCESS_EXPIRE = process.env.JWT_ACCESS_EXPIRE || "15m";
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "7d";
