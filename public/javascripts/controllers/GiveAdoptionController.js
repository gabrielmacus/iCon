app.controller('give-adoption-controller', function ($scope,$rootScope) {
    $scope.step=1;
    $scope.pet = {};
    $scope.goToStep=function (i) {
        $scope.step = i;
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

        for(var k in $scope.pet)
        {
            console.log($scope.pet[k]);
            formData.append(k,$scope.pet[k]);
        }
        var headers  = angular.copy($rootScope.headers);
        headers['Content-Type']='multipart/form-data';



        axios({
            method: 'put',
            url: url,
            data: formData,
            config: { headers:headers}
        })
            .then(function (response) {
                //handle success
                console.log(response);
            })
            .catch(function (response) {
                //handle error
                console.log(response);
            });
    }
});