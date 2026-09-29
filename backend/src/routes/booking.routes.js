import express from "express";
import {
  getBookings,
  getBookingById,
  createBooking,
  updateBookingStatus,
  deleteBooking,
} from "../controllers/booking.controller.js";
import { protect, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, getBookings);
router.get("/:id", protect, getBookingById);
router.post("/", protect, createBooking);
router.patch("/:id/status", protect, requireAdmin, updateBookingStatus);
router.delete("/:id", protect, deleteBooking);

export default router;