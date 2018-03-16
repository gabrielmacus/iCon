app.controller('give-adoption-controller', function ($scope,$location,$rootScope,$routeParams) {
    $scope.step=1;
    $scope.pet = {};
    $scope.pets = [];
    $scope.goToStep=function (i) {
        $scope.step = i;
    }


    s = $scope;


    $scope.loadAdoption=function (id) {

        axios.get('/api/pet/'+id,{headers:$rootScope.headers})
            .then(function (response) {
                console.log(response.data);
                $scope.pet = response.data;

                $scope.$apply();
            })
            .catch(function (error) {

                console.log(error);
                //TODO: handle errors

            })

    }

    $scope.completeAdoption=function (callback) {
        var url = 'api/pet';
        var method="post";
        var pet = angular.copy($scope.pet);
        if($scope.pet._id)
        {
            method = 'put';
            url=url+"/"+$scope.pet._id;
        }

        //Deletes bas64
        for(var k in pet.multimedia)
        {
            delete pet.multimedia[k].preview;
        }

        axios({method:method,url:url,data:pet,'headers': $rootScope.headers})
            .then(function (response) {

                if(!$scope.pet._id)
                {

                    $scope.pet = response.data;
                }
                if(!callback)
                {
                    $scope.goToStep(2);
                    $scope.$apply();
                }

            })
            .catch(function (error) {
                //TODO: handle errors
                console.log(error);
            });


    };
    $scope.saveMultimedia=function () {

            var url = 'api/pet/'+$scope.pet._id+"/multimedia";
            var formData = new FormData();

            for(var k in $scope.pet.multimedia)
            {
                if($scope.pet.multimedia[k].file)
                {

                    formData.append(k,$scope.pet.multimedia[k].file);
                }

            }


            var headers  = angular.copy($rootScope.headers);
            headers['Content-Type']='multipart/form-data';




            axios.put(url,formData,{ headers:headers})
                .then(function (response) {

                    $location.path("/give-adoption/list");
                    $scope.$apply();


                })
                .catch(function (err) {
                    //TODO:handle error
                    console.log(err);
                });



    }


    if($routeParams.id)
    {
        $scope.loadAdoption($routeParams.id);
    }






});