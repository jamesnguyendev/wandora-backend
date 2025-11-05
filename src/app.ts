import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";

import { logger } from "./utils/logger";
import { PORT } from "./config/index";

import { setupSwagger } from "./config/swagger";
import { apiRouter } from "./api/routes/api.route";
import { errorHandler } from "./api/middlewares/error.middleware";
import { rateLimiter } from "./api/middlewares/rateLimit.middleware";
import { corsOptions } from "./config/cors.config";

export const app = express();

app.use(helmet());
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan("dev"));
app.use(rateLimiter);

app.use("/api/v1", apiRouter);

setupSwagger(app);

app.use(errorHandler);

app.get("/health", (_req, res) => res.send("OK"));

app.listen(PORT, () => logger.info(`Server running on port ${PORT}`));
