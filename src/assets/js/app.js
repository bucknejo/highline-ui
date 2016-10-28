'use strict';

// Declare app level module which depends on views, and components
var highline = angular.module('highline-ui', ['ui.router', 'ui.bootstrap', 'ngMessages', 'ngResource']);

highline.constant("HIGHLINE", {
  "SERVER": "http://localhost:8091/highline/",
  "PORT": "8091",
  "TEST": "test"
});

highline.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

  var home = {
    name: 'home',
    url: '/',
    templateUrl: 'app/components/home/home.tpl.html',
    controller: 'HighlineHomeController'
  };

  var login = {
    name: 'login',
    url: '/login',
    views: {
      '': {
        templateUrl: 'app/components/login/login.tpl.html',
        controller: 'HighlineLoginController'
      },
      'hlAlleyLeft@login': {
        templateUrl: 'app/shared/templates/alley-left.tpl.html'
      },
      'hlAlleyRight@login': {
        templateUrl: 'app/shared/templates/alley-right.tpl.html'
      }
    }
  };

  var dashboard = {
    name: 'dashboard',
    url: '/dashboard',
    views: {
      '': {
        templateUrl: 'app/components/dashboard/dashboard.tpl.html',
        controller: 'HighlineDashboardController'
      },
      'hlAlleyLeft@dashboard': {
        templateUrl: 'app/components/dashboard/templates/dashboard-alley-left.tpl.html'
      },
      'hlActivity@dashboard': {
        templateUrl: 'app/components/dashboard/templates/dashboard-activity.tpl.html',
        controller: 'HighlineDashboardActivityController'
      },
      'hlAccount@dashboard': {
        templateUrl: 'app/components/dashboard/templates/dashboard-account.tpl.html',
        controller: 'HighlineDashboardAccountController'
      },
      'hlData@dashboard': {
        templateUrl: 'app/components/dashboard/templates/dashboard-data.tpl.html'
      },
      'hlAlleyRight@dashboard': {
        templateUrl: 'app/components/dashboard/templates/dashboard-alley-right.tpl.html'
      }
    }
  };

  $stateProvider.state(home);
  $stateProvider.state(login);
  $stateProvider.state(dashboard);

  $urlRouterProvider.otherwise('/');

}]);
