/* ═══════════════════════════════════════
   CV RAPIDO — Preview Renderer (Modular)
   ═══════════════════════════════════════ */

export function renderPreview(container, cvData) {
  const tplId = cvData.plantilla || 'clasico';
  
  let html = `<div class="cv-layout theme-${tplId}">`;

  // Header
  html += `<header class="cv-header-mod">`;
  if (cvData.fotoUrl) {
    html += `<div class="cv-preview-photo"><img src="${cvData.fotoUrl}" alt="Foto" /></div>`;
  }
  html += `<div class="cv-header-content">`;
  html += `<h1>${cvData.nombre} ${cvData.apellido}</h1>`;
  
  const contact = [];
  if (cvData.telefono) contact.push(cvData.telefono);
  if (cvData.email) contact.push(cvData.email);
  if (cvData.ciudad && cvData.provincia) contact.push(`${cvData.ciudad}, ${cvData.provincia}`);
  else if (cvData.ciudad) contact.push(cvData.ciudad);
  
  if (contact.length) {
    html += `<div class="cv-header-contact">${contact.join(' · ')}</div>`;
  }

  const sub = [];
  if (cvData.dni) sub.push(`DNI: ${cvData.dni}`);
  if (cvData.fechaNacimiento) sub.push(`Nac: ${cvData.fechaNacimiento}`);
  if (sub.length) {
    html += `<div class="cv-header-contact" style="opacity:0.7; margin-top:5px;">${sub.join(' · ')}</div>`;
  }

  if (cvData.categoria) {
    html += `<div class="cv-preview-category" style="color:var(--tpl-accent); border:none; margin-top:10px;">${cvData.categoria.toUpperCase()}</div>`;
  }
  html += `</div></header>`;

  // Body
  html += `<div class="cv-body-mod">`;

  // Perfil
  if (cvData.perfil) {
    html += `
      <section class="cv-section-mod">
        <h2 class="cv-section-title-mod">Perfil Profesional</h2>
        <p class="cv-entry-description">${cvData.perfil}</p>
      </section>
    `;
  }

  // Experiencia
  if (cvData.experiencia && cvData.experiencia.length) {
    html += `<section class="cv-section-mod"><h2 class="cv-section-title-mod">Experiencia Laboral</h2>`;
    cvData.experiencia.forEach((exp) => {
      html += `
        <div class="cv-entry-mod">
          <div class="cv-entry-header">
            <span class="cv-entry-title">${exp.puesto || 'Puesto'}</span>
            <span class="cv-entry-date">${exp.periodo || ''}</span>
          </div>
          <div class="cv-entry-subtitle">${exp.empresa || ''}</div>
          ${exp.descripcion ? `<p class="cv-entry-description">${exp.descripcion}</p>` : ''}
        </div>
      `;
    });
    html += `</section>`;
  }

  // Educación
  if (cvData.educacion && cvData.educacion.length) {
    html += `<section class="cv-section-mod"><h2 class="cv-section-title-mod">Educación</h2>`;
    cvData.educacion.forEach((edu) => {
      html += `
        <div class="cv-entry-mod">
          <div class="cv-entry-header">
            <span class="cv-entry-title">${edu.titulo || 'Estudio'}</span>
            <span class="cv-entry-date">${edu.periodo || ''}</span>
          </div>
          <div class="cv-entry-subtitle">${edu.institucion || ''}</div>
        </div>
      `;
    });
    html += `</section>`;
  }

  // Habilidades
  if (cvData.habilidades && cvData.habilidades.length) {
    html += `<section class="cv-section-mod"><h2 class="cv-section-title-mod">Habilidades</h2>`;
    html += `<div class="cv-skills-mod">`;
    cvData.habilidades.forEach((s) => {
      html += `<span class="cv-skill-badge">${s}</span>`;
    });
    html += `</div></section>`;
  }

  // Referencias
  if (cvData.referencias && cvData.referencias.length) {
    html += `<section class="cv-section-mod"><h2 class="cv-section-title-mod">Referencias</h2>`;
    cvData.referencias.forEach((ref) => {
      html += `
        <div class="cv-entry-mod">
          <div class="cv-entry-title">${ref.nombre}</div>
          <div class="cv-entry-description">${[ref.relacion, ref.telefono].filter(Boolean).join(' · ')}</div>
        </div>
      `;
    });
    html += `</section>`;
  }

  html += `</div></div>`;
  container.innerHTML = html;
}
