var express = require('express');
var router = express.Router();
var ModelService = require('../services/ModelService');
var ObjectID = require('mongodb').ObjectID;
//https://www.npmjs.com/package/api-query-params
var apq  = require('api-query-params');
var mongoose = require('mongoose');
var StringService = require('../services/StringService');
require('mongoose-pagination');
var RoleService = require('../services/RoleService');
var passport = require('passport');


//Action
router.all(['/:model','/:model/:action','/:model/:action/:id'],passport.authenticate(['jwt']),function(req, res, next){


    req.model= ModelService.LoadModel(req);

    req.action = ModelService.LoadAction(req);

    req.rest = true;

    req.authorization = RoleService.IsAuthorized(req.user,req);

    if(!req.authorization)
    {

        return res.status(403).json({"error":"Forbidden"});
    }


    try
    {
        var Model = StringService.UcFirst(req.model.modelName );

        var Action = StringService.SnakeToCamel(req.action);


        var Service = require('../services/'+Model+'Service');

        Service[Action](req,res,next);
    }
    catch (e)
    {


        req.page = (req.query.page)?req.query.page:1;

        req.limit = parseInt(process.env.PAGINATION_LIMIT_DEFAULT);

        mongoose.connect((req.query.test && req.app.get('env') === 'development')?process.env.DB_TEST_STRING:process.env.DB_STRING).catch(function (err) {

            //TODO: handle errors / handle db connection errors
            console.error(err);
        });

        next();
    }


});

//Read one
router.get('/:model/:action',function (req,res,next) {


    if(!ObjectID.isValid(req.action))
    {
     return  next();
    }

    req.model.findOne({_id:req.action}).exec(function (err,result) {
        if(err)
        {
            //TODO: Handle errors
            console.log(err);
        }

        return res.json(result);
    });



})
//Update one
router.put('/:model/:action',function (req,res,next) {

    if(!ObjectID.isValid(req.action))
    {
        return  next();
    }

    req.model.update({_id:req.action},{'$set':req.body}).exec(function (err,result) {
        if(err)
        {
            //TODO: Handle errors
            console.log(err);
        }

        return res.json(result);
    });


});
//Delete  one
router.delete('/:model/:action',function (req,res,next) {

    if(!ObjectID.isValid(req.action))
    {
        return  next();
    }

    req.model.findOneAndRemove({_id:req.action}).exec(function (err) {
        if(err)
        {
            //TODO: Handle errors
            console.log(err);
        }

        return res.json({});
    });


});
//Read many
router.get('/:model', function(req, res, next) {

    //Deletes all non related to query fields
    delete req.query.p;

    var query = apq(req.query);
    var filter = query.filter;
    delete query.filter;
    var projection = query.projection;
    delete query.projection;

    req.model
        .find(filter,projection,query)
        .paginate(req.page,req.limit,function (err,results,total) {

            //TODO: Handle errors
            if(err)
            {
                console.log(err);
            }

            if(results)
            {

                res.json({docs:results,pagination:{total:total,results:results.length,page:req.page}});
            }

        });

});
//Create one
router.post('/:model',function(req, res, next){

     req.model.create(req.body,function (err,result) {
        res.json(result);
    });


});


module.exports = router;
