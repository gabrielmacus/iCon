var FileGridfs=null;
var gridfs =null;
const mongoose = require('mongoose');


gridfs = require('mongoose-gridfs')({
    collection:'files',
    model:'Attachment',
    mongooseConnection: mongoose.connection
});
FileGridfs = gridfs.model;
module.exports=
    {
        load:function () {

        },
        remove:function (id,callback) {

            module.exports.load();

            FileGridfs.unlinkById(id, function(error, unlinkedAttachment){

                callback(error,unlinkedAttachment);
            });

        },
        read:function (id) {

            module.exports.load();
            var stream  = FileGridfs.readById(id);
            return stream;

        },
        write:function (f,readStream,callback) {

            module.exports.load();
            //create or save a file
            FileGridfs.write(f,
                readStream,
                function(error, createdFile){



                    callback(error,createdFile);

                });

        }
    }