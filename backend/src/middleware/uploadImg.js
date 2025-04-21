const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../utils/cloudinary.js");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "png", "jpeg", "gif"],
    public_id: (req, file) => file.filename,
  },
});

const upload = multer({ storage });

module.exports = upload;

// import path from "path";

// //** multer way with read and write access filesystem hosts **//
// // Set storage engine
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads/"); // Folder to store uploaded images
//   },
//   filename: (req, file, cb) => {
//     const filename = `${Date.now()}-${file.originalname}`;
//     req.filename = filename;
//     cb(null, `${filename}`);
//   },
// });

// // File filter
// const fileFilter = (req, file, cb) => {
//   const allowedTypes = /jpeg|jpg|png|gif/;
//   const extname = allowedTypes.test(
//     path.extname(file.originalname).toLowerCase()
//   );
//   const mimetype = allowedTypes.test(file.mimetype);

//   if (extname && mimetype) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only images are allowed!"), false);
//   }
// };

// const upload = multer({
//   storage,
//   limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
//   fileFilter,
// });
