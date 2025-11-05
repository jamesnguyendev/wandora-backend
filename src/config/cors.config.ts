export const allowedOrigins = ["https://wandora-frontend-admin.vercel.app"];

// if (process.env.NODE_ENV === "development") {
//   allowedOrigins.push("http://localhost:4000");
// }

export const corsOptions = {
  origin: (origin: string | undefined, callback: Function) => {
    if (allowedOrigins.includes(origin || "")) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};
