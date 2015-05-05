'use strict';

/**
 * @ngdoc overview
 * @name nestorApp
 * @description
 * # nestorApp
 *
 * Main module of the application.
 */

angular
  .module('nestorApp.services', []);

angular
  .module('nestorApp.directives', ['nestorApp.services']);

var app = angular
  .module('nestorApp', [
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngAnimate',
    'pageslide-directive',
    'ngDraggable',
    'ui.bootstrap',
    'ui.ace',
    'xeditable',
    'nestorApp.services',
    'nestorApp.directives',
    'angulartics',
    'angulartics.mixpanel'
  ]);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/main.html',
      controller: 'MainCtrl'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    })
    .when('/home', {
      templateUrl: 'views/landing.html'
    })
    .otherwise({
      redirectTo: '/'
    });
    
});

app.run(function (editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme. Can be also 'bs2', 'default'
});
