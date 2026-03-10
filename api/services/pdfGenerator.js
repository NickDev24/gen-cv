const PDFDocument = require('pdfkit');
const https = require('https');
const http = require('http');

/* ──────────────────────────────────────
   10 Template style configs
   ────────────────────────────────────── */
const TEMPLATES = {
  clasico: {
    name: 'Clásico',
    primary: '#1a1a2e',
    secondary: '#16213e',
    accent: '#0f3460',
    text: '#222222',
    light: '#f0f0f0',
    headerBg: '#1a1a2e',
    headerText: '#ffffff',
  },
  moderno: {
    name: 'Moderno',
    primary: '#2d3436',
    secondary: '#636e72',
    accent: '#00b894',
    text: '#2d3436',
    light: '#f5f5f5',
    headerBg: '#2d3436',
    headerText: '#ffffff',
  },
  ejecutivo: {
    name: 'Ejecutivo',
    primary: '#0c2461',
    secondary: '#1e3799',
    accent: '#4a69bd',
    text: '#1e272e',
    light: '#eef1f7',
    headerBg: '#0c2461',
    headerText: '#ffffff',
  },
  elegante: {
    name: 'Elegante',
    primary: '#2c2c54',
    secondary: '#474787',
    accent: '#706fd3',
    text: '#2c2c54',
    light: '#f7f1e3',
    headerBg: '#2c2c54',
    headerText: '#f7f1e3',
  },
  profesional: {
    name: 'Profesional',
    primary: '#2f3542',
    secondary: '#57606f',
    accent: '#3742fa',
    text: '#2f3542',
    light: '#f1f2f6',
    headerBg: '#2f3542',
    headerText: '#ffffff',
  },
  minimalista: {
    name: 'Minimalista',
    primary: '#333333',
    secondary: '#777777',
    accent: '#e74c3c',
    text: '#333333',
    light: '#fafafa',
    headerBg: '#ffffff',
    headerText: '#333333',
  },
  corporativo: {
    name: 'Corporativo',
    primary: '#003366',
    secondary: '#336699',
    accent: '#ff6600',
    text: '#1a1a1a',
    light: '#e8f0fe',
    headerBg: '#003366',
    headerText: '#ffffff',
  },
  creativo: {
    name: 'Creativo',
    primary: '#6c5ce7',
    secondary: '#a29bfe',
    accent: '#fd79a8',
    text: '#2d3436',
    light: '#f8f9fa',
    headerBg: '#6c5ce7',
    headerText: '#ffffff',
  },
  sobrio: {
    name: 'Sobrio',
    primary: '#34495e',
    secondary: '#7f8c8d',
    accent: '#27ae60',
    text: '#2c3e50',
    light: '#ecf0f1',
    headerBg: '#34495e',
    headerText: '#ecf0f1',
  },
  industrial: {
    name: 'Industrial',
    primary: '#2d2d2d',
    secondary: '#5a5a5a',
    accent: '#f39c12',
    text: '#2d2d2d',
    light: '#f4f4f4',
    headerBg: '#2d2d2d',
    headerText: '#f39c12',
  },
};

/* ──────────────────────────────────────
   Helper: fetch image as buffer
   ────────────────────────────────────── */
function fetchImage(url) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith('https') ? https : http;
    mod.get(url, (res) => {
      const chunks = [];
      res.on('data', (c) => chunks.push(c));
      res.on('end', () => resolve(Buffer.concat(chunks)));
      res.on('error', reject);
    }).on('error', reject);
  });
}

/* ──────────────────────────────────────
   Hex to RGB
   ────────────────────────────────────── */
function hexToRgb(hex) {
  const h = hex.replace('#', '');
  return [
    parseInt(h.substring(0, 2), 16),
    parseInt(h.substring(2, 4), 16),
    parseInt(h.substring(4, 6), 16),
  ];
}

/* ──────────────────────────────────────
   Main PDF generator
   ────────────────────────────────────── */
async function generatePdf(cvData) {
  const tpl = TEMPLATES[cvData.plantilla] || TEMPLATES.clasico;
  const [pr, pg, pb] = hexToRgb(tpl.primary);
  const [ar, ag, ab] = hexToRgb(tpl.accent);
  const [tr, tg, tb] = hexToRgb(tpl.text);
  const [hr, hg, hb] = hexToRgb(tpl.headerText);
  const [hbr, hbg, hbb] = hexToRgb(tpl.headerBg);
  const [lr, _lg, lb] = hexToRgb(tpl.light);

  const doc = new PDFDocument({
    size: 'A4',
    margins: { top: 0, bottom: 40, left: 0, right: 0 },
    info: {
      Title: `CV - ${cvData.nombre} ${cvData.apellido}`,
      Author: 'CV RAPIDO',
    },
  });

  const PAGE_W = 595.28;
  const MARGIN = 45;
  const CONTENT_W = PAGE_W - MARGIN * 2;

  let y = 0;

  /* ── HEADER ───────────────────────── */
  doc.rect(0, 0, PAGE_W, 140).fill(rgbStr(hbr, hbg, hbb));

  // Photo
  let headerTextX = MARGIN;
  if (cvData.fotoUrl) {
    try {
      const imgBuf = await fetchImage(cvData.fotoUrl);
      doc.save();
      doc.circle(80, 70, 40).clip();
      doc.image(imgBuf, 40, 30, { width: 80, height: 80 });
      doc.restore();
      headerTextX = 140;
    } catch (_) { /* skip photo on error */ }
  }

  doc.fillColor(rgbStr(hr, hg, hb))
    .font('Helvetica-Bold').fontSize(24)
    .text(`${cvData.nombre} ${cvData.apellido}`, headerTextX, 35, { width: PAGE_W - headerTextX - MARGIN });

  // contact line
  const contactParts = [];
  if (cvData.telefono) contactParts.push(cvData.telefono);
  if (cvData.email) contactParts.push(cvData.email);
  if (cvData.ciudad && cvData.provincia) contactParts.push(`${cvData.ciudad}, ${cvData.provincia}`);
  else if (cvData.ciudad) contactParts.push(cvData.ciudad);

  if (contactParts.length) {
    doc.font('Helvetica').fontSize(10)
      .text(contactParts.join('  |  '), headerTextX, 68, { width: PAGE_W - headerTextX - MARGIN });
  }

  // DNI + Fecha nacimiento
  const subParts = [];
  if (cvData.dni) subParts.push(`DNI: ${cvData.dni}`);
  if (cvData.fechaNacimiento) subParts.push(`Nacimiento: ${cvData.fechaNacimiento}`);
  if (cvData.direccion) subParts.push(cvData.direccion);
  if (subParts.length) {
    doc.fontSize(9).text(subParts.join('  |  '), headerTextX, 85, { width: PAGE_W - headerTextX - MARGIN });
  }

  // Category badge
  if (cvData.categoria) {
    doc.fillColor(rgbStr(ar, ag, ab)).font('Helvetica-Bold').fontSize(10)
      .text(cvData.categoria.toUpperCase(), headerTextX, 105, { width: PAGE_W - headerTextX - MARGIN });
  }

  y = 155;

  /* ── PERFIL ───────────────────────── */
  if (cvData.perfil) {
    y = drawSectionTitle(doc, 'PERFIL PROFESIONAL', y, MARGIN, CONTENT_W, pr, pg, pb, ar, ag, ab);
    doc.fillColor(rgbStr(tr, tg, tb)).font('Helvetica').fontSize(10)
      .text(cvData.perfil, MARGIN, y, { width: CONTENT_W, lineGap: 3 });
    y = doc.y + 15;
  }

  /* ── EXPERIENCIA ──────────────────── */
  if (cvData.experiencia && cvData.experiencia.length) {
    y = checkPage(doc, y, 80);
    y = drawSectionTitle(doc, 'EXPERIENCIA LABORAL', y, MARGIN, CONTENT_W, pr, pg, pb, ar, ag, ab);
    cvData.experiencia.forEach((exp) => {
      y = checkPage(doc, y, 60);
      doc.fillColor(rgbStr(pr, pg, pb)).font('Helvetica-Bold').fontSize(11)
        .text(exp.puesto || 'Puesto', MARGIN, y, { width: CONTENT_W });
      y = doc.y;
      doc.fillColor(rgbStr(ar, ag, ab)).font('Helvetica-Bold').fontSize(9)
        .text(`${exp.empresa || ''}   ${exp.periodo || ''}`, MARGIN, y, { width: CONTENT_W });
      y = doc.y + 2;
      if (exp.descripcion) {
        doc.fillColor(rgbStr(tr, tg, tb)).font('Helvetica').fontSize(9)
          .text(exp.descripcion, MARGIN, y, { width: CONTENT_W, lineGap: 2 });
        y = doc.y;
      }
      y += 10;
    });
  }

  /* ── EDUCACIÓN ────────────────────── */
  if (cvData.educacion && cvData.educacion.length) {
    y = checkPage(doc, y, 60);
    y = drawSectionTitle(doc, 'EDUCACIÓN', y, MARGIN, CONTENT_W, pr, pg, pb, ar, ag, ab);
    cvData.educacion.forEach((edu) => {
      y = checkPage(doc, y, 40);
      doc.fillColor(rgbStr(pr, pg, pb)).font('Helvetica-Bold').fontSize(11)
        .text(edu.titulo || 'Título', MARGIN, y, { width: CONTENT_W });
      y = doc.y;
      doc.fillColor(rgbStr(ar, ag, ab)).font('Helvetica').fontSize(9)
        .text(`${edu.institucion || ''}   ${edu.periodo || ''}`, MARGIN, y, { width: CONTENT_W });
      y = doc.y + 10;
    });
  }

  /* ── HABILIDADES ──────────────────── */
  if (cvData.habilidades && cvData.habilidades.length) {
    y = checkPage(doc, y, 50);
    y = drawSectionTitle(doc, 'HABILIDADES', y, MARGIN, CONTENT_W, pr, pg, pb, ar, ag, ab);
    let skillX = MARGIN;
    cvData.habilidades.forEach((skill) => {
      const w = doc.widthOfString(skill) + 20;
      if (skillX + w > MARGIN + CONTENT_W) {
        skillX = MARGIN;
        y += 26;
        y = checkPage(doc, y, 30);
      }
      doc.roundedRect(skillX, y, w, 20, 4).fill(rgbStr(lr, _lg, lb));
      doc.fillColor(rgbStr(pr, pg, pb)).font('Helvetica').fontSize(9)
        .text(skill, skillX + 10, y + 5, { width: w - 20 });
      skillX += w + 8;
    });
    y += 35;
  }

  /* ── REFERENCIAS ──────────────────── */
  if (cvData.referencias && cvData.referencias.length) {
    y = checkPage(doc, y, 50);
    y = drawSectionTitle(doc, 'REFERENCIAS', y, MARGIN, CONTENT_W, pr, pg, pb, ar, ag, ab);
    cvData.referencias.forEach((ref) => {
      y = checkPage(doc, y, 35);
      doc.fillColor(rgbStr(pr, pg, pb)).font('Helvetica-Bold').fontSize(10)
        .text(ref.nombre || '', MARGIN, y, { width: CONTENT_W });
      y = doc.y;
      const refLine = [ref.relacion, ref.telefono].filter(Boolean).join(' — ');
      if (refLine) {
        doc.fillColor(rgbStr(tr, tg, tb)).font('Helvetica').fontSize(9)
          .text(refLine, MARGIN, y, { width: CONTENT_W });
        y = doc.y;
      }
      y += 8;
    });
  }

  /* ── FOOTER ───────────────────────── */
  doc.fontSize(7).fillColor('#aaaaaa')
    .text('Generado con CV RAPIDO — cvrapido.vercel.app', MARGIN, 800, {
      width: CONTENT_W, align: 'center',
    });

  doc.end();
  return doc;
}

/* ── Helpers ─────────────────────────── */
function rgbStr(r, g, b) {
  return `#${r.toString(16).padStart(2, '0')}${g.toString(16).padStart(2, '0')}${b.toString(16).padStart(2, '0')}`;
}

function drawSectionTitle(doc, title, y, margin, contentW, pr, pg, pb, ar, ag, ab) {
  doc.fillColor(rgbStr(pr, pg, pb)).font('Helvetica-Bold').fontSize(13)
    .text(title, margin, y, { width: contentW });
  y = doc.y + 3;
  doc.moveTo(margin, y).lineTo(margin + 50, y)
    .lineWidth(2).strokeColor(rgbStr(ar, ag, ab)).stroke();
  return y + 10;
}

function checkPage(doc, y, needed) {
  if (y + needed > 780) {
    doc.addPage();
    return 40;
  }
  return y;
}

module.exports = { generatePdf, TEMPLATES };
