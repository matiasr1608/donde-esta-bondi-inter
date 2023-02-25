const websiteStaticCache = "donde_esta_mi_bus_V0.0.5.8"

const assets = [
  "/",
  "/index.html",
  "/js/index.js",
  "/js/jquery-3.6.3.min.js"
]

self.addEventListener("install", installEvent => {
  self.skipWaiting() // dont wait and activate after installing 
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
  console.log("golaa")
};

self.addEventListener("activate", (event) => {
  event.waitUntil(deleteOldCaches());
});

