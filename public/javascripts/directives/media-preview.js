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
                    media:"="
                },
                controller: function ($scope) {
                    $scope.previews = [];
                    var reader  = new FileReader();

                    $scope.checkType=function (p) {

                        switch (true)
                        {
                            case (p.type.indexOf('image') > -1):

                            return 'image';

                                break;
                            case (p.type.indexOf('video') > -1):

                                return 'video';

                                break;
                        }

                        return false;

                    }
                    $scope.$watchCollection('media',function (newVal,oldVal) {
                        if(newVal && newVal !== oldVal) {

          


                            asyncForEach(newVal,function () {

                                try{
                                    $scope.$apply();
                                }
                                catch (e)
                                {

                                }


                            },function (item,index,next) {

                                if(typeof item == "object")
                                {
                                    reader.readAsDataURL(newVal[index]);


                                    reader.onloadend=function () {

                                        $scope.previews.push({src:reader.result,type:item.type});
                                        next();

                                    }

                                }
                                else
                                {
                                    next();
                                }
                            })



                        }
                    })








                },

                templateUrl:"/views/media-preview.html"
            };
        });
})();