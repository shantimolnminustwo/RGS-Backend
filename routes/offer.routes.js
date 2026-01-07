 const express = require("express");
const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const upload = require("../middleware/upload");

const { createOffer } = require("../controllers/createoffer.controller");
const { getOffers, toggleBookmark } = require("../controllers/offer.controller");

const router = express.Router();

// GET offers
router.get("/", auth, getOffers);

// CREATE offer (admin only, Cloudinary upload)
router.post("/", auth, admin, upload.single("logo"), createOffer);

// BOOKMARK offer
router.post("/:offerId/bookmark", auth, toggleBookmark);

module.exports = router;
