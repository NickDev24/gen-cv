/* ═══════════════════════════════════════
   CV RAPIDO — Service Worker (Monetag)
   ═══════════════════════════════════════ */

// Monetag (PropellerAds) validation & push notifications
// Replace the URL below with the one provided in your Monetag dashboard

// importScripts('https://.../tag.min.js');

self.addEventListener('push', function(event) {
  // Manejo de notificaciones push
});

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});
