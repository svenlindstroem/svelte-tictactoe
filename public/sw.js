var cacheName = "TicTacToe";
var filesToCache = [
  "/",
  "/index.html"
  /*"/global.css",
  "/css/style.css",
  "/js/main.js"*/
];
alert(1);
/* Start the service worker and cache all of the app's content */
self.addEventListener("install", function(e) {
  console.log("hello");
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