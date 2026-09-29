import Tour from "../models/Tour.js";

export const getTours = async (req, res) => {
  try {
    const { featured, q, status } = req.query;
    const filter = {};

    if (featured === "true") filter.featured = true;
    if (status) filter.status = status;

    if (q) {
      filter.$or = [
        { title: { $regex: q, $options: "i" } },
        { destination: { $regex: q, $options: "i" } },
        { city: { $regex: q, $options: "i" } },
      ];
    }

    const tours = await Tour.find(filter).sort({ createdAt: -1 });
    res.json(tours);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

import mongoose from "mongoose";

export const getTourById = async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(404).json({ message: "Tour not found" });
    }

    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createTour = async (req, res) => {
  try {
    const tour = await Tour.create(req.body);
    res.status(201).json(tour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.json(tour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }
    res.json({ message: "Tour deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const addReview = async (req, res) => {
  try {
    const { rating, text } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: "Rating must be between 1 and 5" });
    }

    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    tour.reviews.push({
      user: req.user._id,
      name: req.user.name,
      rating,
      text,
    });

    await tour.save();
    res.status(201).json(tour);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};