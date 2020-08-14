'Use strict'

const fs = require('fs');
const config = require('../config/serverConfig');
const parser = require('../service/parser');

module.exports = {
    
    showFiles: (req, res) => {
        fs.readdir(config.routerDir, function(err, files) {
            if(err) {
                res.writeHead(404, {'Content-type':'application/json'});
                res.end("{'menssagem': 'Diretorio não encontrado'}"); 
            } else {
                res.writeHead(200, {'Content-type':'application/json'});
                res.end(parser.getFiles(files));
            }
        });
    }
}