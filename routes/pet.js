var formidable = require('formidable');
var FileService = require('../services/FileGridService');
var async = require('async');
var File = require('../models/File');
var fs = require('fs');
var mongoose = require('mongoose');
module.exports=
    {
        multimedia:function (req,res,next) {

            mongoose.connect(req.dbstring,function (err) {


                req.model.findOne({_id:req.params.id}).exec(function (err,pet) {

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

                                    FileService.load(mongoose.connection);

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

                                    filesToPut = pet.multimedia.concat(filesToPut);


                                    req.model.update({_id:pet._id},{'$set':{multimedia:filesToPut,publish_status:'active'}}).exec(function (err,result) {

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
                        default:

                            res.status(404).json({});

                            break;

                    }





                })


            });





        }
    }

