self.addEventListener('notificationclose', event => {
    const notification = event.notification;
    const primaryKey = notification.data.primaryKey;

    console.log('Closed notification: ' + primaryKey);
});

self.addEventListener('notificationclick', event => {
    const notification = event.notification;
    const primaryKey = notification.data.primaryKey;
    const action = event.action;

    if (action === 'close') {
        notification.close();
    } else {
        // Here open subreddit
        // clients.openWindow('samples/page' + primaryKey + '.html');
        notification.close();
    }
});

self.addEventListener('push', event => {
    let body;

    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Default body';
    }

    const options = {
        body: body,
        icon: 'images/notification-flat.png',
        vibrate: [100, 50, 100],
        data: {
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
