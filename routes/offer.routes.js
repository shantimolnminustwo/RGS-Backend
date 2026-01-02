const express = require("express");
const auth = require("../middleware/auth");
const {
  getOffers,
  toggleBookmark
} = require("../controllers/offer.controller");

const router = express.Router();

router.get("/", auth, getOffers);
router.post("/:offerId/bookmark", auth, toggleBookmark);

module.exports = router;
