import { Request, Response } from "express";
import { ApiResponse } from "../../utils/apiResponse";
import * as userService from "../../services/user.service";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await userService.getUsers();
    return ApiResponse.success(res, "Users fetched successfully", users);
  } catch (error) {
    return ApiResponse.error(res, "Failed to fetch Users", 500, error);
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    await userService.deleteUser(String(req.params.id));
    return ApiResponse.success(res, "User deleted successfully", 200);
  } catch (error) {
    return ApiResponse.error(res, "Failed to delete User", 500, error);
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    await userService.updateUser(String(req.params.id), req.body);
    return ApiResponse.success(res, "User updated successfully", 200);
  } catch (error) {
    return ApiResponse.error(res, "Failed to update User", 500, error);
  }
};
