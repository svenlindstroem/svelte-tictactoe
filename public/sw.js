var cacheName = "TicTacToe-1";
var filesToCache = [
  "/",
  "/index.html",
  "/global.css",
  "/build/bundle.css",
  "/build/bundle.js",
  "/manifest.json",
  "favicon-32x32.png",
  "favicon-16x16.png",
  "android-chrome-192x192.png"
];

/* Start the service worker and cache all of the app's content */
self.addEventListener("install", function(e) {
  console.log("service worker install");
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline */
self.addEventListener("fetch", function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
