 const Offer = require("../models/Offer");
const getLatLngFromAddress = require("../utils/getLatLngFromAddress");

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
      expiryDate,
    } = req.body;

    if (!brandName || !discount || !code || !address || !expiryDate) {
      return res.status(400).json({
        message:
          "brandName, discount, code, address, expiryDate are required",
      });
    }

    const expiry = new Date(expiryDate);

    // 🔹 Geocode address
    const location = await getLatLngFromAddress(address);

    // 🔹 Cloudinary/local image URL
    const logo = req.file ? req.file.path : null;

    const offer = await Offer.create({
      brandName,
      discount,
      code,
      nearYou: nearYou === true || nearYou === "true",
      description,
      note,
      address,
      lat: location.lat,
      lng: location.lng,
      logo,
      expiryDate: expiry,
      createdBy: req.userId,
      isActive: true,
    });

    res.status(201).json({
      message: "Offer created successfully",
      offer,
    });
  } catch (err) {
    console.error("CREATE OFFER ERROR 👉", err);
    res.status(500).json({ 
      message: err.message,
      details: err.stack || err,
      error: err // Send full error object for debugging
    });
  }
};
