'use strict';
/**
 * @ngdoc function
 * @name sbAdminApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the sbAdminApp
 */
app.controller('ThemeBoxCtrl', ['$scope', '$timeout', 'principal','$state','$modalInstance','modalData','boxEditorService',
    function($scope, $timeout, principal, $modalInstance, $state, modalData, boxEditorService) {


        $scope.modalData = modalData;
        $scope.delete = false;
        $scope.themeboxes = [];
        $scope.boxthemes = modalData.boxthemes;
        $scope.selectedBox = null;
        $scope.fields = [];
        $scope.isLoading = false;
        $scope.inProgress = false;
        $scope.showSuccess = false;

        $scope.fieldtypes = [
            'users',
            'freetext',
            'congregationgroups'
        ]
        $scope.customSettings = {
            control: 'brightness',
            theme: 'bootstrap',
            position: 'bottom left'
        };


        $scope.save = function(selectedBox) {
            $scope.selectedBox.fields = $scope.fields;
            $scope.inProgress = true;
            boxEditorService.saveData($scope.selectedBox).then(function (result) {
                $scope.fields = result.boxfields;
                $scope.inProgress = false;
                $scope.showSuccess = true;
                $scope.loadAllData();
                $timeout(function () {
                    $scope.showSuccess = false;

                }, 5000);
            }, function(error) {
                $scope.inProgress = false;
                $scope.showSuccess = false;
            });
        };

        $scope.deleteBox = function(){
            boxEditorService.deleteBox($scope.selectedBox).then(function (result) {

                $scope.loadAllData();
                $timeout(function () {
                    $scope.showSuccess = false;
                }, 5000);
            }, function(error) {
                $scope.inProgress = false;
                $scope.showSuccess = false;
            });
        };


        $scope.addNewField = function () {
                $scope.fields.push(new Object());

        };
        $scope.newThemeBox = function(){
            $scope.fields = [];
            $scope.selectedBox = {
                boxname: 'Neue Box',
                positionIndex: $scope.data.themeboxes.length+1,
                headercolor: '#E1E1E1',
                fields: $scope.fields,
                pageName: modalData.pageName,
                clientId: principal.getClientId()

            };
        };

        $scope.$watch('data.themeboxes', function (newValue, oldValue) {
            $scope.isLoading = true;
            $scope.emailState = null;
            angular.forEach(newValue, function (val) {
                if (val.isSelected == true) {
                    $scope.selectedBox = angular.copy(val);

                }
            });
            boxEditorService.loadData($scope.selectedBox).then(function (result) {
                $scope.fields = result.boxfields;
                $scope.isLoading = false;
            }, function(error) {
                $scope.isLoading = false;
            });
        }, true);
    }
]);