import { Router } from "express";
import { authRouter } from "../../api/routes/auth.routes";
import { bookingsRouter } from "../../api/routes/booking.routes";
import { listingsRouter } from "../../api/routes/listings.routes";

const router = Router();

router.use("/auth", authRouter);
router.use("/listings", listingsRouter);
router.use("/bookings", bookingsRouter);

export { router as apiRouter };
