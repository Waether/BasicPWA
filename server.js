const express = require("express");
const https = require('https');
const fs = require('fs');
const app = express();

// app.use('/', express.static('app/'));
//
// app.get('/', (request, response) => {
//     response.sendFile(__dirname + "/app/index.html");
// });
//
// const listener = app.listen(process.env.PORT, () => {
//     console.log("Your app is listening on port " + listener.address().port);
// });

app.get('/', function (req, res) {
    res.send('hello world')
});

https.createServer({
    key: fs.readFileSync('/etc/ssl/private/pwa-selfsigned.key'),
    cert: fs.readFileSync('/etc/ssl/certs/pwa-selfsigned.crt')
}, app)
    .on('error', function(err) {
        console.error(err)
    })
    .listen(3000, function () {
        console.log('Example app listening on port 3000! Go to https://localhost:3000/')
    });
