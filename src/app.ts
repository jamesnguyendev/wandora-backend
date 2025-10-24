import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import { logger } from "./utils/logger";
import { PORT } from "./config/index";

import { authRouter } from "./api/routes/auth.routes";
import { bookingsRouter } from "./api/routes/booking.routes";
import { listingsRouter } from "./api/routes/listings.routes";

const app = express();

// Middleware enabled
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

// Routes would be defined here
app.use("/auth", authRouter);
app.use("/listings", listingsRouter);
app.use("/bookings", bookingsRouter);

// Health
app.get("/health", (_, res) => res.json({ status: "ok", project: "Wandora" }));

app.use(
  (err: any, _req: express.Request, res: express.Response, _next: any) => {
    console.error(err);
    res
      .status(err.status || 500)
      .json({ message: err.message || "Internal Server Error" });
  },
);

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
