import { Router } from "express";

import * as bookingsService from "../controllers/booking.controller";
import { authenticateJWT } from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/validate.middleware";
import { bookingSchema } from "../validators/listings.validator";

export const bookingsRouter = Router();

bookingsRouter.post(
  "/",
  authenticateJWT,
  validateBody(bookingSchema),
  bookingsService.createBooking,
);

bookingsRouter.get("/me", authenticateJWT, bookingsService.getMyBookings);
