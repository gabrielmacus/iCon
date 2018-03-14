var express = require('express');
var router = express.Router();
var passport = require('passport');
/* GET home page. */
router.get('/',passport.authenticate(['jwt'], { failureRedirect: '/login' }),function(req, res, next) {

    res.cookie('_id',req.user._id.toString(), { maxAge: 900000 });

    res.render('index', {lang:req.params.language,user:req.user});
});

router.get('/login',function(req,res,next){

  if(req.user)
  {
    return res.redirect('/');
  }

  next();

},function (req,res,next) {

  res.render('login', {lang:req.params.language});
})



module.exports = router;
