const websiteStaticCache = "donde_esta_mi_bus_V1"

const assets = [
    "/",
    "/index.html",
    "/index.js",
    "/jquery-3.6.3.min.js"
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
      caches.open(staticDevCoffee).then(cache => {
        cache.addAll(assets)
      })
    )
  });

  self.addEventListener("fetch", fetchEvent => {
    fetchEvent.respondWith(
      caches.match(fetchEvent.request).then(res => {
        return res || fetch(fetchEvent.request)
      })
    )
  });

