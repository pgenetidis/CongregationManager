'use strict';
app.factory('boxEditorService', ['$http', '$q', function ($http, $q) {

    var boxEditorServiceFactory = {};

    boxEditorServiceFactory.loadData = function (selectedBox) {

        var def = $q.defer();


        $http.post(app.serviceBase + 'php/boxEditor.php', selectedBox).success(function (result) {
            def.resolve(result);
        }).error(function (msg, code) {
            def.reject({msg: msg, code: code});
        });

        return def.promise;
    };
    boxEditorServiceFactory.saveData = function (selectedBox) {

        var def = $q.defer();


        $http.post(app.serviceBase + 'php/boxCreator.php', selectedBox).success(function (result) {
            def.resolve(result);
        }).error(function (msg, code) {
            def.reject({msg: msg, code: code});
        });

        return def.promise;
    };

    boxEditorServiceFactory.deleteBox = function (selectedBox) {
        var def = $q.defer();
        $http.post(app.serviceBase + 'php/boxDelete.php', selectedBox).success(function (result) {
            def.resolve(result);
        }).error(function (msg, code) {
            def.reject({msg: msg, code: code});
        });


        return def.promise;
    };


    return boxEditorServiceFactory;
}]);