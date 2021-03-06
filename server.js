/**
 * Simple HTTPS Server
 * Created by Alexey S. Kiselev on June 2017.
 */

// Modules
var https = require('https'),
    http = require('http'),
    fs = require('fs'),
    path = require('path');

// HTTPS Server options
/*var serverOptions = {
    key: fs.readFileSync(path.join(__dirname,'certificates','privatekey.pem')),
    cert: fs.readFileSync(path.join(__dirname,'certificates','certificate.pem'))
};*/

// Create Server
//var server = https.createServer(serverOptions);

// Create App
var app = require('./main');

// Listening on port 443
/*server.on('request',app);
server.listen(443, function () {
    console.log('Starting server on https://localhost:443');
});*/

// Insecure
var insecureServer = http.createServer(),
    envPort = process.env.PORT || 3000;
insecureServer.on('request',app);
insecureServer.listen(envPort, function () {
    console.log('Starting server on http://localhost:'+envPort);
});

