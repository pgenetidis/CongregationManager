'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
angular.module('versammlung.admin', [
        'oc.lazyLoad',
        'ui.router',
        'ui.bootstrap',
        'angular-loading-bar',
        'pascalprecht.translate',
        'ngCookies',
        'smart-table',
        'minicolors'

  ])
.run(['$rootScope', '$state', '$stateParams', 'authorization', 'principal',
    function ($rootScope, $state, $stateParams, authorization, principal, schoolTypeLabels) {
        $rootScope.$state = $state;
        $rootScope.$on('$stateChangeStart', function (event, toState, toStateParams) {

            $rootScope.toState = toState;
            $rootScope.toStateParams = toStateParams;
            if (principal.isIdentityResolved())
                authorization.authorize();
        });
    }
])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider','$translateProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider,$translateProvider) {
    
    $ocLazyLoadProvider.config({
      debug:false,
      events:true
    });
    //$translateProvider.translations('de', {
    //    APP_HEADLINE:  'Großartige AngularJS App',
        //        NAV_HOME:      'Zur Startseite',
        //    NAV_ABOUT:     'Über',
        //    APP_TEXT:      'Irgendein Text über eine großartige AngularJS App.'
        //});
        //$translateProvider.translations('gr', {
        //    APP_HEADLINE:  'λαλαλαλαλαλαλαλα',
        //    NAV_HOME:      'Zur Startseite',
        //    NAV_ABOUT:     'Über',
        //    APP_TEXT:      'Irgendein Text über eine großartige AngularJS App.'
        //});
    //$translateProvider.preferredLanguage('gr');
        //$translateProvider.determinePreferredLanguage();

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('dashboard', {
        url:'/dashboard',
        templateUrl: 'views/dashboard/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'versammlung.admin',
                    files:[
                    'scripts/directives/header/header.js',
                    'scripts/services/headerService.js',
                    'scripts/controllers/header.js',
                    'scripts/controllers/loginController.js',
                    'scripts/services/loginService.js',
                    'scripts/directives/header/header-notification/header-notification.js',
                    'scripts/directives/sidebar/sidebar.js'
                    ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["../bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "../bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['../bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['../bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['../bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['../bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['../bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('dashboard.home',{
        url:'/home',
        controller: 'MainCtrl',
        templateUrl:'views/dashboard/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'versammlung.admin',
              files:[
              'scripts/controllers/main.js',
              'scripts/directives/timeline/timeline.js',
              'scripts/directives/notifications/notifications.js',
              ]
            })
          }
        }
      })
      .state('dashboard.trolley',{
        templateUrl:'views/pages/trolley.html',
        url:'/trolley',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'versammlung.admin',
                        files:['scripts/controllers/trolleyController.js',
                            'scripts/services/trolleyService.js']
                    })
                }
            }
        })
        .state('dashboard.trolleyPlace',{
            templateUrl:'views/pages/trolleyPlace.html',
            url:'/trolley',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'versammlung.admin',
                        files:['scripts/controllers/trolleyPlaceController.js',
                            'scripts/services/trolleyPlaceService.js']
                    })
                }
            }
        })
      .state('dashboard.livingAndService',{
        templateUrl:'views/pages/livingAndService.html',
            data: {
                roles: ['user', 'eldest', 'ministerialServants', 'clientAdmin']
            },
            url:'/livingAndService',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'versammlung.admin',

                        files:[
                                'scripts/controllers/header.js',
                                'scripts/services/headerService.js',
                                'scripts/controllers/livingAndServiceController.js',
                                'scripts/controllers/themeBoxController.js',
                                'js/jsPDF/jspdf.debug.js',
                                'js/jsPDF/html2canvas.js',
                                'js/jsPDF/canvas2image.js',

                                'scripts/controllers/livingAndServiceReportController.js',
                                'scripts/services/usersListService.js',
                                'scripts/services/livingandServiceService.js',
                                'scripts/services/boxEditorService.js']
                    })
                }
            }
    })
    .state('dashboard.watchtower',{
        templateUrl:'views/pages/watchtower.html',
        url:'/watchtower',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'versammlung.admin',
                    files:['scripts/controllers/header.js',
                        'scripts/services/headerService.js',
                        'scripts/controllers/watchtowerController.js',
                        'scripts/services/watchtowerService.js',
                        'scripts/controllers/themeBoxController.js',
                        'scripts/services/usersListService.js',
                        'scripts/services/boxEditorService.js']
                })
            }
        }
    })

        .state('login',{
        templateUrl:'views/pages/login.html',
        url:'/login',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'versammlung.admin',
                        files:['scripts/controllers/loginController.js','scripts/services/loginService.js']
                    })
                }
            }
    })
    .state('dashboard.users',{
        templateUrl:'views/pages/users.html',
        url:'/users',
        resolve: {
            loadMyFiles:function($ocLazyLoad) {
                return $ocLazyLoad.load({
                    name:'versammlung.admin',
                    files:['scripts/controllers/usersController.js',
                        'scripts/services/usersListService.js',
                        'scripts/controllers/editUsersController.js']
                })
            }
        }
    })
        .state('dashboard.trolley_settings',{
            templateUrl:'views/pages/trolley_settings.html',
            url:'/trolley_settings',
            resolve: {
                loadMyFiles:function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name:'versammlung.admin',
                        files:['scripts/controllers/trolleySettingsController.js',
                            'scripts/services/trolleySettingsService.js',
                            'scripts/controllers/editTrolleyController.js']
                    })
                }
            }
        })

      .state('dashboard.table',{
        templateUrl:'views/table.html',
        url:'/table'
    })
      .state('dashboard.panels-wells',{
          templateUrl:'views/ui-elements/panels-wells.html',
          url:'/panels-wells'
      })
      .state('dashboard.buttons',{
        templateUrl:'views/ui-elements/buttons.html',
        url:'/buttons'
    })
      .state('dashboard.notifications',{
        templateUrl:'views/ui-elements/notifications.html',
        url:'/notifications'
    })
      .state('dashboard.typography',{
       templateUrl:'views/ui-elements/typography.html',
       url:'/typography'
   })
      .state('dashboard.icons',{
       templateUrl:'views/ui-elements/icons.html',
       url:'/icons'
   })
      .state('dashboard.grid',{
       templateUrl:'views/ui-elements/grid.html',
       url:'/grid'
   })
  }]);
var app = angular.module('versammlung.admin');
app.serviceBase = '/CongregationManager.git/trunk/';