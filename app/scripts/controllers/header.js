'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
app.controller('HeaderCtrl', ['$scope', '$state','headerService', 'principal',
    function($scope, $state, headerService, principal) {


        $scope.token = "";

        $scope.validateToken = function(){

            $scope.token = localStorage.getItem("token");
            var user = {
                token:$scope.token
            }
            headerService.tokenValidation(user).then(function (data) {

                if (data.error == undefined) {
                    principal.authenticate(data);
                }
                else
                    $state.go('login');

            })

        }
    }]
);
