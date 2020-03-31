self.addEventListener('install', function(e) {
    e.waitUntil(
        caches.open('video-store').then(function(cache) {
            return cache.addAll([
                '/basicpwa/',
                '/basicpwa/index.html',
                '/basicpwa/sw.js',
                '/basicpwa/public/icons/',
                '/basicpwa/public/icons/icon-32.png',
                '/basicpwa/public/icons/icon-512.png',
                '/basicpwa/public/scripts/',
                '/basicpwa/public/scripts/index.js',
                '/basicpwa/public/stylesheet/',
                '/basicpwa/public/stylesheet/style.css'
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
