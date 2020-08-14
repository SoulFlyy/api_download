'use strict'

const baseToken = require('../config/token');

function Validator(){}

//Função para validar a existencio de um parâmetro X dentro do JSON.
Validator.prototype.hasParameter = (obj, prmt) => {
    if(obj.hasOwnProperty(prmt)){
        return false;
    }
    return true;
}

//Função para ver se o token informado é valido
Validator.prototype.tokenValidator = (params) => {
    const validator = new Validator();

    //Valida a existencia do parâmetro "token" dentro do JSON. 
    if(validator.hasParameter(params, "token")) {
        return false;
    }

    for(var propt in baseToken){
        if(baseToken[propt].token === params.token){
            return true;
        }
    }
    return false;
}

//Vlidador de ano bissexto e verifica o maximo de dias no mes.
Validator.prototype.maxDay = (month, year) => {
    var day;
    month = parseInt(month);

    switch(month) {
        case 2:

            if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
                day = 29;
            } else {
                day = 28;
            }
            break;

        case 4:
        case 6:
        case 9:
        case 11:
            
            day = 30;
            break;

        default:
            
            day = 31;
            break;
    }

    return day;
}

//Função que confirma a validade da data enviada.
Validator.prototype.dataValidator = (data) => {

    const baseDate = new Date();
    const validator = new Validator();

    if(data.length != 10) {
        return false;
    }
    
    if(!(data.includes("-"))) {
        return false;
    }
    
    var mask = data.split("-");

    if(mask.length !== 3) {
        return false;
    }
    
    var year = mask[0];
    var month = mask[1];
    var day = mask[2];

    if(year.length !== 4) {
        return false;
    }

    if(month.length !== 2) {
        return false;
    }

    if(day.length !== 2) {
        return false;
    }

    if(year > baseDate.getFullYear()) {
        return false;
    }

    if(month < 1 || month > 12) {
        return false;
    }

    if(day < 1 || day > validator.maxDay(month, year)) {
        return false;
    }

    if(year == baseDate.getFullYear() && month - 1 > baseDate.getMonth()) {
        return false;
    }

    if(year == baseDate.getFullYear() && month - 1 == baseDate.getMonth() && day >= baseDate.getDate()) {
        return false;
    }

    return true;
}

module.exports = new Validator();
