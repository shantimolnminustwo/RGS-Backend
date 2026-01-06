 const mongoose = require("mongoose");

exports.getOffers = async (req, res) => {
  try {
    console.log("REQ.USERID:", req.userId);

    const usersCollection = mongoose.connection.collection("users");
    const offersCollection = mongoose.connection.collection("offers");

    const user = await usersCollection.findOne({
      _id: new mongoose.Types.ObjectId(req.userId)
    });
    console.log("USER FROM DB:", user);

const now = new Date();


    const offers = await offersCollection.find({
      isActive: true,
      $or: [
        { expiryDate: { $gt: now } },
        { expiryDate: { $exists: false } }
      ]
    }).toArray();

    console.log("OFFERS FROM DB:", offers);

    const bookmarked = user?.bookmarkedOffers?.map(id => id.toString()) || [];
    console.log("BOOKMARKED IDS:", bookmarked);
    console.log("Offer _id type:", typeof offers[0]._id, offers[0]._id);
    console.log("Bookmarked id type:", typeof bookmarked[0], bookmarked[0]);


    const result = offers
      .map(offer => ({
        ...offer,
        isBookmarked: bookmarked.includes(offer._id.toString())
      }))
      .sort((a, b) => b.isBookmarked - a.isBookmarked);

    res.status(200).json(result);
  } catch (error) {
    console.error("GET OFFERS ERROR:", error);
    res.status(500).json({ message: "Failed to fetch offers" });
  }
};



exports.toggleBookmark = async (req, res) => {
  try {
    const usersCollection = mongoose.connection.collection("users");
    const offerId = req.params.offerId;

    const user = await usersCollection.findOne({
      _id: new mongoose.Types.ObjectId(req.userId)
    });

    const bookmarks = user.bookmarkedOffers || [];
    const index = bookmarks.findIndex(id => id.toString() === offerId);

    if (index === -1) {
      bookmarks.push(new mongoose.Types.ObjectId(offerId));
    } else {
      bookmarks.splice(index, 1);
    }

    await usersCollection.updateOne(
      { _id: user._id },
      { $set: { bookmarkedOffers: bookmarks } }
    );

    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: "Bookmark update failed" });
  }
};