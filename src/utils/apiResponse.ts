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

  static paginate(
    res: Response,
    message: string,
    payload: {
      data: any[];
      page: number;
      limit: number;
      totalItems: number;
      totalPages: number;
    },
    code = 200,
  ) {
    return res.status(code).json({
      status: "success",
      code,
      message,
      page: payload.page,
      limit: payload.limit,
      totalItems: payload.totalItems,
      totalPages: payload.totalPages,
      data: payload.data,
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
