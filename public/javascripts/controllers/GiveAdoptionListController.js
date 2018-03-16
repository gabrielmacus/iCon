
app.controller('give-adoption-list-controller', function ($scope,$location,$rootScope,$cookies) {

    $scope.pets = [];

    $scope.actions =[
        {
            text:'delete',
            action: function (pet) {

                axios.delete('/api/pet/'+pet._id,{headers:$rootScope.headers})
                    .then(function (response) {

                        console.log(response);
                    })
                    .catch(function (error) {
                        //TODO: handle errors
                        console.log(error);
                    });

            }
        }
    ];

    $scope.action=function () {
        alert("Disparo");
    }

    $scope.loadAdoptions=function (p) {

        p = (p)?p:1;

        axios.get('/api/pet?p='+p+'&createdBy='+$cookies.get('_id'),{headers:$rootScope.headers}).then(function (response) {

            console.log(response.data);
            $scope.pets = response.data.docs;
            $scope.$apply();


        }).catch(function (err) {
            //TODO:handle error
            console.log(err);
        });

    }

    $scope.loadAdoptions();






});