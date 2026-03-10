const express = require('express');
const router = express.Router();

const BASE_URL = 'https://cvrapido.vercel.app'; // Replace with real URL if known

const CATEGORIES = [
  'mineria', 'atencion-publico', 'administracion', 'construccion', 
  'gastronomia', 'comercio-ventas', 'seguridad', 'transporte', 
  'turismo', 'tecnologia'
];

router.get('/sitemap.xml', (req, res) => {
  res.header('Content-Type', 'application/xml');
  let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${BASE_URL}/</loc><priority>1.0</priority></url>`;
  
  CATEGORIES.forEach(cat => {
    xml += `\n  <url><loc>${BASE_URL}/categoria/${cat}</loc><priority>0.8</priority></url>`;
  });
  
  xml += '\n</urlset>';
  res.send(xml);
});

router.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.send(`User-agent: *
Allow: /
Sitemap: ${BASE_URL}/sitemap.xml`);
});

module.exports = router;
