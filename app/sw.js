const cacheName = '';
const precacheResources = [
    '/',
    '/index.html',
    '/style.css',
    '/js/main.js',
    '/images/checkmark.png',
    '/images/notification-flat.png',
    '/images/logo.png',
    '/images/reddit-logo-128.png',
    '/images/reddit-logo-192.png',
    '/images/reddit-logo-256.png',
    '/images/reddit-logo-384.png',
    '/images/reddit-logo-512.png',
    '/images/xmark.png'
];

self.addEventListener('install', event => {
    console.log('Service worker install event!');
    event.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                return cache.addAll(precacheResources);
            })
    );
});

self.addEventListener('activate', event => {
    console.log('Service worker activate event!');
});

self.addEventListener('fetch', event => {
    console.log('Fetch intercepted for:', event.request.url);
    event.respondWith(caches.match(event.request)
        .then(cachedResponse => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request);
        })
    );
});

self.addEventListener('notificationclose', event => {
    const notification = event.notification;
    const primaryKey = notification.data.primaryKey;

    console.log('Closed notification: ' + primaryKey);
});

self.addEventListener('notificationclick', event => {
    const notification = event.notification;

    console.log("went through here");
    clients.openWindow(notification.data.link);
    notification.close();
});

self.addEventListener('push', event => {
    let body;

    if (event.data) {
        body = JSON.parse(event.data.text()).text;
//        body = event.data.text();
    } else {
        body = 'Default body';
    }

    const options = {
        body: body,
        icon: 'images/notification-flat.png',
        vibrate: [100, 50, 100],
        data: {
            link: JSON.parse(event.data.text()).link,
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {action: 'explore', title: 'Go to the site',
                icon: 'images/checkmark.png'},
            {action: 'close', title: 'Close the notification',
                icon: 'images/xmark.png'},
        ]
    };

    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});
