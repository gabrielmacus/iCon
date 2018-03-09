
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var schema = new Schema({
    title: {type:String, required:true},
    text: {type:String, required:true}


}, {
    timestamps: true
});

module.exports= mongoose.model('PostDemo',schema);