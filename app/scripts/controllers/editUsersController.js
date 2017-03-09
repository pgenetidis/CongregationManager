'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
app.controller('EditUsersCtrl', ['$scope', 'principal','$modalInstance','user','roles','type','congregationList','usersListService','congregationGroups',
    function($scope, principal, $modalInstance, user, roles, type, congregationList, usersListService,congregationGroups) {

        $scope.user = user;
        $scope.roles = roles;
        $scope.congregationList = congregationList;
        $scope.congregationGroups = congregationGroups;
        $scope.type = type;
        $scope.clientId;



        $scope.save = function() {

            $scope.user.shortname = $scope.user.lastname + ' ' + $scope.user.firstname.substring(0,1) +'.';
            if ($scope.type=='editUser') {
                usersListService.editUser($scope.user).then(function (data) {


                });
            }
            else if ($scope.type=='newUser') {

                usersListService.newUser($scope.user).then(function (data) {


                });
            }

        }
    }
]);