

const mongoose = require('mongoose');
var FileSchema = require('../models/File').schema;
const extendSchema = require('mongoose-extend-schema');

var schema = extendSchema(FileSchema,{
    width:{type:Number,required:true},
    height:{type:Number,required:true}

});

module.exports= mongoose.model('Image',schema);