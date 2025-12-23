self.addEventListener("install", event => {
  event.waitUntil(
    caches.open("roy-cache").then(cache => {
      return cache.addAll([
        "/roy/",
        "/roy/index.html",
        "/roy/michael.css",
        "/roy/michael.js"
      ]);
    })
  );
});
