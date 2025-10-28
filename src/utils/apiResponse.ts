import { Response } from "express";

export class ApiResponse {
  static success(res: Response, message: string, data = {}, code = 200) {
    return res.status(code).json({
      status: "success",
      code,
      message,
      data,
      timestamp: new Date().toISOString(),
    });
  }

  static error(res: Response, message: string, code = 500, error: any = null) {
    return res.status(code).json({
      status: "error",
      code,
      message,
      error,
      timestamp: new Date().toISOString(),
    });
  }
}
