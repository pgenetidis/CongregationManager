'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
app.controller('UsersCtrl', ['$scope', 'principal', '$modal','usersListService',
    function($scope, principal, $modal, usersListService) {

        $scope.userList;
        $scope.groupList;
        $scope.congregationList;

        $scope.loadUsers = function() {
            usersListService.usersList().then(function (data) {
                $scope.userList = data.userInfo;
                $scope.groupList = data.userRolesInfo;
                $scope.congregationList = data.congregationList;
                $scope.congregationGroups = data.congregationGroups;

            });
        },
        $scope.edit = function(user, roles, congregationList,congregationGroups) {

            roles = $scope.groupList;
            congregationList = $scope.congregationList;
            congregationGroups = $scope.congregationGroups;

            var modalInstance = $modal.open({
                templateUrl: 'views/pages/editUser.html',
                size: 'md',
                controller: 'EditUsersCtrl',
                resolve: {
                    user: function () {
                        return user;
                    },
                    roles: function () {
                        return roles;
                    },
                    congregationList: function () {
                        return congregationList;
                    },
                    congregationGroups: function () {
                        return congregationGroups;
                    },
                    type: function () {
                        return 'editUser';
                    }
                }
            });
        }
        $scope.newUser = function(user, roles, congregationList,congregationGroups) {

            roles = $scope.groupList;
            congregationList = $scope.congregationList;
            congregationGroups = $scope.congregationGroups;
            var user = {
                clientId:principal.getClientId(),
                email:'',
                firstname:'',
                lastname:'',
                rolename:'',
                shortname:'',
                trolley:''

            };

            var modalInstance = $modal.open({
                templateUrl: 'views/pages/editUser.html',
                size: 'md',
                controller: 'EditUsersCtrl',
                resolve: {
                    user: function () {
                        return user;
                    },
                    roles: function () {
                        return roles;
                    },
                    congregationList: function () {
                        return congregationList;
                    },
                    congregationGroups: function () {
                        return congregationGroups;
                    },
                    type: function () {
                        return 'newUser';
                    }
                }
            });
        };
        $scope.sendActivation = function(user){
            usersListService.activateUser(user).then(function (data) {

            });
        };
        $scope.checkRoles = function(role){

            var roles = ['clientAdmin','eldest']

            var tst = principal.isInAnyRole(roles);

            return tst;
        }
    }
]);