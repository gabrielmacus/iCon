(function () {


    app
        .directive('petList', function counter() {
            return {
                restrict:"E",
                scope: {
                    pets:"=",
                    actions:"="
                },
                controller: function ($scope) {


                    $scope.checkMediaType=function (media) {

                        return checkMediaType(media.contentType);

                    }

                },

                templateUrl:"/views/pet-list.html"
            };
        });
})();