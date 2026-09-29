import express from "express";
import {
  getCustomers,
  getCustomerById,
  updateCustomerStatus,
} from "../controllers/customer.controller.js";
import { protect, requireAdmin } from "../middleware/auth.js";

const router = express.Router();

router.get("/", protect, requireAdmin, getCustomers);
router.get("/:id", protect, requireAdmin, getCustomerById);
router.patch("/:id/status", protect, requireAdmin, updateCustomerStatus);

export default router;