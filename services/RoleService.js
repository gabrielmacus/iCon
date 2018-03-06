var roles = false;
var path = require('path');
var file = require('fs');
module.exports=
    {
        LoadRoles:function () {
          var rolesPath = path.join( require('app-root-dir').get(),"roles.json");
          return file.readFileSync(rolesPath,{}).toString();


        },

        IsAuthorized:function (user) {

            if(!roles || process.env.APP_STATUS != "development") {roles = module.exports.LoadRoles();}

            if(!user.role){ return false; }


        }
    }