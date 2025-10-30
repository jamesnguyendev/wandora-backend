import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { redisClient } from "../../libs/cache/redisClient";

export const rateLimiter = rateLimit({
  store: new RedisStore({
    sendCommand: (...args: string[]) =>
      redisClient.call(...(args as [string, ...string[]])) as Promise<number>,
  }),
  windowMs: 1 * 60 * 1000,
  max: 60,
  keyGenerator: (req: any) => {
    return (req.user?.id as string) || "unknown";
  },
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "error",
    code: 429,
    message: "Too many requests, please try again later",
  },
});
