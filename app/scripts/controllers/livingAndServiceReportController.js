'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
app.controller('LivingAndServiceReportCtr', ["$scope",
    function($scope) {

        $scope.monday = "";
        $scope.firstday = null;
        $scope.lastday = null;
        $scope.month = null;

        $scope.monthNames = ["Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος",
            "Ιούλιος", "Άυγουστος", "Σεπτέμβριος", "Οκτώμβριος", "Νοέμβριος", "Δεκέμβριος"
        ];


        $scope.currentWeek = function(){

            var curr = new Date; // get current date
            var first = curr.getDate() - (curr.getDay()-1); // First day is the day of the month - the day of the week
            var last = first + 6; // last day is the first day + 6

            $scope.firstday = new Date(curr.setDate(first));
            $scope.lastday = new Date(curr.setDate(last));
            $scope.month = $scope.monthNames[$scope.firstday.getMonth()];
        };



        $scope.nextWeek = function(){

            var curr = $scope.firstday;
            var first = curr.getDate() +7 // First day is the day of the month - the day of the week
            var last = first + 6; // last day is the first day + 6

            $scope.firstday = new Date(curr.setDate(first));
            $scope.lastday = new Date(curr.setDate(last));
            $scope.month = $scope.monthNames[$scope.firstday.getMonth()];


        };
        $scope.weekBefore = function(){

            var curr = $scope.firstday;
            var first = curr.getDate() -7 // First day is the day of the month - the day of the week
            var last = first + 6; // last day is the first day + 6

            $scope.firstday = new Date(curr.setDate(first));
            $scope.lastday = new Date(curr.setDate(last));
            $scope.month = $scope.monthNames[$scope.firstday.getMonth()];

        };
        $scope.printDoc = function(){

            $("#print-content").printThis({
                debug: false,
                importCSS: true,
                importStyle: true,
                printContainer: true,
                loadCSS: "",
                pageTitle: "",
                removeInline: false,
                printDelay: 333,
                header: null,
                formValues: true
            });

        }


    }
]);
