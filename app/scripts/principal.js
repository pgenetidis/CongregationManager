'use strict';

app.factory('principal', ['$q', '$http', '$timeout', '$window', '$cookieStore', '$log',
    function ($q, $http, $timeout, $window, $cookieStore, $log) {
        var _identity = undefined,
            _authenticated = false;

        return {

            isIdentityResolved: function () {
                return angular.isDefined(_identity);
            },
            isAuthenticated: function () {
                return _authenticated;
            },
            isInRole: function (role) {

                if (!_authenticated || !_identity.roleName)
                    return false;

                return _identity.roleName.indexOf(role) != -1;
            },
            isInAnyRole: function (roles) {

                if (!_authenticated || !_identity.roleName)
                    return false;

                for (var i = 0; i < roles.length; i++) {
                    if (this.isInRole(roles[i]))
                        return true;
                }

                return false;
            },
            authenticate: function (identity) {
                _identity = identity;
                _authenticated = identity != null;

                try {
                    if (identity) {
                        $cookieStore.put('identity', identity.token);
                        localStorage.setItem("token", identity.token)
                    }
                    else {
                        $cookieStore.remove('identity');
                        localStorage.removeItem("token");
                    }
                }
                catch(ex) {
                    $log.error('Unable to store token in principal!');
                }
            },
            identity: function (force) {
                var deferred = $q.defer();

                if (force === true)
                    _identity = undefined;

                if (angular.isDefined(_identity)) {
                    deferred.resolve(_identity);

                    return deferred.promise;
                }

                //if ($window.sessionStorage.identity) {
                if ($cookieStore.get('identity') != null) {

                    this.authenticate($cookieStore.get('identity'));
                    //this.authenticate(angular.fromJson($window.sessionStorage.identity));
                    deferred.resolve(_identity);

                    return deferred.promise;
                }

                this.authenticate(null);
                deferred.resolve(_identity);

                return deferred.promise;
            },
            getEmail: function() {
                if (angular.isDefined(_identity) && _identity.email) {
                    return _identity.email;
                }
                else {
                    return 'Unbekannt';
                }
            },

            getUserId: function() {
                if (_identity != null && angular.isDefined(_identity)) {
                    return _identity.userId;
                }
                else {
                    return null;
                }
            },
            getClientId: function() {
                if (angular.isDefined(_identity)) {
                    return _identity.clientId;
                }
                else {
                    return null;
                }
            },
            getClientName: function(){
                if (angular.isDefined(_identity)) {
                    return _identity.clientName;
                }
                else {
                    return null;
                }


            },
            getToken: function() {
                if (angular.isDefined(_identity) && _identity) {
                    return _identity.token;
                }
                else {
                    return null;
                }
            }
        };
    }
]);