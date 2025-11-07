import { Request, Response } from "express";
import * as authService from "../../services/auth.service";
import { ApiResponse } from "../../utils/apiResponse";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    await authService.registerUser(email, password);
    return ApiResponse.success(res, "Successfully registered");
  } catch (err: any) {    res.status(400).json({ error: err.message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.json(result);
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  const { token } = req.body;
  if (!token) return res.status(400).json({ message: "Token missing!" });

  try {
    const newToken = await authService.refreshTokenService(token);

    res.json({ token: newToken });
  } catch (err: any) {
    res.status(401).json({ error: err.message });
  }
};
