var CACHE_NAME = 'basic-pwa-app';
var urlsToCache = [
    '/',
    '/index.html',
    '/sw.js',
    '/public/icons/icon-32.png',
    '/public/icons/icon-512.png',
    '/public/scripts/index.js',
    '/public/stylesheet/style.css'
];

self.addEventListener('install', function(event) {
    // Perform install steps
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(function(cache) {
                console.log('Opened cache');
                return cache.addAll(urlsToCache);
            })
    );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
        caches.match(event.request)
            .then(function(response) {
                    if (response) {
                        return response;
                    }
                    return fetch(event.request);
                }
            )
    );
});
