import User from "../models/User.js";
import Tour from "../models/Tour.js";
import Booking from "../models/Booking.js";

export const getStats = async (req, res) => {
  try {
    const [totalBookings, activePackages, totalCustomers] = await Promise.all([
      Booking.countDocuments(),
      Tour.countDocuments({ status: "live" }),
      User.countDocuments({ role: "customer" }),
    ]);

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);

    const monthBookings = await Booking.find({
      createdAt: { $gte: startOfMonth },
      status: { $in: ["confirmed", "completed"] },
    });

    const revenueThisMonth = monthBookings.reduce(
      (sum, b) => sum + b.amount,
      0
    );

    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);

    const weekly = await Booking.aggregate([
      { $match: { createdAt: { $gte: weekAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%a", date: "$createdAt" } },
          count: { $sum: 1 },
        },
      },
    ]);

    res.json({
      totalBookings,
      activePackages,
      revenueThisMonth,
      totalCustomers,
      weekly,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};