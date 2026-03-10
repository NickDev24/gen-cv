const Cv = require('../models/Cv');
const { generatePdf } = require('../services/pdfGenerator');
const connectDB = require('../db');

// Crear CV
exports.createCv = async (req, res) => {
  try {
    await connectDB();
    const cv = new Cv(req.body);
    await cv.save();
    res.status(201).json({ id: cv._id, message: 'CV guardado correctamente' });
  } catch (err) {
    console.error('Error creando CV:', err);
    res.status(500).json({ error: 'Error al guardar el CV' });
  }
};

// Obtener CV por ID
exports.getCv = async (req, res) => {
  try {
    await connectDB();
    const cv = await Cv.findById(req.params.id);
    if (!cv) return res.status(404).json({ error: 'CV no encontrado' });
    res.json(cv);
  } catch (err) {
    console.error('Error obteniendo CV:', err);
    res.status(500).json({ error: 'Error al obtener el CV' });
  }
};

// Generar y descargar PDF
exports.downloadPdf = async (req, res) => {
  try {
    await connectDB();
    const cv = await Cv.findById(req.params.id);
    if (!cv) return res.status(404).json({ error: 'CV no encontrado' });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename=CV_${cv.nombre}_${cv.apellido}.pdf`
    );

    const stream = await generatePdf(cv.toObject());
    stream.pipe(res);
  } catch (err) {
    console.error('Error generando PDF:', err);
    res.status(500).json({ error: 'Error al generar el PDF' });
  }
};
