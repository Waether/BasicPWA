const express = require("express");
const https = require('https');
const fs = require('fs');
const app = express();

app.use('/', express.static('app/'));

app.get('/', (request, response) => {
    response.sendFile(__dirname + "/app/index.html");
});

https.createServer({
    key: fs.readFileSync('server.key'),
    cert: fs.readFileSync('server.cert')
}, app)
    .on('error', function(err) {
        console.error(err)
    })
    .listen(3000, function () {
        console.log('Example app listening on port 3000! Go to https://localhost:3000/')
    });
