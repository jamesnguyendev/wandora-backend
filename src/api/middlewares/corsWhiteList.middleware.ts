import cors, { CorsOptions } from "cors";

const whitelist: string[] = ["https://wandora-frontend-admin.vercel.app"];

const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (origin && whitelist.includes(origin)) {
      callback(null, true);
    } else {
      console.warn(`❌ Blocked by CORS: ${origin}`);
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

export const corsMiddleware = cors(corsOptions);
