const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
require("dotenv").config();

async function createAdmin() {
  try {
    // 1️⃣ Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB connected");

    // 2️⃣ Get users collection
    const users = mongoose.connection.collection("users");

    // 3️⃣ Hash password
    const plainPassword = "admin123";
    const passwordHash = await bcrypt.hash(plainPassword, 10);

    // 4️⃣ Insert admin user
    await users.insertOne({
      username: "admin",
      password: passwordHash,
      role: "admin",
      createdAt: new Date(),
    });

    console.log("✅ Admin user created successfully");
    console.log("👉 Username: admin");
    console.log("👉 Password: admin123");

    process.exit();
  } catch (error) {
    console.error("❌ Error creating admin:", error.message);
    process.exit(1);
  }
}

createAdmin();
