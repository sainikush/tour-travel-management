import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/models/User.js";

dotenv.config();

const checkAdmins = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    const admins = await User.find({ role: "admin" }).select("name email role createdAt");

    console.log("\n=== Admin users ===");
    if (admins.length === 0) {
      console.log("No admin users found.");
    } else {
      admins.forEach((u, i) => {
        console.log(`${i + 1}. ${u.name} <${u.email}>  joined ${u.createdAt.toISOString().slice(0, 10)}`);
      });
    }

    const total = await User.countDocuments();
    console.log(`\nTotal users: ${total}`);
    console.log(`Admins: ${admins.length}`);

    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.error("Error:", error.message);
    process.exit(1);
  }
};

checkAdmins();