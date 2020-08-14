'Use strict'

const fs = require('fs');
const config = require('../config/serverConfig');
const validator = require('../service/validator');

module.exports = {
    
    //Função para efetuar o download do log.
    getLogFile: (params, res) => {

        //Valida a existencia do parâmetro "data" dentro do JSON.
        if(validator.hasParameter(params, "data")) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end("{'menssagem': 'Página não encontrada'}");    
        } 

        //Valida se a data foi enviada corretamente.
        if(!(validator.dataValidator(params.data))) {
            res.writeHead(404, {'Content-Type': 'application/json'});
            res.end("{'menssagem': 'Data inválida'}");
        } 
        
        //Confirma a existencia do arquivo e efetua o download 
        fs.readFile(config.routerDir + params.data + config.fileType, function(err, data) {
            if(err) {
                res.writeHead(404, {'Content-type':'application/json'})
                res.end("{'menssagem': 'Arquivo inexistente'}"); 
            } else {
                res.setHeader('Content-disposition', 'attachment; filename=' + params.data + config.fileType);
                res.end(data);
            }
        });                     
    }

}