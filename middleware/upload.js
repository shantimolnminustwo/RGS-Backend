 // middleware/upload.js
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../config/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "offers",
    resource_type: "image", // important!
    public_id: (req, file) => `${Date.now()}-${file.originalname.split('.')[0]}`,
  },
});


const upload = multer({ storage });

module.exports = upload;
