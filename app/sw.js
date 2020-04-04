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
