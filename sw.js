// ファイルを更新したら、この番号と index.html の「バージョン」表示を上げる
const CACHE_NAME = 'svg-converter-v1';

// オフラインで使うファイル（ライブラリもここに含める）
const FILES = [
  './',
  './index.html',
  './imagetracer.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  './apple-touch-icon.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      Promise.all(FILES.map((f) => cache.add(f).catch(() => console.warn('保存失敗:', f))))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (event.request.mode === 'navigate') {
    event.respondWith(caches.match('./index.html').then((c) => c || fetch(event.request)));
    return;
  }
  event.respondWith(
    caches.match(event.request, { ignoreSearch: true }).then((c) => c || fetch(event.request))
  );
});
