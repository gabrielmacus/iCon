
const mongoose = require('mongoose');
const Schema = mongoose.Schema;



var schema = new Schema({
    title: {type:String, required:true},
    createdBy:{type:Schema.Types.ObjectId,ref:'User',required:true},
    date:{type:Number,enum:[1,2,3],required:true},


}, {
    timestamps: true
});

module.exports= mongoose.model('Assignment',schema);