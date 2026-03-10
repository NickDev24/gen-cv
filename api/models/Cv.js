const mongoose = require('mongoose');

const experienceSchema = new mongoose.Schema({
  puesto: { type: String, default: '' },
  empresa: { type: String, default: '' },
  periodo: { type: String, default: '' },
  descripcion: { type: String, default: '' },
}, { _id: false });

const educationSchema = new mongoose.Schema({
  titulo: { type: String, default: '' },
  institucion: { type: String, default: '' },
  periodo: { type: String, default: '' },
}, { _id: false });

const referenceSchema = new mongoose.Schema({
  nombre: { type: String, default: '' },
  relacion: { type: String, default: '' },
  telefono: { type: String, default: '' },
}, { _id: false });

const cvSchema = new mongoose.Schema({
  // Datos personales
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  dni: { type: String, default: '' },
  fechaNacimiento: { type: String, default: '' },
  direccion: { type: String, default: '' },
  ciudad: { type: String, default: '' },
  provincia: { type: String, default: '' },
  telefono: { type: String, default: '' },
  email: { type: String, default: '' },

  // Foto
  fotoUrl: { type: String, default: '' },

  // Perfil profesional
  perfil: { type: String, default: '' },

  // Categoría y plantilla
  categoria: { type: String, required: true },
  plantilla: { type: String, default: 'clasico' },

  // Secciones
  experiencia: [experienceSchema],
  educacion: [educationSchema],
  habilidades: [{ type: String }],
  referencias: [referenceSchema],

  // Timestamps
  createdAt: { type: Date, default: Date.now, expires: 86400 }, // TTL 24h
});

module.exports = mongoose.model('Cv', cvSchema);
