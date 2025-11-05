import { Request, Response, NextFunction } from "express";

export const errorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  if (err.message === "Not allowed by CORS") {
    return res.status(403).json({
      status: 403,
      error: "Forbidden",
      message: "Cross-origin request blocked",
    });
  }

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error.",
  });
};
