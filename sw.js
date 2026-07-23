const CACHE_NAME = "gaschsoft-shell-v1";
const APP_SHELL = [
  "/", "/index.html", "/site.webmanifest",
  "/newgaschsoft/assets/gaschsoft.css", "/newgaschsoft/assets/gaschsoft.js",
  "/newgaschsoft/Logos/Ico%20GaschSoft.png",
  "/newgaschsoft/Logos/Ico%20GaschSoft%20-%20dark.png",
  "/newgaschsoft/android-chrome-192x192.png",
  "/newgaschsoft/android-chrome-512x512.png"
];
self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL)));
  self.skipWaiting();
});
self.addEventListener("activate", (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))));
  self.clients.claim();
});
self.addEventListener("fetch", (event) => {
  const requestUrl = new URL(event.request.url);
  if (requestUrl.origin !== self.location.origin || !APP_SHELL.includes(requestUrl.pathname)) return;
  event.respondWith(fetch(event.request).then((response) => {
    const copy = response.clone();
    caches.open(CACHE_NAME).then((cache) => cache.put(event.request, copy));
    return response;
  }).catch(() => caches.match(event.request)));
});