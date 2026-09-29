import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import connectDB from "./src/config/db.js";
import { notFound, errorHandler } from "./src/middleware/error.js";
import authRoutes from "./src/routes/auth.routes.js";
import tourRoutes from "./src/routes/tour.routes.js";
import bookingRoutes from "./src/routes/booking.routes.js";
import customerRoutes from "./src/routes/customer.routes.js";
import statsRoutes from "./src/routes/stats.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(cookieParser());

app.get("/api/health", (req, res) => {
  res.json({ status: "ok", service: "wayfare-api" });
});

app.use("/api/auth", authRoutes);
app.use("/api/tours", tourRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/customers", customerRoutes);
app.use("/api/admin", statsRoutes);

app.use(notFound);
app.use(errorHandler);

const start = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

start();