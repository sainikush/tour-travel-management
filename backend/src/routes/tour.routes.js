import express from "express";
import {
  getTours,
  getTourById,
  createTour,
  updateTour,
  deleteTour,
  addReview,
} from "../controllers/tour.controller.js";
import { protect, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", getTours);
router.get("/:id", getTourById);
router.post("/", protect, requireAdmin, createTour);
router.put("/:id", protect, requireAdmin, updateTour);
router.delete("/:id", protect, requireAdmin, deleteTour);
router.post("/:id/reviews", protect, addReview);

export default router;