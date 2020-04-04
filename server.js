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
