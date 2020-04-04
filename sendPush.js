const NotificationManager = require('./NotificationManager');

const pushSubscription =  {
    endpoint: 'https://updates.push.services.mozilla.com/wpush/v2/gAAAAABeiFZCK3o7VmmXTe70vTi5MJf4xOpaCbWH2sd6qPUUgYVTTUis6OpA4gDkRaY6l4eav3bjEkp9aqW5Ddcvnnlb86sTbxZ62sxAaShEIhQNqNXR7rA9-hrZ7Es0M7yIQGu_2EHP45HD497wBpSQW92vFKhh1a59iNWtJhwA1qAMWOJlCIs',
    keys: {
        auth: 'bBW9J4Wlk4R2JB9QP6x82A',
        p256dh: 'BDluDdZA_o-JdoQ_aDNYgy5XOC5uelkarUdn6SOeZ75Ye7xwKZAUClf6Ati-lkpDnL6VM8Ci1xaKUnd3HyJ77Zw'
    }
};

NotificationManager.sendNotification(pushSubscription, 'https://reddit.com/r/pol');
