// Pig App: funciona sin señal. La app se guarda en el celular; los datos van a Google Drive u OneDrive al sincronizar.
const CACHE = 'pigapp-v3';
const APP = ['./', './index.html', './config.js', './manifest.webmanifest', './icon-192.png', './icon-512.png', './maskable-512.png', './icon-180.png'];
// Librerías externas que sí se guardan para usar sin señal
const LIBS = /^(fonts\.googleapis\.com|fonts\.gstatic\.com|cdnjs\.cloudflare\.com|cdn\.jsdelivr\.net)$/;
self.addEventListener('install', e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(APP)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const u = new URL(e.request.url);
  const gsi = u.hostname === 'accounts.google.com' && u.pathname.startsWith('/gsi/client');
  if (u.origin === self.location.origin) {
    // La app: primero la red (para recibir actualizaciones); sin señal, la copia guardada
    e.respondWith(fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(k => k.put(e.request, c)); return r; })
      .catch(() => caches.match(e.request).then(r => r || caches.match('./index.html'))));
    return;
  }
  if (!LIBS.test(u.hostname) && !gsi) return; // Datos de Google y Microsoft: siempre a la red
  e.respondWith(caches.match(e.request).then(hit => {
    const net = fetch(e.request).then(r => { const c = r.clone(); caches.open(CACHE).then(k => k.put(e.request, c)); return r; }).catch(() => hit);
    return hit || net;
  }));
});
