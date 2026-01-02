const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    brandName: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true }, // store percentage as number
    description: { type: String },
    note: { type: String },
    logo: { type: String }, // store image URL or path
    isBookmarked: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    nearYou: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema, "offers");
