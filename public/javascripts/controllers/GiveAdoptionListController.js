
app.controller('give-adoption-list-controller', function ($scope,$location,$rootScope,$cookies) {

    $scope.pets = [];

    $scope.actions =[

        {
            text:"edit",
            action:function (pet) {

                $location.path('/give-adoption/'+pet._id);

            }
        },
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