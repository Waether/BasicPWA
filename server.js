const express = require("express");
const http = require('http');
const fs = require('fs');
const app = express();

app.use('/', express.static('app/'));

app.get('/', (request, response) => {
    response.sendFile(__dirname + "/app/index.html");
});

const httpServer = http.createServer(app);

httpServer.listen(80, () => {
    console.log('HTTP Server running on port 80');
});
