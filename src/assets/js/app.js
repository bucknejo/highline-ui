'use strict';

// Declare app level module
var highline = angular.module('highline-ui', ['ui.router', 'ui.bootstrap', 'ngMessages', 'ngResource', 'ngCookies']);

// Declare app level contants
highline.constant("HIGHLINE", {
  "SERVER": "http://localhost:8091/highline/",
  "PORT": "8091",
  "TEST": "test"
});

// Declare app level states
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
      'left@login': {
        templateUrl: 'app/shared/templates/alley-left.tpl.html'
      },
      'right@login': {
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
      'left@dashboard': {
        templateUrl: 'app/components/dashboard/templates/dashboard-alley-left.tpl.html'
      },
      'activity@dashboard': {
        templateUrl: 'app/components/dashboard/templates/dashboard-activity.tpl.html',
        controller: 'HighlineDashboardActivityController'
      },
      'account@dashboard': {
        templateUrl: 'app/components/dashboard/templates/dashboard-account.tpl.html',
        controller: 'HighlineDashboardAccountController'
      },
      'data@dashboard': {
        templateUrl: 'app/components/dashboard/templates/dashboard-data.tpl.html',
        controller: 'HighlineDashboardDataController'
      },
      'right@dashboard': {
        templateUrl: 'app/components/dashboard/templates/dashboard-alley-right.tpl.html'
      }
    },
    onEnter: function() {

    }
  };

  var account = {
    name: 'account',
    url: '/account',
    views: {
      '': {
        templateUrl: 'app/components/account/account.tpl.html',
        controller: 'HighlineAccountController'
      },
      'left@account': {
        templateUrl: 'app/components/account/templates/account-alley-left.tpl.html'
      },
      'right@account': {
        templateUrl: 'app/components/account/templates/account-alley-right.tpl.html'
      }
    }

  };

  var friends = {
    name: 'friends',
    url: '/friends',
    views: {
      '': {
        templateUrl: 'app/components/friends/friends.tpl.html',
        controller: 'HighlineFriendsController'
      },
      'left@friends': {
        templateUrl: 'app/components/friends/templates/friends-alley-left.tpl.html'
      },
      'right@friends': {
        templateUrl: 'app/components/friends/templates/friends-alley-right.tpl.html'
      }
    }
  };

  var groups = {
    name: 'groups',
    url: '/groups',
    views: {
      '': {
        templateUrl: 'app/components/groups/groups.tpl.html',
        controller: 'HighlineGroupsController'
      },
      'left@groups': {
        templateUrl: 'app/components/groups/templates/groups-alley-left.tpl.html'
      },
      'right@groups': {
        templateUrl: 'app/components/groups/templates/groups-alley-right.tpl.html'
      }
    }
  };

  var rides = {
    name: 'rides',
    url: '/rides',
    views: {
      '': {
        templateUrl: 'app/components/rides/rides.tpl.html',
        controller: 'HighlineRidesController'
      },
      'left@rides': {
        templateUrl: 'app/components/rides/templates/rides-alley-left.tpl.html'
      },
      'right@rides': {
        templateUrl: 'app/components/rides/templates/rides-alley-right.tpl.html'
      }
    }
  };

  var logout = {
    name: 'logout',
    url: '/logout',
    templateUrl: 'app/components/logout/logout.tpl.html',
    controller: 'HighlineLogoutController'
  };

  $stateProvider.state(home);
  $stateProvider.state(login);
  $stateProvider.state(dashboard);
  $stateProvider.state(account);
  $stateProvider.state(friends);
  $stateProvider.state(groups);
  $stateProvider.state(rides);
  $stateProvider.state(logout);

  $urlRouterProvider.otherwise('/');

}]);

// Declare app level root objects
highline.run(function($rootScope) {

});
