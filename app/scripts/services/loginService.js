'use strict';
app.factory('loginService', ['$http', '$q', function ($http, $q) {

    var authServiceFactory = {};

    authServiceFactory.login = function (user) {

        var def = $q.defer();


        $http.post(app.serviceBase + 'php/login.php', user).success(function (data) {
            def.resolve(data);
        }).error(function (msg, code) {
            def.reject({msg: msg, code: code});
        });

        return def.promise;
    };

    authServiceFactory.logout = function (data) {

        var def = $q.defer();


        $http.post(app.serviceBase + 'php/logout.php', data).success(function (response) {
            localStorage.clear();
            def.resolve(response);
        }).error(function (msg, code) {
            def.reject({msg: msg, code: code});
        });

        return def.promise;
    };


    return authServiceFactory;
}]);