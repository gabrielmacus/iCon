(function () {


    app
        .directive('petList', function counter() {
            return {
                restrict:"E",
                scope: {
                    pets:"=",
                    actions:"="
                },
                controller: function ($scope,$rootScope) {

                    $scope.execAction=function (action,pet) {

                        action(pet);

                    }

                    $scope.checkMediaType=function (media) {

                        return checkMediaType(media.contentType);

                    }

                },

                templateUrl:"/views/pet-list.html"
            };
        });
})();