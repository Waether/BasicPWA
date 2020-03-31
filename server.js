const express = require("express");
const https = require('https');
const fs = require('fs');
const app = express();

app.use('/', express.static('app/'));

app.get('/', (request, response) => {
    response.sendFile(__dirname + "/app/index.html");
});

https.createServer({
    key: fs.readFileSync('/etc/ssl/private/pwa-selfsigned.key'),
    cert: fs.readFileSync('/etc/ssl/certs/pwa-selfsigned.crt')
}, app)
    .listen(3000);
