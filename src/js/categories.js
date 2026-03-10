/* ═══════════════════════════════════════
   CV RAPIDO — Categories Data
   ═══════════════════════════════════════ */

export const CATEGORIES = [
  {
    id: 'mineria',
    name: 'Minería',
    icon: '⛏️',
    desc: 'Operarios, técnicos y profesionales del sector minero',
  },
  {
    id: 'atencion-publico',
    name: 'Atención al Público',
    icon: '🤝',
    desc: 'Recepcionistas, cajeros y atención al cliente',
  },
  {
    id: 'administracion',
    name: 'Administración de Empresas',
    icon: '📊',
    desc: 'Administrativos, contadores y gestión empresarial',
  },
  {
    id: 'construccion',
    name: 'Construcción',
    icon: '🏗️',
    desc: 'Albañiles, electricistas y obra civil',
  },
  {
    id: 'gastronomia',
    name: 'Gastronomía',
    icon: '🍳',
    desc: 'Cocineros, mozos y servicios gastronómicos',
  },
  {
    id: 'comercio-ventas',
    name: 'Comercio y Ventas',
    icon: '🛒',
    desc: 'Vendedores, repositores y comercio minorista',
  },
  {
    id: 'seguridad',
    name: 'Seguridad Privada',
    icon: '🛡️',
    desc: 'Vigiladores, custodios y seguridad patrimonial',
  },
  {
    id: 'transporte',
    name: 'Transporte y Logística',
    icon: '🚛',
    desc: 'Choferes, operadores logísticos y distribución',
  },
  {
    id: 'turismo',
    name: 'Turismo y Hotelería',
    icon: '🏨',
    desc: 'Guías turísticos, hotelería y servicios de viaje',
  },
  {
    id: 'tecnologia',
    name: 'Tecnología / Informática',
    icon: '💻',
    desc: 'Programadores, soporte técnico y sistemas',
  },
];

export function renderCategories(container, onSelect) {
  container.innerHTML = '';
  CATEGORIES.forEach((cat) => {
    const card = document.createElement('div');
    card.className = 'category-card';
    card.dataset.id = cat.id;
    card.innerHTML = `
      <span class="category-icon">${cat.icon}</span>
      <div class="category-name">${cat.name}</div>
      <div class="category-desc">${cat.desc}</div>
    `;
    card.addEventListener('click', () => {
      container.querySelectorAll('.category-card').forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      onSelect(cat);
    });
    container.appendChild(card);
  });
}
