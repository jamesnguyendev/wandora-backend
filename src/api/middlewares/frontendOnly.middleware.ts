import { NextFunction, Request, Response } from "express";

const FRONTEND_SECRET = process.env.FRONTEND_SECRET || " ";
const FRONTEND_ADMIN = process.env.FRONTEND_ADMIN;

export function frontendOnly(req: Request, res: Response, next: NextFunction) {
  const origin = req.headers.origin;
  const signature = req.headers["x-frontend-key"];

  const ALLOWED_ORIGINS = [
    FRONTEND_ADMIN,
    //"http://localhost:4000" dev env is open
  ];

  if (
    origin &&
    ALLOWED_ORIGINS.includes(origin) &&
    signature === FRONTEND_SECRET
  ) {
    return next();
  }

  return res.status(403).json({ message: "Forbidden: Denied access" });
}
//cơ bản đã hoàn thành ,tốt ưu hơn có thể tạo thêm timestamp và signature động.
