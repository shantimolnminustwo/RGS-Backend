const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");
    console.log("CONNECTED DATABASE:", mongoose.connection.name);

  } catch (error) {
    console.error("❌ MongoDB error", error);
    process.exit(1);
  }
};

module.exports = connectDB;
