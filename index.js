'use strict'

const config = require('./config/serverConfig');
const https = config.protocol == 'https' ? require('https') : require('http');
const fs = require ('fs');
const router = require('./routes/router');

var options = {};

if(config.protocol == 'https') {
    options = {
        key: fs.readFileSync('./tls/server-key.pem'),
        cert: fs.readFileSync('./tls/server-crt.pem'),
        ca: fs.readFileSync('./tls/ca-crt.pem')
        // requestCert: true,
        // rejectUnauthorized: true
    };
}


var server = https.createServer(options, (req, res) => {

    //Eavia os parâmetros para que a rota sejá validada.
    router.handle(req, res);
    
});

server.listen(config.port);


