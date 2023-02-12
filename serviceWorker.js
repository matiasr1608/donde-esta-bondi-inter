const websiteStaticCache = "donde_esta_mi_bus_V0.0.5"

const assets = [
    "/",
    "/index.html",
    "/js/index.js",
    "/js/jquery-3.6.3.min.js"
]

self.addEventListener("install", installEvent => {
    installEvent.waitUntil(
      caches.open(websiteStaticCache).then(cache => {
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

