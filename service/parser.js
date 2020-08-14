'Use strict'

function Parser(){}

//Função que destrinxa os parêmetros GET da url, e retorda um JSON osganizado com todas as chaves e valores.
Parser.prototype.getParams = (url) => {

    var params = {};
    
    if(url.includes("?")) {
        var parametroBase = url.split("?")[1];
        var baseDividida = parametroBase.split("&");
        for (var i = 0; i < baseDividida.length; i++){
            var sup = baseDividida[i].split("=");
            var key = sup[0];
            var value = sup[1];
            params[key] = value;
        }
    }

    return params;
}

//Busca um tipo de arquivo dentro do diretorio, caso encontre, retorna todos em um JSON, caso não, retorna uma menssagem.
Parser.prototype.getFiles = (files) => {
   
    var cont = files.length;
    var base = [];
    var j = 0;
    
    for(var i = 0; i < cont; i++) {
        if(files[i].split(".")[1] == "zip") {
            base[j] = files[i];
            j++;
        }
    }
    
    if(j > 0) {
        var jFile = JSON.stringify(base);
        return jFile;
    }

    return ("{'menssagem': 'Diretorio vazio'}");
}

module.exports = new Parser();
