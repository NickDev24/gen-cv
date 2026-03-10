/* ═══════════════════════════════════════
   CV RAPIDO — API Client
   ═══════════════════════════════════════ */

const BASE = '/api';

export async function saveCv(data) {
  const res = await fetch(`${BASE}/cv`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Error al guardar el CV');
  return res.json();
}

export async function getCv(id) {
  const res = await fetch(`${BASE}/cv/${id}`);
  if (!res.ok) throw new Error('CV no encontrado');
  return res.json();
}

export async function downloadPdf(id) {
  const res = await fetch(`${BASE}/cv/${id}/pdf`);
  if (!res.ok) throw new Error('Error al generar el PDF');
  const blob = await res.blob();
  return blob;
}

export async function uploadPhoto(file) {
  const form = new FormData();
  form.append('foto', file);
  const res = await fetch(`${BASE}/upload`, {
    method: 'POST',
    body: form,
  });
  if (!res.ok) throw new Error('Error al subir la foto');
  return res.json();
}
