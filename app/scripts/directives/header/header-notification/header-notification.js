'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('versammlung.admin')
	.directive('headerNotification',function(){
		return {
        templateUrl:'scripts/directives/header/header-notification/header-notification.html',
        restrict: 'E',
        replace: true,
		scope: {},
			controller:function($scope,$state,principal){
				$scope.currentUser = principal.getIdentity();

			}
    	}
	});


