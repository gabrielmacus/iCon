(function () {
    /**
     * An asynchronous for-each loop
     *
     * @param   {array}     array       The array to loop through
     *
     * @param   {function}  done        Callback function (when the loop is finished or an error occurs)
     *
     * @param   {function}  iterator
     * The logic for each iteration.  Signature is `function(item, index, next)`.
     * Call `next()` to continue to the next item.  Call `next(Error)` to throw an error and cancel the loop.
     * Or don't call `next` at all to break out of the loop.
     */
    function asyncForEach(array, done, iterator) {
        var i = 0;
        next();

        function next(err) {
            if (err) {
                done(err);
            }
            else if (i >= array.length) {
                done();
            }
            else if (i < array.length) {
                var item = array[i++];
                setTimeout(function() {
                    iterator(item, i - 1, next);
                }, 0);
            }
        }
    }

    app
        .directive('mediaPreview', function counter() {
            return {
                restrict:"E",
                scope: {
                    media:"=",
                    removedMedia:"="
                },

                link: function (scope, element, attrs) {

                   var fileUploadElement = element[0].querySelector("[type='file']");

                    var reader  = new FileReader();

                   fileUploadElement.addEventListener('change',function (e) {

                       asyncForEach(fileUploadElement.files,function () {

                           try{
                               scope.$apply();
                           }
                           catch (e)
                           {

                           }


                       },function (item,index,next) {

                           if(item instanceof  File)
                           {
                               reader.readAsDataURL(fileUploadElement.files[index]);


                               reader.onloadend=function () {

                                   scope.media.push({file:item,preview:{src:reader.result},type:item.type});
                                   next();

                               }

                           }
                           else
                           {
                               next();
                           }
                       })

                   })

                   /*
                    var onChangeHandler = scope.$eval(attrs.customOnChange);
                    fileUploadElement.on('change', function () {
                        console.log("changed this");
                    });
                    fileUploadElement.on('$destroy', function() {
                        element.off();
                    });*/

                },
                controller: function ($scope) {
                    $scope.media = (!$scope.media)?[]:$scope.media;




                    $scope.checkType=function (p) {

                        return checkMediaType(p.type || p.contentType);

                    }
                    $scope.removeMedia=function (p)
                    {
                        var idx = $scope.media.findIndex(function (el) {
                           return (p.id && el._id == p.id )
                        });

                        if(idx > -1)
                        {
                            if(!$scope.removedMedia)
                            {
                                $scope.removedMedia=[];
                            }

                            $scope.media.splice(idx,1);
                            $scope.removedMedia.push(p._id);
                        }
                        else
                        {
                           idx = $scope.media.indexOf(p);
                           $scope.media.splice(idx,1);

                        }

                    }


                    /*
                    *
                    $scope.$watchCollection('media',function (newVal,oldVal) {
                        console.log(newVal);
                        console.log(oldVal);
                        if(newVal ) {


                            asyncForEach(newVal,function () {

                                try{
                                    $scope.$apply();
                                }
                                catch (e)
                                {

                                }


                            },function (item,index,next) {

                                if(item instanceof  File)
                                {
                                    reader.readAsDataURL(newVal[index]);


                                    reader.onloadend=function () {

                                        $scope.previews.push({src:reader.result,type:item.type});
                                        next();

                                    }

                                }
                                else if(typeof item == "object")
                                {
                                    var idx = $scope.previews.findIndex(function (el) {return (el.id && el.id == item._id)});

                                    if(idx == -1)
                                    {
                                        $scope.previews.push({id:item._id,src:'/media/'+item._id,type:item.contentType});
                                    }
                                    next();
                                }
                                else
                                {
                                    next();
                                }
                            })



                        }
                    })*/






                },

                templateUrl:"/views/media-preview.html"
            };
        });
})();