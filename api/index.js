require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./db');

const fs = require('fs');

const app = express();

// Category data for SEO
const CATEGORIES_SEO = {
  'mineria': { title: 'CV para Minería', desc: 'Plantillas de CV profesionales para el sector minero en Argentina.' },
  'atencion-publico': { title: 'CV para Atención al Público', desc: 'Creá tu CV para cajas, recepción y ventas en minutos.' },
  'administracion': { title: 'CV para Administración', desc: 'Modelos de CV para administrativos y contadores.' },
  'construccion': { title: 'CV para Construcción', desc: 'CV profesional para albañiles, técnicos y operarios.' },
  'gastronomia': { title: 'CV para Gastronomía', desc: 'Plantillas para cocineros, mozos y ayudantes.' },
  'comercio-ventas': { title: 'CV para Comercio', desc: 'Generador de CV para vendedores y repositores.' },
  'seguridad': { title: 'CV para Seguridad', desc: 'Curriculum para vigiladores y personal de seguridad.' },
  'transporte': { title: 'CV para Transporte', desc: 'Modelos de CV para choferes y logística.' },
  'turismo': { title: 'CV para Turismo', desc: 'CV para hotelería y guías de turismo.' },
  'tecnologia': { title: 'CV para Tecnología', desc: 'Plantillas de CV para programadores y soporte técnico.' }
};

// Middleware
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// SEO Routes
app.use('/', require('./routes/seo'));

// API Routes
app.use('/api/cv', require('./routes/cv'));
app.use('/api/upload', require('./routes/upload'));

// Health check
app.get('/api/health', async (req, res) => {
  try {
    await connectDB();
    res.json({ status: 'ok', db: 'connected' });
  } catch (err) {
    res.status(500).json({ status: 'error', db: 'disconnected' });
  }
});

// Templates list
const { TEMPLATES } = require('./services/pdfGenerator');
app.get('/api/templates', (req, res) => {
  const list = Object.entries(TEMPLATES).map(([id, t]) => ({
    id,
    name: t.name,
    primary: t.primary,
    accent: t.accent,
    headerBg: t.headerBg,
    headerText: t.headerText,
  }));
  res.json(list);
});

// Category SEO Pages
app.get('/categoria/:id', (req, res) => {
  const cat = CATEGORIES_SEO[req.params.id];
  if (!cat) return res.redirect('/');

  const indexPath = path.join(__dirname, '..', 'dist', 'index.html');
  // In dev, dist might not exist, but on Vercel/Prod it should.
  // Fallback to project root index.html for local testing if dist not found
  const fallbackPath = path.join(__dirname, '..', 'index.html');
  const finalPath = fs.existsSync(indexPath) ? indexPath : fallbackPath;

  fs.readFile(finalPath, 'utf8', (err, data) => {
    if (err) return res.status(500).send('Error loading page');
    
    let result = data
      .replace(/<title>.*?<\/title>/, `<title>${cat.title} — CV RAPIDO</title>`)
      .replace(/meta name="description" content=".*?"/, `meta name="description" content="${cat.desc}"`)
      .replace(/property="og:title" content=".*?"/, `property="og:title" content="${cat.title}"`)
      .replace(/property="og:description" content=".*?"/, `property="og:description" content="${cat.desc}"`);
    
    res.send(result);
  });
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '..', 'dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'dist', 'index.html'));
  });
}

// Start (only when not on Vercel)
const PORT = process.env.PORT || 3000;
if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`🚀 CV RAPIDO server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
