import { Router } from "express";

export const bookingsRouter = Router();

// Example route
bookingsRouter.get("/test", (_req, res) => {
  res.json({ message: "Bookings router is working!" });
});
