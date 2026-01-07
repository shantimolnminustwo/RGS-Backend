const express = require("express");
const path = require("path");

const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB
connectDB();

// Routes
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/offers", require("./routes/offer.routes"));
app.use(
  "/uploads",
  express.static(path.join(__dirname, "uploads"))
);
 

 
app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
