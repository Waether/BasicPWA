const webPush = require('web-push');

const pushSubscription = {"endpoint":"https://updates.push.services.mozilla.com/wpush/v2/gAAAAABeh2G1h56QHEJRZ_Rfumb463SRXqxsAgl5GO-CEg5nIYj8_EE8hqqgSAsTUvHSUVf7F7umgCCjbD7G_r4ddhjN4wZDxiaaUBbQdE__nL-WCFpkc9uloARinpzD_NdPonF2KgBBR6ceDLR8MJiEaGRuzAYTwqkenWSawK4rnjFGMEVkstc","keys":{"auth":"rPvppUQvFvLI6aSv3ASfrw","p256dh":"BAcOr3hU5RaEe7kStLrYg6g72SM0TRRwv40eKnXIZEYqyxFNodLM3hXQgPYdt2frSU6w0oGgPpJUBH8XmgVP8vA"}};

const vapidPublicKey = 'BA-pfSa54gV6e1qJ9LUNjv8HBgD9wS7uIyXpipj2J699VIymFneA2o4wyaFuQXCI9CmAskIXBPkoyhckkLnMk04';
const vapidPrivateKey = 'cW9UmEltl8loBNZyQfZFlci-rbB6bn6LeFzAvstvG0I';

const payload = 'Here is a payload!';

const options = {
    TTL: 60,
    vapidDetails: {
        subject: 'mailto: YOUR_EMAIL_ADDRESS',
        publicKey: vapidPublicKey,
        privateKey: vapidPrivateKey
    }
};

webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
