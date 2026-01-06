 const Offer = require("../models/Offer");
const getLatLngFromAddress = require("../utils/getLatLngFromAddress");
const path = require("path");
const multer = require("multer");

// Multer setup
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + "-" + file.fieldname + ext);
  },
});

const upload = multer({ storage });

// Export middleware to use in route
exports.uploadLogo = upload.single("logo");

// Create offer controller
exports.createOffer = async (req, res) => {
  try {
    const {
      brandName,
      discount,
      code,
      nearYou,
      description,
      note,
      address,
      expiryDate, // 👈 NEW
    } = req.body;

    if (!brandName || !discount || !code || !address || !expiryDate) {
      return res.status(400).json({
        message: "brandName, discount, code, address, expiryDate are required",
      });
    }

    // Convert expiryDate to Date object
    const expiry = new Date(expiryDate);

    // Get lat/lng from address
    const location = await getLatLngFromAddress(address);

    const logoPath = req.file ? `/uploads/${req.file.filename}` : null;

    const offer = await Offer.create({
      brandName,
      discount,
      code,
      nearYou,
      description,
      note,
      address,
      lat: location.lat,
      lng: location.lng,
      logo: logoPath,
      expiryDate: expiry, // ✅ SAVE
      createdBy: req.userId,
    });

    res.status(201).json({ message: "Offer created successfully", offer });
  } catch (err) {
    console.error("CREATE OFFER ERROR 👉", err);
    res.status(400).json({ message: err.message });
  }
};

