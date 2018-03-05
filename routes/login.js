var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');






//https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passport.serializeUser(function(user, done) {

    var usr= {"_id":user._id,name:user.name,surname:user.surname};

    done(null, usr);
    // if you use Model.id as your idAttribute maybe you'd want
    // done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

//Passport jwt
var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromHeader();
opts.secretOrKey = process.env.APP_JWT_SECRET;
opts.issuer = process.env.APP_URL; //TODO: which should be the issuer?
opts.audience = process.env.APP_URL;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

    mongoose.connect(process.env);

    console.log(jwt_payload);

    User.findOne({_id: jwt_payload.sub}, function(err, user) {
        if (err) {
            return done(err, false);
        }
        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
            // or you could create a new account
        }
    });
}));