import User from "../models/User.js";
import Booking from "../models/Booking.js";

export const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({ role: "customer" })
      .select("-password")
      .sort({ createdAt: -1 });

    const withCounts = await Promise.all(
      customers.map(async (user) => {
        const count = await Booking.countDocuments({ user: user._id });
        return {
          _id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          status: user.status,
          joined: user.createdAt,
          bookings: count,
        };
      })
    );

    res.json(withCounts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCustomerById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Customer not found" });
    }

    const bookings = await Booking.find({ user: user._id })
      .populate("tour", "title destination price photo")
      .sort({ createdAt: -1 });

    res.json({ user, bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCustomerStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["active", "banned"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const user = await User.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    ).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Customer not found" });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};