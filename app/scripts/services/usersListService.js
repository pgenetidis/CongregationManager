'use strict';
app.factory('usersListService', ['$http', '$q', function ($http, $q) {

    var usersListServiceFactory = {};

    usersListServiceFactory.usersList = function () {

        var def = $q.defer();


        $http.get(app.serviceBase + 'php/usersList.php').success(function (data) {
            def.resolve(data);
        }).error(function (msg, code) {
            def.reject({msg: msg, code: code});
        });

        return def.promise;
    };
    usersListServiceFactory.editUser = function (user) {

        var def = $q.defer();


        $http.post(app.serviceBase + 'php/editUser.php', user).success(function (data) {
            def.resolve(data);
        }).error(function (msg, code) {
            def.reject({msg: msg, code: code});
        });

        return def.promise;
    };
    usersListServiceFactory.newUser = function (user) {

        var def = $q.defer();


        $http.post(app.serviceBase + 'php/newUser.php', user).success(function (data) {
            def.resolve(data);
        }).error(function (msg, code) {
            def.reject({msg: msg, code: code});
        });

        return def.promise;
    };

    return usersListServiceFactory;
}]);