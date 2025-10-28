import dotenv from "dotenv";

dotenv.config();

export const PORT = process.env.PORT || 4000;

export const DATABASE_URL = process.env.DATABASE_URL!;

export const REDIS_URL = process.env.REDIS_URL!;
export const REDIS_PORT = process.env.REDIS_PORT || "6379";
export const REDIS_PASSWORD = process.env.REDIS_PASSWORD || "";

export const JWT_SECRET = process.env.JWT_SECRET || "devsecret";
export const JWT_ACCESS_EXPIRE = process.env.JWT_ACCESS_EXPIRE || "15m";
export const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "7d";
