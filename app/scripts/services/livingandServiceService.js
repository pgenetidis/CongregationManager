'use strict';
app.factory('livingandServiceService', ['$http', '$q', function ($http, $q) {

    var livingandServiceServiceFactory = {};

    livingandServiceServiceFactory.loadData = function (dates) {

        var def = $q.defer();


        $http.post(app.serviceBase + 'php/livingandservice.php', dates).success(function (result) {
            def.resolve(result);
        }).error(function (msg, code) {
            def.reject({msg: msg, code: code});
        });

        return def.promise;
    };

    return livingandServiceServiceFactory;
}]);