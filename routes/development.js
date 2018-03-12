var express = require('express');
var router = express.Router();

/* GET home page. */
router.get(['/template/:folder/:template','/template/:template'], function(req, res, next) {
     
var templatePath = (req.params.folder)?req.params.folder+"/"+req.params.template:req.params.template;
var data = JSON.parse(req.query.data)  ;
res.render(templatePath,data);
});

module.exports = router;