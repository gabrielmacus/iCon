var roles = false;
var path = require('path');
var file = require('fs');
module.exports=
    {
        LoadRoles:function (rolesPath) {

            if(!rolesPath){
                 rolesPath = path.join( require('app-root-dir').get(),"roles.json");
            }


          return JSON.parse(file.readFileSync(rolesPath,{}).toString());


        },
        ParsePath:function (path) {


            if(path[0] == "/")
            {
                path = path.slice(1, path.length);
            }
            if(path[path.length -1] == "/")
            {
                path =path.slice(0,-1);
            }

            return path.split("/");//path.replace(new RegExp("/", 'g'), ".");
        },
        CompareEndpoints:function (a,b) {

            var wilcardEnd = false;
            var loopable = a;
            var comparable = b;


            if((a[a.length-1] == "*") && a.length < b.length)
            {
                wilcardEnd = true;
                loopable = a;
                comparable = b;
            }
            else if((b[b.length-1] == "*") && b.length < a.length)
            {
                wilcardEnd = true;
                loopable = b;
                comparable = a;
            }

            if(!wilcardEnd && a.length != b.length)
            {
                return false;
            }



            for(var l in loopable)
            {
                if(comparable.indexOf(loopable[l])== -1 && loopable[l] != "*")
                {
                    return false;
                }
            }



            return true;


        },
        IsAuthorized:function (user,req,rolesPath) {



            try
            {
                var path = req.baseUrl+req.path;

                var method = req.method.toUpperCase();

                path = module.exports.ParsePath(path);

                if(!roles || process.env.APP_STATUS != "development") {roles = module.exports.LoadRoles((rolesPath)?rolesPath:false);}

                if(!user.role || !roles[user.role] ){ return false; }

                var permission = false;

                for(var i in roles[user.role])
                {

                    var endpoint = i.split(".") ;

                    if(module.exports.CompareEndpoints(endpoint,path) && roles[user.role][i][req.method])
                    {

                        permission = (roles[user.role][i][req.method].access_level)?roles[user.role][i][req.method].access_level:1;

                        break;
                    }


                }


                return permission;

            }
            catch (e)
            {
                console.error(e);

                return false;
            }

        }
    }