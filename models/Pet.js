
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PetType = require('./PetType');

var schema = new Schema({
    name: {type:String, required:true},
    description: {type:String, required:true},
    createdBy:{type:Schema.Types.ObjectId,ref:'User',required:true},
    images:[{ref:'Image',type:Schema.Types.ObjectId}],
    type:{type:Schema.Types.ObjectId,ref:'PetType',required:true},
    size:{type:String,enum:['small','medium','big'],required:true},
    gender:{type:String,enum:['female','male'],required:true},
    furLength:{type:String,enum:['short','medium','long']},
    age:{type:Number,required:true}
}, {
    timestamps: true
});
//https://stackoverflow.com/questions/21592351/mongoose-js-force-always-populate
var autoPopulatePetType = function(next) {
    this.populate('type');
    next();
};

schema.
pre('findOne', autoPopulatePetType).
pre('find', autoPopulatePetType);



module.exports= mongoose.model('Pet',schema);