
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var schema = new Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    createdBy:{type:Schema.Types.ObjectId,ref:'User',required:true},
    images:[{ref:'Image',type:Schema.Types.ObjectId}]

}, {
    timestamps: true
});

module.exports= mongoose.model('Pet',schema);