const express = require('express');
const http = require('http');
const util = require('util');
const app = express();
const bodyParser = require('body-parser');

app.use('/', express.static('app/'));

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

app.get('/', (request, response) => {
    response.sendFile(__dirname + "/app/index.html");
});

app.post('/public/addFeed', (request, response) => {
    console.log("Body : " + util.inspect(request.body, false, null, true /* enable colors */));
    response.send("Received")
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
