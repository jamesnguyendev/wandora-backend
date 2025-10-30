import swaggerUi from "swagger-ui-express";
import fs from "fs";
import path from "path";
import yaml from "yaml";
import { Express } from "express";

export const setupSwagger = (app: Express): void => {
  const __dirname = path.resolve();
  const filePath = path.join(__dirname, "docs", "openapi.yaml");

  const fileContents = fs.readFileSync(filePath, "utf8");
  const swaggerDocument = yaml.parse(fileContents);

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  // console.log(` Swagger Docs ready at: ${process.env.LOCALHOST}/docs`);
};
