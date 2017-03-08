'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
app.controller('TrolleyCtrl',['$scope','$modal','principal','trolleyService','headerService',
    function($scope,$modal,principal,trolleyService,headerService) {

        $scope.monthNames = ["Ιανουαρίου", "Φεβρουαρίου", "Μαρτίου", "Απριλίου", "Μαίου", "Ιουνίου",
            "Ιουλίου", "Αυγούστου", "Σεπτεμβρίου", "Οκτωμβρίου", "Νοεμβρίου", "Δεκεμβρίου"
        ];
        $scope.init =function() {
                $scope.token = localStorage.getItem("token");
                var user = {
                    token: $scope.token
                }
                headerService.tokenValidation(user).then(function (data) {

                    if (data.error == undefined) {
                        principal.authenticate(data);
                        $scope.loadPlaces();
                    }
                    else
                        $state.go('login');
                })
            }
        $scope.loadPlaces = function() {
            trolleyService.loadPlaces(principal.getClientId()).then(function (result) {
                $scope.data = result.places;
                $scope.trolleytime = result.trolleytime;



            });
        }
        $scope.viewMap = function(place){

            var modalInstance = $modal.open({
                templateUrl: 'views/pages/mapViewModal.html',
                size: 'md',
                controller: 'TrolleyModalCtrl',
                resolve: {
                    map: function () {
                        return $scope.map;
                    },
                    place:function () {
                        return place;
                    }
                }
            });
        }
    }
]);