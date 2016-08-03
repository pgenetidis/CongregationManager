'use strict';
app.factory('headerService', ['$http', '$q', function ($http, $q) {

    var headerServiceFactory = {};

    headerServiceFactory.tokenValidation = function (user) {

        var def = $q.defer();


        $http.post(app.serviceBase + 'php/tokenValidation.php', user).success(function (data) {
            def.resolve(data);
        }).error(function (msg, code) {
            def.reject({msg: msg, code: code});
        });

        return def.promise;
    };




    return headerServiceFactory;
}]);