
module.exports=
    {

        assignments:function (req,res,next) {

            var id = req.param.id;

            req.model.find({_id:id}).populate('assignment')
            res.json({"assignments":true});

        }

    }