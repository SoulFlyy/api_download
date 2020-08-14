'Use strict'

const urlParser = require('../service/parser');
const validator = require('../service/validator');
const logFile = require('./getLogFile');
const files = require('./showFiles');

module.exports = {

    //Função responsável em validar se a rota requisitada, existe.
    handle: (req, res) => {
    
        //Envia url da requisição, para que sejá retornado um JSON com os parâmetros enviado via GET.
        var params = urlParser.getParams(req.url);
        
        var path = req.url.split("?")[0];

        //Valida se o token recebido tem acesso às informações.
        if(!(validator.tokenValidator(params))) {
            res.writeHead(401, {'Content-Type': 'application/json'});
            res.end("{'menssagem': 'Acesso negado'}");
        }
    
        //Padroniza o path para que não tenha barra no final.
        if(path[path.length - 1] === "/") {
            path = path.substr(0, path.length - 1);
        }
    
        //Valida se o path está correto, caso sim, envia os parâmetros para o route equivalente.
        if(path === "/getlogfile") {
            logFile.getLogFile(params, res);
        } else if(path === "/showfiles") {
            files.showFiles(req, res);
        } else {
            res.writeHead(400, {'Content-Type': 'application/json'});
            res.end("{'menssagem': 'Solicitação inválida'}");
        }

    }
    
}

