var formidable = require('formidable');
const FileService = require('../services/FileService');
const async = require('async');
var File = require('../models/File');
const fs = require('fs');
const mongoose = require('mongoose');
module.exports=
    {
        multimedia:function (req,res,next) {

            mongoose.connect(req.dbstring);


            req.model.findOne({_id:req.params.id}).populate("multimedia").exec(function (err,pet) {

                if(err)
                {
                    //TODO: handle errors
                    console.error(err);
                }

                switch (req.method)
                {
                    case "PUT":
                        var form = new formidable.IncomingForm();

                        var filesToPut=[];
                        form.parse(req, function (err, fields, files) {

                            if(!pet || !files)
                            {
                                //TODO: handle errors
                                return res.status(400).json({})
                            }


                            async.each(files, function(file, callback) {

                                var f = new File({filename:file.name,contentType:file.type});


                                FileService.write(f,fs.createReadStream(file.path),function (error,createdFile) {

                                    console.log(createdFile);


                                    filesToPut.push(createdFile._id);

                                    if(error)
                                    {
                                        //TODO: handle errors
                                        console.error(error);
                                    }
                                    callback();
                                });


                                }, function(err) {

                                if(err)
                                {
                                    //TODO: handle errors
                                    console.error(err);
                                }
                                console.log({'$set':{'$push':{multimedia:filesToPut}}});
                                req.model.update({_id:pet._id},{'$set':{'$push':{multimedia:filesToPut}}}).exec(function (err,result) {

                                    if(err)
                                    {
                                        //TODO: handle errors
                                        console.error(err);
                                    }
                                    res.json(result);

                                });




                                /*
                                console.log(files);
                                console.log(fields);
                                res.write('File uploaded');
                                res.end();*/

                            })


                            });
                        break;

                    case "GET":

                        console.log(pet);
                        var stream = FileService.read(pet.multimedia[0]._id);
                        console.log(stream);
                        break;
                }





            })


            /*
            app.post('/profile', upload.array(), function (req, res, next) {
                // req.body contains the text fields
            })*/

        }
    }