import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

import { prisma } from "../../libs/db/prismaClient";
import { JwtPayload } from "../../types/jwt.types";

export const authenticateJWT = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res
      .status(401)
      .json({ message: "Missing or invalid Authorization header" });
  }

  const token = authHeader?.split(" ")[1] || "";

  try {
    const payLoad = jwt.verify(token, process.env.JWT_SECRET!);

    const userPayLoad = payLoad as JwtPayload;

    const user = await prisma.user.findUnique({
      where: { id: String(userPayLoad.userId) },
    });

    if (!user) return res.status(401).json({ error: "User not found" });

    (req as any).user = user;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

export const authorizeRoles =
  (...roles: string[]) =>
  (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!roles.includes(user.role)) {
      return res
        .status(403)
        .json({ error: "Forbidden: insufficient permissions" });
    }
    next();
  };
