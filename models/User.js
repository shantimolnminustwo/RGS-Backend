const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, default: "user" },
  bookmarkedOffers: { type: Array, default: [] }
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
