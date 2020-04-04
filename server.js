const express = require('express');
const http = require('http');
const util = require('util');
const app = express();
const bodyParser = require('body-parser');

let UserNotifications = [];

app.use('/', express.static('app/'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.sendFile(__dirname + "/app/index.html");
});

app.post('/public/addFeed', (request, response) => {
    if (request.body.subscription && request.body.feed) {
        for (const elem of UserNotifications) {
            if (elem.subscription.endpoint === request.body.subscription.endpoint) {
                response.send("Received");
                return;
            }
        }
        UserNotifications.push({subscription: request.body.subscription, link: request.body.feed});
    }

    response.send("Received");

    console.log("Listing Users ...");
    UserNotifications.forEach(elem => {
        console.log("Subscription : " + util.inspect(elem.subscription, false, null, true /* enable colors */));
        console.log("Link : " + elem.link);
    });
});

const httpServer = http.createServer(app);

httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
});
//
// let Parser = require('rss-parser');
// let parser = new Parser();
//
// var nIntervId;
//
// nIntervId = setInterval(getrss, 6000);
//
// async function getrss() {
//
//     let feed = await parser.parseURL('https://www.reddit.com/r/all.rss');
//
//     let now = Date();
//     let b = now.toISOString();
//
//     console.log(b);
//
//     console.log(feed.items[feed.items.length -1].pubDate);
//     console.log(feed.items[feed.items.length -1].isoDate);
// }
