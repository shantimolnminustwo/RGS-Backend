// update-logos.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import Offer from "./models/Offer.js"; // adjust the path if needed

dotenv.config(); // loads .env variables

const MONGO_URI = process.env.MONGO_URI || "your_mongo_connection_string_here";

async function updateLogos() {
  await mongoose.connect(MONGO_URI);
  console.log("Connected to MongoDB");

  const offers = await Offer.find();
  for (let offer of offers) {
    if (offer.logo.startsWith("http://localhost:5000")) {
      offer.logo = offer.logo.replace(
        "http://localhost:5000",
        "https://rgs-backend.onrender.com"
      );
      await offer.save();
      console.log(`Updated logo for offer ${offer._id}`);
    }
  }

  console.log("All logos updated!");
  await mongoose.disconnect();
}

updateLogos().catch((err) => {
  console.error(err);
  process.exit(1);
});
