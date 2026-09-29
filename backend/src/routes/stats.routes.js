import express from "express";
import { getStats } from "../controllers/stats.controller.js";
import { protect, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/stats", protect, requireAdmin, getStats);

export default router;