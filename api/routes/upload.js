const express = require('express');
const router = express.Router();
const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('../cloudinaryConfig');
const uploadController = require('../controllers/uploadController');

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: 'cv-rapido/fotos',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
    transformation: [{ width: 400, height: 400, crop: 'fill', gravity: 'face' }],
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

router.post('/', upload.single('foto'), uploadController.uploadPhoto);

module.exports = router;
