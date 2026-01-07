const mongoose = require("mongoose");

const offerSchema = new mongoose.Schema(
  {
    brandName: { type: String, required: true },
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    description: { type: String },
    note: { type: String },
    logo: { type: String },
    address: { type: String },
    isBookmarked: { type: Boolean, default: false },
    isActive: { type: Boolean, default: true },
    nearYou: { type: Boolean, default: false },

    // ✅ NEW FIELD
    expiryDate: { type: Date, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Offer", offerSchema, "offers");
