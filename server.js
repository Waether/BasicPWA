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

let Parser = require('rss-parser');
const Moment = require('moment');
var nIntervId;

nIntervId = setInterval(getrss, 6000);


async function getrss() {

    let parser = new Parser();
    let moment = new Moment();

    let feed = await parser.parseURL('https://www.reddit.com/r/memes/new.rss');

    let now = moment.format();

    console.log("\n----- " + now.slice(0, 19) + " ------");

    feed.items.forEach(item => {
        let today = new Date(now.slice(0, 19));
        let post = new Date(item.isoDate.slice(0, 19));
        let diffMs = (today - post);
        let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);

        console.log(diffMins + "  =>  " + item.isoDate.slice(0, 19));
    });
}
