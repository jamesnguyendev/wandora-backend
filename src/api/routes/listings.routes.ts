import { Router } from "express";

export const listingsRouter = Router();

// Example route
listingsRouter.get("/test", (_req, res) => {
  res.json({ message: "Listings router is working!" });
});
