const fs = require('fs');
const mongoose = require('mongoose');
const Image = require('../models/Image');
//instantiate mongoose-gridfs
const gridfs = require('mongoose-gridfs')({
    collection:'files',
    model:'Attachment',
    mongooseConnection: mongoose.connection
});

//obtain a model
File = gridfs.model;
module.exports=
    {
        upload:function (req,res,next) {

            console.log("ASDSDA");
            if(!req.files)
            {
                //TODO: handle errors
                return res.json({});
            }

            /*
            var file = new req.model({filename:"filename",contentType:"sdasa"});

//create or save a file
            File.write(file,
                fs.createReadStream(require('app-root-dir').get()+"/.env"),
                function(error, createdFile){

                    if(error)
                    {
                        console.error(error);
                    }
                    console.log(createdFile);

                });*/


        }
    }