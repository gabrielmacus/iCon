
const UtilsService = require('../services/UtilsService');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

module.exports={


    findFriends:function (req,res,next) {

        if(req.rest)
        {
            res.json({});
        }
    },
    register:function (req,res,next) {


        mongoose.connect(process.env.DB_STRING).catch(function (err) {

            //TODO: handle errors / handle db connection errors
            console.error(err);
        });

        //Delete role to be set to default
        delete req.body.role;
        delete req.body.status;
        delete req.body.facebook


        req.model.create(req.body,function (err,result) {

            if(err)
            {
                console.error(err);
                //TODO: handle errors
            }


            if(req.rest)
            {
                return res.json(result);
            }

        });

    },
    sendConfirmationEmail:function (user,callback) {


        UtilsService.SendEmail(false,user.email,false,{user:user},"email/register-confirmation",function (err,info) {


            if(callback){

                callback(err,info);
            }


        });
    },
    token:function (req,res,next) {

        var userOrEmail = (req.body.username)?req.body.username:"";
        var password  = (req.body.password)?req.body.password:"";


        mongoose.connect(process.env.DB_STRING).catch(function (err) {
            //TODO: handle errors / handle db connection errors
            console.error(err);
        });

        req.model.findOne({'$or':[{username:userOrEmail},{email:userOrEmail}]}).exec(function (err,result) {

            if(err)
            {

                console.log(err);
                //TODO: handle errors
            }
            if(!result)
            {
                //TODO: set errors with i18n
                return res.json({});
            }

            //If user is suspended or not verified
            if(result.status != "active")
            {
                //TODO: set errors with i18n
                return res.json({});
            }

            bcrypt.compare(password, result.password, function(err, matches) {

                if(err)
                {
                    console.log(err);
                    //TODO: handle errors
                }

                if(!matches)
                {
                    //TODO: set errors with i18n
                    return res.json({});
                }

                //12 days
                jwt.sign({
                    exp: Math.floor(Date.now() / 1000) + (60 * 60 * 24 * parseInt(process.env.APP_JWT_EXPIRATION_DAYS)),
                    data: {_id:result._id}
                }, process.env.APP_JWT_SECRET,function (err,token) {

                    if(err)
                    {
                        console.log(err);
                        //TODO: handle errors
                    }


                    if(req.rest)
                    {
                        return res.json({"access_token":token});
                    }



                });

            });



        });




    }

}