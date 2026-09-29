import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    name: { type: String, required: true },
    rating: { type: Number, required: true, min: 1, max: 5 },
    text: { type: String, default: "" },
    date: { type: Date, default: Date.now },
  },
  { _id: false }
);

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    destination: { type: String, required: true, trim: true },
    city: { type: String, default: "" },
    address: { type: String, default: "" },
    distance: { type: Number, default: 0 },
    duration: { type: String, default: "" },
    description: { type: String, default: "" },
    price: { type: Number, required: true },
    seats: { type: Number, default: 0 },
    maxGroupSize: { type: Number, default: 10 },
    photo: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    category: {
      type: String,
      enum: ["beach", "mountains", "cultural", "international", "other"],
      default: "other",
    },
    status: {
      type: String,
      enum: ["live", "draft", "archived"],
      default: "draft",
    },
    reviews: [reviewSchema],
  },
  { timestamps: true }
);

const Tour = mongoose.model("Tour", tourSchema);

export default Tour;