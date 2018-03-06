var express = require('express');
var router = express.Router();
var passport = require('passport');
var User = require('../models/User');
var mongoose = require('mongoose');

//https://stackoverflow.com/questions/27637609/understanding-passport-serialize-deserialize
passport.serializeUser(function(user, done) {

    var usr= {"_id":user._id,name:user.name,surname:user.surname};

    done(null, usr);
    // if you use Model.id as your idAttribute maybe you'd want
    // done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        delete user.password;
        done(err, user);
    });
});

/**
 * Passport jwt
 */

var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt;
var opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("JWT");
opts.secretOrKey = process.env.APP_JWT_SECRET;
//opts.issuer = process.env.APP_URL; //TODO: which should be the issuer?
//opts.audience = process.env.APP_URL;

passport.use(new JwtStrategy(opts, function(jwt_payload, done) {

    //TODO: handle errors
    mongoose.connect(process.env.DB_STRING);

    User.findOne({_id: jwt_payload.data._id}).exec(function(err, user) {

        if (err) {
            //TODO: handle errors
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

/**
 * Facebook token
 */

var FacebookTokenStrategy = require('passport-facebook-token');

passport.use(new FacebookTokenStrategy({
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret:  process.env.FACEBOOK_APP_SECRET
    }, function(accessToken, refreshToken, profile, done) {


        User.findOrCreate({"facebook.id": profile.id}, function (error, user) {

            if(error)
            {
                //TODO: handle errors
                console.error(error);
            }

            return done(error, user);
        });
    }
));

router.get("/demofb", function (req,res) {

    res.render('fb-demo');

});
//Demo
router.get("/demo",  passport.authenticate('facebook-token', { session : false }),function (req,res) {

    res.send("OK!");

});

module.exports = router;