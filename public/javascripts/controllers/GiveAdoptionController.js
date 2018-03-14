app.controller('give-adoption-controller', function ($scope,$location,$rootScope) {
    $scope.step=1;
    $scope.pet = {};
    $scope.pets = [];
    $scope.goToStep=function (i) {
        $scope.step = i;
    }



    $scope.loadAdoptions=function () {

        axios.get('/api/',{headers:$rootScope.headers}).then(function (response) {

            console.log(response);
            $scope.pets = response.data.docs;
            $scope.pets.$apply();


        }).catch(function (err) {
            //TODO:handle error
            console.log(err);
        });

    }

    $scope.completeAdoption=function () {
        var url = 'api/pet';
        if($scope.pet._id)
        {
            url=url+"/"+$scope.pet._id;
        }

        axios.post(url, angular.copy($scope.pet),{'headers': $rootScope.headers})
            .then(function (response) {
                $scope.pet = response.data;
                $scope.goToStep(2);
                $scope.$apply();
            })
            .catch(function (error) {
                console.log(error);
            });


    };
    $scope.saveMultimedia=function () {
        var url = 'api/pet/'+$scope.pet._id+"/multimedia";
        var formData = new FormData();

        for(var k in $scope.pet.multimedia)
        {
            formData.append(k,$scope.pet.multimedia[k]);

        }
        var headers  = angular.copy($rootScope.headers);
        headers['Content-Type']='multipart/form-data';
        console.log(headers);



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








});