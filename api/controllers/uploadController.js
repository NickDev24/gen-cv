const cloudinary = require('../cloudinaryConfig');

exports.uploadPhoto = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No se recibió ninguna imagen' });
    }

    // Multer-storage-cloudinary already uploaded to Cloudinary
    res.json({
      url: req.file.path,
      publicId: req.file.filename,
    });
  } catch (err) {
    console.error('Error subiendo imagen:', err);
    res.status(500).json({ error: 'Error al subir la imagen' });
  }
};
