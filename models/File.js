const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var schema = new Schema({
    filename: {type:String, required:true},
    contentType : {type:String,required:true}


}, {
    timestamps: true,
    collection: 'files.files'
});

module.exports= mongoose.model('File',schema);