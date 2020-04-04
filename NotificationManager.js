const webPush = require('web-push');

class NotificationManager {
    constructor() {
        this.vapidPublicKey = 'BA-pfSa54gV6e1qJ9LUNjv8HBgD9wS7uIyXpipj2J699VIymFneA2o4wyaFuQXCI9CmAskIXBPkoyhckkLnMk04';
        this.vapidPrivateKey = 'cW9UmEltl8loBNZyQfZFlci-rbB6bn6LeFzAvstvG0I';

        this.options = {
            TTL: 60,
            vapidDetails: {
                subject: 'mailto: nathan.hautbois@epitech.eu',
                publicKey: this.vapidPublicKey,
                privateKey: this.vapidPrivateKey
            }
        };
    }

    sendNotification(subscription, custom_link) {
        let payload_details = {
            text: "New  thread found !",
            link: custom_link
        };

        let payload = JSON.stringify(payload_details);

        webPush.sendNotification(
            subscription,
            payload,
            this.options
        );
    }
}

module.exports = new NotificationManager();
