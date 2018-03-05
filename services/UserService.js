
const UtilsService = require('../services/UtilsService');
const mongoose = require('mongoose');
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

        req.model.create(req.body,function (err,result) {

            if(err)
            {
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
    }

}