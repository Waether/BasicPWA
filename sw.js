self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('video-store').then(function(cache) {
            return cache.addAll([
                '/basicpwa/',
                '/basicpwa/server.js',
                '/basicpwa/views/index.html',
                '/basicpwa/public/style.css',
                '/basicpwa/public/script.js',
                '/basicpwa/public/icons/icon-32.png',
                '/basicpwa/public/icons/icon-512.png'
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
