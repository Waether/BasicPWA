self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('video-store').then(function(cache) {
            return cache.addAll([
                '/index.html',
                '/sw.js',
                '/public/icons/icon-32.png',
                '/public/icons/icon-512.png',
                '/public/scripts/index.js',
                '/public/stylesheet/style.css'
            ]);
        })
    );
});

self.addEventListener('fetch', function(e) {
    console.log(e.request.url);
    e.respondWith(
        caches.match(e.request).then(function(response) {
            return response || fetch(e.request);
        })
    );
});
