import mongoose from "mongoose";
import dotenv from "dotenv";
import Tour from "./src/models/Tour.js";

dotenv.config();

const tours = [
  {
    title: "Westminster Bridge",
    destination: "London",
    city: "London",
    address: "Westminster, London SW1A",
    distance: 300,
    duration: "1 day",
    description:
      "A full-day guided tour through Westminster's most iconic landmarks — Big Ben, the London Eye, and a Thames river cruise at sunset.",
    price: 99,
    seats: 10,
    maxGroupSize: 10,
    photo: "/tour-images/tour-img01.jpg",
    featured: true,
    category: "cultural",
    status: "live",
  },
  {
    title: "Bali Escape",
    destination: "Indonesia",
    city: "Bali",
    address: "Ubud, Bali",
    distance: 400,
    duration: "5 days / 4 nights",
    description:
      "Five days across Ubud's rice terraces, Uluwatu's cliffside temples, and Seminyak's beach clubs — with a private driver throughout.",
    price: 42000,
    seats: 12,
    maxGroupSize: 8,
    photo: "/tour-images/tour-img02.jpg",
    featured: true,
    category: "beach",
    status: "live",
  },
  {
    title: "Snowy Mountains",
    destination: "Thailand",
    city: "Chiang Mai",
    address: "Chiang Mai, Thailand",
    distance: 500,
    duration: "4 days / 3 nights",
    description:
      "Trek through northern Thailand's hill country, visit hill-tribe villages, and end each day at a mountain lodge with a view.",
    price: 35000,
    seats: 8,
    maxGroupSize: 8,
    photo: "/tour-images/tour-img03.jpg",
    featured: true,
    category: "mountains",
    status: "live",
  },
  {
    title: "Beautiful Sunrise",
    destination: "Thailand",
    city: "Krabi",
    address: "Krabi, Thailand",
    distance: 500,
    duration: "4 days / 3 nights",
    description:
      "Catch the sunrise over Railay Beach, kayak through limestone caves, and spend the afternoon snorkelling in the Andaman Sea.",
    price: 38000,
    seats: 10,
    maxGroupSize: 8,
    photo: "/tour-images/tour-img04.jpg",
    featured: true,
    category: "beach",
    status: "live",
  },
  {
    title: "Nusa Penida",
    destination: "Indonesia",
    city: "Bali",
    address: "Nusa Penida, Bali",
    distance: 500,
    duration: "1 day",
    description:
      "A day trip to Nusa Penida's Kelingking cliff, Broken Beach, and Angel's Billabong — with snorkelling at Manta Point.",
    price: 15000,
    seats: 15,
    maxGroupSize: 8,
    photo: "/tour-images/tour-img05.jpg",
    featured: false,
    category: "beach",
    status: "live",
  },
  {
    title: "Cherry Blossoms Spring",
    destination: "Japan",
    city: "Kyoto",
    address: "Kyoto, Japan",
    distance: 500,
    duration: "8 days / 7 nights",
    description:
      "Travel Kyoto and Nara during sakura season — temples, tea houses, and the Philosopher's Path in full bloom.",
    price: 99000,
    seats: 10,
    maxGroupSize: 8,
    photo: "/tour-images/tour-img06.jpg",
    featured: true,
    category: "cultural",
    status: "live",
  },
  {
    title: "Lofoten Islands",
    destination: "Norway",
    city: "Lofoten",
    address: "Lofoten Islands, Norway",
    distance: 500,
    duration: "6 days / 5 nights",
    description:
      "Explore the Lofoten Islands' fishing villages and jagged peaks — with a chance to see the northern lights on winter departures.",
    price: 145000,
    seats: 6,
    maxGroupSize: 8,
    photo: "/tour-images/tour-img07.jpg",
    featured: false,
    category: "mountains",
    status: "live",
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    await Tour.deleteMany({});
    console.log("Cleared existing tours");

    await Tour.insertMany(tours);
    console.log(`Inserted ${tours.length} tours`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error.message);
    process.exit(1);
  }
};

seedDB();