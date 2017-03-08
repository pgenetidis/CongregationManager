'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
app.controller('LoginCtrl', ['$scope', '$state','loginService', 'principal',
    function($scope, $state, loginService, principal) {

        $scope.clientId = null;
        $scope.user = null;
        $scope.result = null;
        $scope.errorMsg = "";
        $scope.token = "";

        $scope.login = function(){
            loginService.login($scope.user).then(function (data) {
                $scope.result = data;

                if ($scope.result.error != undefined || null == data) {

                    $scope.errorMsg = $scope.result.error;
                }
                else{
                    principal.authenticate($scope.result);
                    $state.go('dashboard.trolley');
                }
            });
        };
        $scope.logout = function(){

            var token = localStorage["token"];

            var data = {
                token: token
            }
            loginService.logout(data).then(function (data) {
                $scope.result = data;

                if ($scope.result.error == undefined) {
                    principal.authenticate($scope.token);
                    $state.go('login');
                }
                else{
                    console.log($scope.result);
            }
            });
        };
    }]
);
