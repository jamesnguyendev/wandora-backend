import { Router } from "express";

import * as listingsController from "../controllers/listings.controller";
import { validateBody } from "../middlewares/validate.middleware";
import { createListingSchema } from "../validators/listings.validator";
import {
  authenticateJWT,
  authorizeRoles,
} from "../middlewares/auth.middleware";

export const listingsRouter = Router();

listingsRouter.get("/", listingsController.getListings);
listingsRouter.get("/search", listingsController.searchListing);
listingsRouter.post("/upload-image", listingsController.uploadImage);
listingsRouter.get("/:id", listingsController.getListingById);

listingsRouter.post(
  "/",
  authenticateJWT,
  authorizeRoles("admin"),
  validateBody(createListingSchema),
  listingsController.createListing,
);

listingsRouter.delete(
  "/:id",
  authenticateJWT,
  authorizeRoles("admin"),
  listingsController.deleteListing,
);

listingsRouter.put( 
  "/:id",
  authenticateJWT,
  authorizeRoles("admin"),
  validateBody(createListingSchema),
  listingsController.updateListing,
);
