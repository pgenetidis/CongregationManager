'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
app.controller('LivingAndServiceCtrl', ["$scope", "$state","principal", "$modal","livingandServiceService", "usersListService","headerService",
    function($scope, $state, principal, $modal, livingandServiceService, usersListService, headerService) {

        $scope.monday = "";
        $scope.firstday = null;
        $scope.lastday = null;
        $scope.month = null;
        $scope.persons = [];
        $scope.dates = {};
        $scope.group = [];
        $scope.roles = [];
        $scope.pageName = $state.current.url.split('/')[1];
        $scope.data = null;



        $scope.loadData = function (){

            if (!principal.isAuthenticated()) {
                $scope.token = localStorage.getItem("token");
                var user = {
                    token:$scope.token
                }
                headerService.tokenValidation(user).then(function (data) {

                    if (data.error == undefined) {
                        principal.authenticate(data);
                        $scope.loadAllData();
                    }
                    else
                        $state.go('login');

                })

            }
        };
        $scope.loadData();
        $scope.loadAllData = function(){
            $scope.dates.clientId = principal.getClientId();
            $scope.dates.pageName = $scope.pageName;
            $scope.dates.firstday = $scope.formatDate($scope.firstday);
            $scope.dates.lastday = $scope.formatDate($scope.lastday);

            livingandServiceService.loadData($scope.dates).then(function (result) {
                $scope.data = result;

                $scope.value = $scope.data.firstday;

                $scope.getBoxValue();

            });
            usersListService.usersList().then(function (data) {
                $scope.persons = data.userInfo;
                $scope.roles = data.userRolesInfo;
                $scope.group = data.congregationGroups;

            });
        };
        $scope.monthNames = ["Ιανουαρίου", "Φεβρουαρίου", "Μαρτίου", "Απριλίου", "Μαίου", "Ιουνίου",
            "Ιουλίου", "Αυγούστου", "Σεπτεμβρίου", "Οκτωμβρίου", "Νοεμβρίου", "Δεκεμβρίου"
        ];

        $scope.newThemeBox = function(){
            $scope.data.pageName = $scope.pageName;
            var modalData = $scope.data;

            var modalInstance = $modal.open({
                templateUrl: 'views/pages/themeBox.html', size: 'lg',
                controller: 'ThemeBoxCtrl',
                scope:$scope,
                resolve: {
                    modalData: function () {
                        return modalData;
                    }
                }
            });

        }


        $scope.formatDate = function(date) {
            return date.getFullYear() + '-' +
                (date.getMonth() < 9 ? '0' : '') + (date.getMonth()+1) + '-' +
                (date.getDate() < 10 ? '0' : '') + date.getDate();
        };

        $scope.getBoxValue = function(){
            var boxValues = $scope.data.boxValues;

            var log = [];
            angular.forEach(boxValues, function(value, key) {
                $scope.data.boxfields[parseInt(value.boxfieldid)-1].fieldValue = value.themeValue;
            }, log);
        };

        $scope.currentWeek = function(){

            var curr = new Date; // get current date
            var first = curr.getDate() - (curr.getDay()-1); // First day is the day of the month - the day of the week
            var last = first + 6; // last day is the first day + 6

            $scope.firstday = new Date(curr.setDate(first));
            $scope.lastday = new Date(curr.setDate(last));
            $scope.month = $scope.monthNames[$scope.lastday.getMonth()];

            $scope.loadAllData();

        };


        $scope.nextWeek = function(){

            var curr = $scope.firstday;
            var first = new Date(curr.getTime() + 7 * 24 * 60 * 60 * 1000); // First day is the day of the month - the day of the week
            var last = new Date(first.getTime() + 6 * 24 * 60 * 60 * 1000); // last day is the first day + 6

            $scope.firstday = new Date(first);
            $scope.lastday = new Date(last);
            $scope.month = $scope.monthNames[$scope.lastday.getMonth()];
            $scope.loadAllData();


        };
        $scope.saveData = function(box){

            var tst = $scope.data;

        };
        $scope.weekBefore = function(){

            var curr = $scope.firstday;
            var first = curr.getDate() -7 // First day is the day of the month - the day of the week
            var last = first + 6; // last day is the first day + 6

            $scope.firstday = new Date(curr.setDate(first));
            $scope.lastday = new Date(curr.setDate(last));
            $scope.month = $scope.monthNames[$scope.firstday.getMonth()];
            $scope.loadAllData();
        };

        $scope.print = function() {

            var modalInstance = $modal.open({
                templateUrl: 'views/reports/livingandServiceReport.html', size: 'lg',
                controller: 'LivingAndServiceReportCtr',
                controllerAs: 'ctrl'
            });
        };


    }
]);
