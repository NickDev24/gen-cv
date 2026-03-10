const cloudinary = require('cloudinary').v2;

// CLOUDINARY_URL env var is auto-detected by the SDK
cloudinary.config();

module.exports = cloudinary;
