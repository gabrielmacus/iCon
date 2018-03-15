var express = require('express');
var router = express.Router();
var passport = require('passport');
var mongoose = require('mongoose');
var FileGridService = require('../services/FileGridService');

mongoose.connect(process.env.DB_STRING);

mongoose.connection.on('connected', function () {
    FileGridService.load( mongoose.connection);
});


router.get(['/:id([a-fA-F\\d]{24})'],function(req,res,next){


    var stream= FileGridService.read(req.params.id);


    stream.on('data',function (chunk) {

        res.write(chunk);
    });

    stream.on('end',function () {
       res.end();
    });

    stream.on('error',function (err) {
        //console.error(err);
        res.send(404);
        //TODO: handle errors
    });


});


module.exports = router;
