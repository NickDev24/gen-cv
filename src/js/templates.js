/* ═══════════════════════════════════════
   CV RAPIDO — Template Definitions
   ═══════════════════════════════════════ */

export const TEMPLATES = [
  {
    id: 'clasico',
    name: 'Clásico',
    primary: '#1a1a2e',
    accent: '#0f3460',
    headerBg: '#1a1a2e',
    headerText: '#ffffff',
    desc: 'Elegante y tradicional',
  },
  {
    id: 'moderno',
    name: 'Moderno',
    primary: '#2d3436',
    accent: '#00b894',
    headerBg: '#2d3436',
    headerText: '#ffffff',
    desc: 'Fresco y actual',
  },
  {
    id: 'ejecutivo',
    name: 'Ejecutivo',
    primary: '#0c2461',
    accent: '#4a69bd',
    headerBg: '#0c2461',
    headerText: '#ffffff',
    desc: 'Serio y corporativo',
  },
  {
    id: 'elegante',
    name: 'Elegante',
    primary: '#2c2c54',
    accent: '#706fd3',
    headerBg: '#2c2c54',
    headerText: '#f7f1e3',
    desc: 'Sofisticado y refinado',
  },
  {
    id: 'profesional',
    name: 'Profesional',
    primary: '#2f3542',
    accent: '#3742fa',
    headerBg: '#2f3542',
    headerText: '#ffffff',
    desc: 'Versátil y prolijo',
  },
  {
    id: 'minimalista',
    name: 'Minimalista',
    primary: '#333333',
    accent: '#e74c3c',
    headerBg: '#ffffff',
    headerText: '#333333',
    desc: 'Simple y limpio',
  },
  {
    id: 'corporativo',
    name: 'Corporativo',
    primary: '#003366',
    accent: '#ff6600',
    headerBg: '#003366',
    headerText: '#ffffff',
    desc: 'Ideal para empresas',
  },
  {
    id: 'creativo',
    name: 'Creativo',
    primary: '#6c5ce7',
    accent: '#fd79a8',
    headerBg: '#6c5ce7',
    headerText: '#ffffff',
    desc: 'Original y moderno',
  },
  {
    id: 'sobrio',
    name: 'Sobrio',
    primary: '#34495e',
    accent: '#27ae60',
    headerBg: '#34495e',
    headerText: '#ecf0f1',
    desc: 'Formal y conservador',
  },
  {
    id: 'industrial',
    name: 'Industrial',
    primary: '#2d2d2d',
    accent: '#f39c12',
    headerBg: '#2d2d2d',
    headerText: '#f39c12',
    desc: 'Fuerte y directo',
  },
];

export function renderTemplates(container, onSelect) {
  container.innerHTML = '';
  TEMPLATES.forEach((tpl) => {
    const card = document.createElement('div');
    card.className = 'template-card';
    card.dataset.id = tpl.id;
    card.innerHTML = `
      <div class="template-card-header" style="background:${tpl.headerBg}; color:${tpl.headerText};">
        ${tpl.name}
      </div>
      <div class="template-card-body">
        <div class="template-card-name">${tpl.name}</div>
        <div class="template-card-preview">
          <div class="line long" style="background:${tpl.primary}; opacity:0.2"></div>
          <div class="line medium" style="background:${tpl.primary}; opacity:0.15"></div>
          <div class="line short accent" style="background:${tpl.accent}"></div>
          <div class="line long" style="background:${tpl.primary}; opacity:0.1"></div>
          <div class="line medium" style="background:${tpl.primary}; opacity:0.1"></div>
        </div>
        <span class="template-card-badge">${tpl.desc}</span>
      </div>
    `;
    card.addEventListener('click', () => {
      container.querySelectorAll('.template-card').forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      onSelect(tpl);
    });
    container.appendChild(card);
  });
}
