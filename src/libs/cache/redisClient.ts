import Redis from "ioredis";
import { REDIS_PASSWORD, REDIS_PORT, REDIS_URL } from "../../config/index";

export const redisClient = new Redis({
  host: REDIS_URL,
  port: Number(REDIS_PORT || 19344),
  password: REDIS_PASSWORD || "",
});
