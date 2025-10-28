import { Router } from "express";
import * as authController from "../controllers/auth.controller";

export const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
