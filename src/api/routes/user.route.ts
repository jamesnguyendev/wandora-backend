import { Router } from "express";

import * as userController from "../controllers/user.controller";
import {
  authenticateJWT,
  authorizeRoles,
} from "../middlewares/auth.middleware";

export const userRouter = Router();

userRouter.get(
  "/",
  authenticateJWT,
  authorizeRoles("admin"),
  userController.getUsers,
);

userRouter.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles("admin"),
  userController.deleteUser,
);

userRouter.put(
  "/:id",
  authenticateJWT,
  authorizeRoles("admin"),
  userController.updateUser,
);
