import { Response, Request } from "express";

import * as bookingsService from "../../services/bookings.service";
import { ApiResponse } from "../../utils/apiResponse";
import { redisClient } from "../../libs/cache/redisClient";

export const createBooking = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    const booking = await bookingsService.createBooking({
      userId,
      ...req.body,
    });

    return ApiResponse.success(res, "Booking created", booking);
  } catch (err) {
    return ApiResponse.error(res, "Failed to create booking", 500, err);
  }
};

export const getMyBookings = async (req: Request, res: Response) => {
  const userId = (req as any).user?.id;
  const cacheKey = `user:${userId}:bookings`;

  try {
    const cached = await redisClient.get(cacheKey);
    if (cached) {
      const bookings = JSON.parse(cached);
      return ApiResponse.success(
        res,
        "Bookings fetched successful from cache",
        bookings,
      );
    }

    const bookings = await bookingsService.getBookingsByUser(userId);

    if (!bookings) {
      return ApiResponse.error(res, "No bookings found", 404);
    }

    await redisClient.set(cacheKey, JSON.stringify(bookings), "EX", 300);

    return ApiResponse.success(res, "Bookings fetched successful", bookings);
  } catch (err) {
    return ApiResponse.error(res, "Failed to fetch bookings", 500, err);
  }
};
