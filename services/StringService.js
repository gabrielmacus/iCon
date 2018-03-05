module.exports={

    UcFirst:function (str) {
            return str.charAt(0).toUpperCase() + str.slice(1);
    },
    SnakeToCamel : function(s) {


        return s.replace(/(\-\w)/g, function(m){return m[1].toUpperCase();});

    }
}