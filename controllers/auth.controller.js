const User = require("../models/User");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * LOGIN
 */
exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: "username and password required" });
    }

   const user = await User.findOne({ username }).lean();

console.log(
  "USER FROM MONGOOSE MODEL:\n",
  JSON.stringify(user, null, 2)
);



    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 🔑 Access Token (15 minutes)
    const accessToken = jwt.sign(
  { userId: user._id, role: user.role },
  process.env.JWT_ACCESS_SECRET,
  { expiresIn: "15m" }
);

const refreshToken = jwt.sign(
  { userId: user._id, role: user.role },
  process.env.JWT_REFRESH_SECRET,
  { expiresIn: "7d" }
);


   res.json({
  message: "Login successful",
  accessToken,
  refreshToken,
   user: {
        id: user._id.toString(),   // convert ObjectId to string
        username: user.username,
        role: user.role || "user",          // ✅ now role will show
      },
});

 } catch (error) {
  console.error("LOGIN ERROR 👉", error);
  res.status(500).json({
    message: "Server error",
    error: error.message
  });
}
};

/**
 * REFRESH TOKEN
 */
exports.refreshToken = async (req, res) => {
  const { refreshToken: refreshTokenFromClient } = req.body;

  if (!refreshTokenFromClient) {
    return res.status(401).json({ message: "Refresh token required" });
  }

  try {
    const decoded = jwt.verify(
      refreshTokenFromClient,
      process.env.JWT_REFRESH_SECRET
    );

   const newAccessToken = jwt.sign(
  { userId: decoded.userId, role: decoded.role }, // include role
  process.env.JWT_ACCESS_SECRET,
  { expiresIn: "15m" }
);


    res.json({ accessToken: newAccessToken });
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired refresh token" });
  }
};
