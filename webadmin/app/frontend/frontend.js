"use strict";
(() => {
    var app = angular.module('app', [
        'ui.router',
        'ngResource',
        'ncy-angular-breadcrumb',
        'angular-loading-bar',
        'ngMessages',
        'ui.bootstrap',
        'ngCookies'
    ]);

    app.config(['$qProvider', function ($qProvider) {
        $qProvider.errorOnUnhandledRejections(false);
    }]);
    app.config(['$httpProvider', function($httpProvider) {
        $httpProvider.defaults.cache = false;
        $httpProvider.defaults.timeout = 5000;
        $httpProvider.defaults.headers.common["Cache-Control"] = "no-cache";
        $httpProvider.defaults.headers.common.Pragma = "no-cache";
        $httpProvider.defaults.headers.common["If-Modified-Since"] = "0";
    }]);

    app.config(['$locationProvider', function($locationProvider) {
        $locationProvider.hashPrefix('');
    }]);

    app.run(['$rootScope', '$state', '$stateParams', function ($rootScope, $state, $stateParams) {
      $rootScope.$on('$stateChangeSuccess', function () {
        document.body.scrollTop = document.documentElement.scrollTop = 0;
      });
      $rootScope.$state = $state;
      return $rootScope.$stateParams = $stateParams;
    }]);

    app.config(['$urlRouterProvider', function ($urlRouterProvider) {
        $urlRouterProvider.otherwise('/visit');
    }]);
})()
