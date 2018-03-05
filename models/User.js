
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


var schema = new Schema({
    name: {type:String, required:true},
    surname: {type:String, required:true},
    password: {type:String, required:true},
    email: {type:String, required:true}

});
schema.pre('save', true, function(next, done) {
    // calling next kicks off the next middleware in parallel
    next();
    setTimeout(done, 100);
});
module.exports= mongoose.model('User',schema);