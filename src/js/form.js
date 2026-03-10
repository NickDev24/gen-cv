/* ═══════════════════════════════════════
   CV RAPIDO — Form Builder
   ═══════════════════════════════════════ */

import { uploadPhoto } from './api.js';

let photoUrl = '';
let experienceCount = 0;
let educationCount = 0;
let referenceCount = 0;
let skills = [];

export function renderForm(container) {
  photoUrl = '';
  experienceCount = 0;
  educationCount = 0;
  referenceCount = 0;
  skills = [];

  container.innerHTML = `
    <!-- Datos Personales -->
    <div class="form-section">
      <div class="form-section-title">👤 Datos Personales</div>
      <div class="form-row">
        <div class="form-group">
          <label for="nombre">Nombre *</label>
          <input type="text" id="nombre" name="nombre" required placeholder="Ej: Juan" />
        </div>
        <div class="form-group">
          <label for="apellido">Apellido *</label>
          <input type="text" id="apellido" name="apellido" required placeholder="Ej: Pérez" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="dni">DNI</label>
          <input type="text" id="dni" name="dni" placeholder="Ej: 35.123.456" />
        </div>
        <div class="form-group">
          <label for="fechaNacimiento">Fecha de Nacimiento</label>
          <input type="date" id="fechaNacimiento" name="fechaNacimiento" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="telefono">Teléfono</label>
          <input type="tel" id="telefono" name="telefono" placeholder="Ej: 388-4123456" />
        </div>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Ej: juan@email.com" />
        </div>
      </div>
      <div class="form-row">
        <div class="form-group">
          <label for="direccion">Dirección</label>
          <input type="text" id="direccion" name="direccion" placeholder="Ej: Av. San Martín 1234" />
        </div>
        <div class="form-group">
          <label for="ciudad">Ciudad</label>
          <input type="text" id="ciudad" name="ciudad" placeholder="Ej: San Salvador de Jujuy" />
        </div>
      </div>
      <div class="form-row full">
        <div class="form-group">
          <label for="provincia">Provincia</label>
          <select id="provincia" name="provincia">
            <option value="">Seleccioná tu provincia</option>
            <option>Buenos Aires</option>
            <option>Catamarca</option>
            <option>Chaco</option>
            <option>Chubut</option>
            <option>Córdoba</option>
            <option>Corrientes</option>
            <option>Entre Ríos</option>
            <option>Formosa</option>
            <option>Jujuy</option>
            <option>La Pampa</option>
            <option>La Rioja</option>
            <option>Mendoza</option>
            <option>Misiones</option>
            <option>Neuquén</option>
            <option>Río Negro</option>
            <option>Salta</option>
            <option>San Juan</option>
            <option>San Luis</option>
            <option>Santa Cruz</option>
            <option>Santa Fe</option>
            <option>Santiago del Estero</option>
            <option>Tierra del Fuego</option>
            <option>Tucumán</option>
            <option>CABA</option>
          </select>
        </div>
      </div>
    </div>

    <!-- Foto -->
    <div class="form-section">
      <div class="form-section-title">📷 Foto de Perfil (Opcional)</div>
      <div class="photo-upload-area" id="photo-area">
        <div class="photo-preview" id="photo-preview">👤</div>
        <div class="photo-upload-text">
          <strong>Hacé clic para subir tu foto</strong>
          JPG, PNG o WebP — Máximo 5 MB
        </div>
        <input type="file" id="photo-input" accept="image/jpeg,image/png,image/webp" style="display:none" />
      </div>
    </div>

    <!-- Perfil -->
    <div class="form-section">
      <div class="form-section-title">📝 Perfil Profesional</div>
      <div class="form-row full">
        <div class="form-group">
          <label for="perfil">Describí brevemente tu perfil</label>
          <textarea id="perfil" name="perfil" rows="3" placeholder="Ej: Profesional con 5 años de experiencia en el rubro..."></textarea>
        </div>
      </div>
    </div>

    <!-- Experiencia -->
    <div class="form-section">
      <div class="form-section-title">💼 Experiencia Laboral</div>
      <div id="experience-entries"></div>
      <button type="button" class="btn-add-entry" id="add-experience">+ Agregar Experiencia</button>
    </div>

    <!-- Educación -->
    <div class="form-section">
      <div class="form-section-title">🎓 Educación</div>
      <div id="education-entries"></div>
      <button type="button" class="btn-add-entry" id="add-education">+ Agregar Educación</button>
    </div>

    <!-- Habilidades -->
    <div class="form-section">
      <div class="form-section-title">⚡ Habilidades</div>
      <div class="skills-container" id="skills-container"></div>
      <div class="skill-input-row">
        <input type="text" id="skill-input" placeholder="Ej: Manejo de maquinaria pesada" />
        <button type="button" id="add-skill">Agregar</button>
      </div>
    </div>

    <!-- Referencias -->
    <div class="form-section">
      <div class="form-section-title">📞 Referencias</div>
      <div id="reference-entries"></div>
      <button type="button" class="btn-add-entry" id="add-reference">+ Agregar Referencia</button>
    </div>
  `;

  // Add first entries
  addExperience();
  addEducation();

  // Event listeners
  document.getElementById('photo-area').addEventListener('click', () => {
    document.getElementById('photo-input').click();
  });

  document.getElementById('photo-input').addEventListener('change', handlePhotoUpload);
  document.getElementById('add-experience').addEventListener('click', addExperience);
  document.getElementById('add-education').addEventListener('click', addEducation);
  document.getElementById('add-reference').addEventListener('click', addReference);
  document.getElementById('add-skill').addEventListener('click', addSkill);

  document.getElementById('skill-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') { e.preventDefault(); addSkill(); }
  });
}

async function handlePhotoUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  const preview = document.getElementById('photo-preview');
  // Show local preview immediately
  const reader = new FileReader();
  reader.onload = (ev) => {
    preview.innerHTML = `<img src="${ev.target.result}" alt="Foto de perfil" />`;
  };
  reader.readAsDataURL(file);

  // Upload to Cloudinary
  try {
    const result = await uploadPhoto(file);
    photoUrl = result.url;
  } catch (err) {
    console.error('Error uploading photo:', err);
    // Keep the local preview even if upload fails
  }
}

function addExperience() {
  const id = experienceCount++;
  const container = document.getElementById('experience-entries');
  const div = document.createElement('div');
  div.className = 'entry-group';
  div.id = `exp-${id}`;
  div.innerHTML = `
    <button type="button" class="btn-remove" onclick="this.parentElement.remove()">×</button>
    <div class="form-row">
      <div class="form-group">
        <label>Puesto</label>
        <input type="text" name="exp-puesto-${id}" placeholder="Ej: Operador de maquinaria" />
      </div>
      <div class="form-group">
        <label>Empresa</label>
        <input type="text" name="exp-empresa-${id}" placeholder="Ej: Minera del Norte SA" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Período</label>
        <input type="text" name="exp-periodo-${id}" placeholder="Ej: 2020 - 2023" />
      </div>
    </div>
    <div class="form-row full">
      <div class="form-group">
        <label>Descripción</label>
        <textarea name="exp-desc-${id}" rows="2" placeholder="Tareas y responsabilidades..."></textarea>
      </div>
    </div>
  `;
  container.appendChild(div);
}

function addEducation() {
  const id = educationCount++;
  const container = document.getElementById('education-entries');
  const div = document.createElement('div');
  div.className = 'entry-group';
  div.id = `edu-${id}`;
  div.innerHTML = `
    <button type="button" class="btn-remove" onclick="this.parentElement.remove()">×</button>
    <div class="form-row">
      <div class="form-group">
        <label>Título / Estudio</label>
        <input type="text" name="edu-titulo-${id}" placeholder="Ej: Técnico en Minería" />
      </div>
      <div class="form-group">
        <label>Institución</label>
        <input type="text" name="edu-institucion-${id}" placeholder="Ej: UNJU" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Período</label>
        <input type="text" name="edu-periodo-${id}" placeholder="Ej: 2016 - 2020" />
      </div>
    </div>
  `;
  container.appendChild(div);
}

function addReference() {
  const id = referenceCount++;
  const container = document.getElementById('reference-entries');
  const div = document.createElement('div');
  div.className = 'entry-group';
  div.id = `ref-${id}`;
  div.innerHTML = `
    <button type="button" class="btn-remove" onclick="this.parentElement.remove()">×</button>
    <div class="form-row">
      <div class="form-group">
        <label>Nombre</label>
        <input type="text" name="ref-nombre-${id}" placeholder="Ej: Carlos García" />
      </div>
      <div class="form-group">
        <label>Relación</label>
        <input type="text" name="ref-relacion-${id}" placeholder="Ej: Supervisor directo" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>Teléfono</label>
        <input type="tel" name="ref-telefono-${id}" placeholder="Ej: 388-4567890" />
      </div>
    </div>
  `;
  container.appendChild(div);
}

function addSkill() {
  const input = document.getElementById('skill-input');
  const value = input.value.trim();
  if (!value || skills.includes(value)) { input.value = ''; return; }

  skills.push(value);
  renderSkills();
  input.value = '';
  input.focus();
}

function renderSkills() {
  const container = document.getElementById('skills-container');
  container.innerHTML = skills.map((s, i) => `
    <span class="skill-tag">
      ${s}
      <button type="button" data-index="${i}" class="remove-skill">×</button>
    </span>
  `).join('');

  container.querySelectorAll('.remove-skill').forEach((btn) => {
    btn.addEventListener('click', () => {
      skills.splice(parseInt(btn.dataset.index), 1);
      renderSkills();
    });
  });
}

export function validateForm() {
  const nombre = document.getElementById('nombre');
  const apellido = document.getElementById('apellido');
  let valid = true;

  [nombre, apellido].forEach((el) => {
    el.classList.remove('error');
    if (!el.value.trim()) {
      el.classList.add('error');
      valid = false;
    }
  });

  if (!valid) {
    nombre.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  return valid;
}

export function collectFormData(category) {
  const get = (id) => {
    const el = document.getElementById(id);
    return el ? el.value.trim() : '';
  };

  // Collect experience entries
  const experiencia = [];
  document.querySelectorAll('#experience-entries .entry-group').forEach((group) => {
    const inputs = group.querySelectorAll('input, textarea');
    const exp = {
      puesto: inputs[0]?.value.trim() || '',
      empresa: inputs[1]?.value.trim() || '',
      periodo: inputs[2]?.value.trim() || '',
      descripcion: inputs[3]?.value.trim() || '',
    };
    if (exp.puesto || exp.empresa) experiencia.push(exp);
  });

  // Collect education entries
  const educacion = [];
  document.querySelectorAll('#education-entries .entry-group').forEach((group) => {
    const inputs = group.querySelectorAll('input');
    const edu = {
      titulo: inputs[0]?.value.trim() || '',
      institucion: inputs[1]?.value.trim() || '',
      periodo: inputs[2]?.value.trim() || '',
    };
    if (edu.titulo || edu.institucion) educacion.push(edu);
  });

  // Collect reference entries
  const referencias = [];
  document.querySelectorAll('#reference-entries .entry-group').forEach((group) => {
    const inputs = group.querySelectorAll('input');
    const ref = {
      nombre: inputs[0]?.value.trim() || '',
      relacion: inputs[1]?.value.trim() || '',
      telefono: inputs[2]?.value.trim() || '',
    };
    if (ref.nombre) referencias.push(ref);
  });

  return {
    nombre: get('nombre'),
    apellido: get('apellido'),
    dni: get('dni'),
    fechaNacimiento: get('fechaNacimiento'),
    telefono: get('telefono'),
    email: get('email'),
    direccion: get('direccion'),
    ciudad: get('ciudad'),
    provincia: get('provincia'),
    fotoUrl: photoUrl,
    perfil: get('perfil'),
    categoria: category,
    experiencia,
    educacion,
    habilidades: [...skills],
    referencias,
  };
}
