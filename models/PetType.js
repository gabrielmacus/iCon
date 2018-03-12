
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var schema = new Schema({
    name: {type:String, required:true},
    parent : {type:Number,default:0}

}, {
    timestamps: true
});

module.exports= mongoose.model('PetType',schema);