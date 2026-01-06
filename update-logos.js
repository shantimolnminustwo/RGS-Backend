 import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

// Just pass the connection string; remove useNewUrlParser/useUnifiedTopology
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

const offerSchema = new mongoose.Schema({
  logo: String
});
const Offer = mongoose.model("Offer", offerSchema);

async function updateLogos() {
  const offers = await Offer.find({});
  for (const offer of offers) {
    if (offer.logo.includes("localhost:5000")) {
      offer.logo = offer.logo.replace(
        "http://localhost:5000",
        "https://rgs-backend.onrender.com"
      );
      await offer.save();
      console.log("Updated:", offer._id, offer.logo);
    }
  }
  console.log("All logos updated!");
  mongoose.disconnect();
}

updateLogos();
