const websiteStaticCache = "donde_esta_mi_bus_V0.0.5.1"

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

const deleteCache = async (key) => {
  await caches.delete(key);
};

const deleteOldCaches = async () => {
  const cacheKeepList = [websiteStaticCache];
  const keyList = await caches.keys();
  const cachesToDelete = keyList.filter((key) => !cacheKeepList.includes(key));
  await Promise.all(cachesToDelete.map(deleteCache));
};

self.addEventListener("activate", (event) => {
  event.waitUntil(deleteOldCaches());
});

