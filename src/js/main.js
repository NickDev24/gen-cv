/* ═══════════════════════════════════════
   CV RAPIDO — Main Controller
   ═══════════════════════════════════════ */

import { renderCategories } from './categories.js';
import { renderForm, validateForm, collectFormData } from './form.js';
import { renderTemplates } from './templates.js';
import { renderPreview } from './preview.js';
import { saveCv, downloadPdf } from './api.js';

// State
let currentStep = 0;
let selectedCategory = null;
let selectedTemplate = null;
let cvId = null;
let formData = null;

// DOM Elements
const steps = document.querySelectorAll('.step');
const dots = document.querySelectorAll('.step-dot');
const overlay = document.getElementById('loading-overlay');

function init() {
  // Check if we started on a category page (SSR redirect or direct link)
  const path = window.location.pathname;
  if (path.startsWith('/categoria/')) {
    const catId = path.split('/').pop();
    // Pre-select category if we could find it
    // For now just show landing
  }

  // Step 0: Render Categories
  const categoriesGrid = document.getElementById('categories-grid');
  renderCategories(categoriesGrid, (cat) => {
    selectedCategory = cat;
    goToStep(1);
    renderForm(document.getElementById('cv-form'));
  });

  // Step 1: Form Navigation
  document.getElementById('btn-back-1').addEventListener('click', () => goToStep(0));
  document.getElementById('btn-next-1').addEventListener('click', () => {
    if (validateForm()) {
      formData = collectFormData(selectedCategory.name);
      goToStep(2);
      renderTemplates(document.getElementById('templates-grid'), (tpl) => {
        selectedTemplate = tpl;
      });
    }
  });

  // Step 2: Template Navigation
  document.getElementById('btn-back-2').addEventListener('click', () => goToStep(1));
  document.getElementById('btn-next-2').addEventListener('click', () => {
    if (!selectedTemplate) {
      alert('Por favor elegí una plantilla');
      return;
    }
    formData.plantilla = selectedTemplate.id;
    goToStep(3);
    renderPreview(document.getElementById('cv-preview'), formData);
  });

  // Step 3: Preview Navigation
  document.getElementById('btn-back-3').addEventListener('click', () => goToStep(2));
  document.getElementById('btn-download').addEventListener('click', handleDownload);

  // Step 4: Final Actions
  document.getElementById('btn-download-again').addEventListener('click', () => {
    if (cvId) performDownload(cvId, formData.nombre, formData.apellido);
  });
  document.getElementById('btn-new-cv').addEventListener('click', () => location.reload());
}

async function handleDownload() {
  showLoading(true);
  try {
    // Save to server first
    const result = await saveCv(formData);
    cvId = result.id;

    // Download PDF
    await performDownload(cvId, formData.nombre, formData.apellido);
    
    goToStep(4);
  } catch (err) {
    alert('Error al generar el CV. Intentalo de nuevo.');
    console.error(err);
  } finally {
    showLoading(false);
  }
}

async function performDownload(id, nombre, apellido) {
  const blob = await downloadPdf(id);
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `CV_${nombre}_${apellido}.pdf`;
  document.body.appendChild(a);
  a.click();
  window.URL.revokeObjectURL(url);
  a.remove();
}

function goToStep(index) {
  steps.forEach((s) => s.classList.remove('active'));
  dots.forEach((d) => {
    d.classList.remove('active', 'completed');
    const stepIdx = parseInt(d.dataset.step);
    if (stepIdx === index) d.classList.add('active');
    if (stepIdx < index) d.classList.add('completed');
  });

  steps[index].classList.add('active');
  currentStep = index;
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showLoading(show) {
  overlay.classList.toggle('hidden', !show);
}

// Start App
document.addEventListener('DOMContentLoaded', init);
