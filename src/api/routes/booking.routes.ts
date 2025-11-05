import { Router } from "express";

import * as bookingsService from "../controllers/booking.controller";
import {
  authenticateJWT,
  authorizeRoles,
} from "../middlewares/auth.middleware";
import { validateBody } from "../middlewares/validate.middleware";
import { bookingSchema } from "../validators/listings.validator";

export const bookingsRouter = Router();

bookingsRouter.get("/", authenticateJWT, bookingsService.getListBookings);
bookingsRouter.get("/me", authenticateJWT, bookingsService.getMyBookings);

bookingsRouter.post(
  "/",
  authenticateJWT,
  validateBody(bookingSchema),
  bookingsService.createBooking,
);

bookingsRouter.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles("admin"),
  bookingsService.deleteBooking,
);

bookingsRouter.put(
  "/:id",
  authenticateJWT,
  authorizeRoles("admin"),
  bookingsService.updateBooking,
);
