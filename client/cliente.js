'use strict'

const config = require('../config/serverConfig');
const https = require('https');
const fs = require('fs');


var options = {
    protocol: 'http:',
    hostname: 'localhost',
    port: 8080,
    path: '/showfiles/?data=2018-12-05&token=4321',
    method: 'GET',
    key: undefined,
    cert: undefined,
    ca: undefined
  };
  
  if(config.protocol == 'https') {
    options.protocol = 'https:';
    options.key = fs.readFileSync('../tls/client1-key.pem');
    options.cert = fs.readFileSync('../tls/client1-crt.pem');
    options.ca = fs.readFileSync('../tls/ca-crt.pem');
  }

  const req = https.request(options, (res) => {
    console.log('statusCode:', res.statusCode);
    console.log('headers:', res.headers);
  
    res.on('data', (d) => {
      process.stdout.write(d);
    });
  });
  
  req.on('error', (e) => {
    console.error(e);
  });
  req.end();


