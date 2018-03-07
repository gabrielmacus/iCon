
var StringService = require('../services/StringService');
var ObjectID = require('mongodb').ObjectID;

module.exports={
    LoadModel:function (req) {

        var modelName = (req.params.model)?StringService.UcFirst(req.params.model):false;

        return require('../models/'+modelName);

    },
    LoadAction:function (req) {
        return (req.params.action)?req.params.action:false;
    }

}