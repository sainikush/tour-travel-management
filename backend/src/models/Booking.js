import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingCode: { type: String, required: true, unique: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
    customer: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, default: "" },
    travellers: { type: Number, required: true, min: 1 },
    bookAt: { type: Date, required: true },
    amount: { type: Number, required: true },
    status: {
      type: String,
      enum: ["confirmed", "pending", "cancelled", "completed"],
      default: "pending",
    },
  },
  { timestamps: true }
);



const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;