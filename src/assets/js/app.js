'use strict';

// Declare app level module
var highline = angular.module('highline-ui', ['ui.router', 'ui.bootstrap', 'ngMessages', 'ngResource', 'ngCookies', 'ngAnimate', 'highline-ui-services']);

// Declare app level contants
highline.constant("HIGHLINE", {
  "SERVER": {
    "RESOURCE": "http://localhost:8091/highline/"
  },
  "EVENTS": {
    "USER": "USER_CHANGED_EVENT",
    "FORM_SUCCESS_USER": "FORM_UPDATE_SUCCESS_EVENT_USER",
    "FORM_SUCCESS_GROUP": "FORM_UPDATE_SUCCESS_EVENT_GROUP"
  }
});

// Declare app level states
highline.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', function($stateProvider, $urlRouterProvider, $httpProvider) {

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

  var address = {
    name: 'address',
    url: '/address/:id',
    views: {
      '': {
        templateUrl: 'app/components/address/address.tpl.html',
        controller: 'HighlineAddressController'
      },
      'left@address': {
        templateUrl: 'app/components/address/templates/address-alley-left.tpl.html'
      },
      'right@address': {
        templateUrl: 'app/components/address/templates/address-alley-right.tpl.html'
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

  var equipment =  {
    name: 'equipment',
    url: '/equipment/:id',
    views: {
      '': {
        templateUrl: 'app/components/equipment/equipment.tpl.html',
        controller: 'HighlineEquipmentController'
      },
      'left@equipment': {
        templateUrl: 'app/components/equipment/templates/equipment-alley-left.tpl.html'
      },
      'right@equipment': {
        templateUrl: 'app/components/equipment/templates/equipment-alley-right.tpl.html'
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

  var logout = {
    name: 'logout',
    url: '/logout',
    templateUrl: 'app/components/logout/logout.tpl.html',
    controller: 'HighlineLogoutController'
  };

  var profile = {
    name: 'profile',
    url: '/profile',
    views: {
      '': {
        templateUrl: 'app/components/profile/profile.tpl.html',
        controller: 'HighlineProfileController'
      },
      'left@profile': {
        templateUrl: 'app/components/profile/templates/profile-alley-left.tpl.html'
      },
      'right@profile': {
        templateUrl: 'app/components/profile/templates/profile-alley-right.tpl.html'
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

  var sandbox = {
    name: 'sandbox',
    url: '/sandbox',
    views: {
      '': {
        templateUrl: 'app/components/sandbox/sandbox.tpl.html',
        controller: 'HighlineSandboxController'
      },
      'left@sandbox': {
        templateUrl: 'app/components/sandbox/templates/sandbox-alley-left.tpl.html'
      },
      'right@sandbox': {
        templateUrl: 'app/components/sandbox/templates/sandbox-alley-right.tpl.html'
      }
    }

  };

  $stateProvider.state(account);
  $stateProvider.state(address);
  $stateProvider.state(dashboard);
  $stateProvider.state(equipment);
  $stateProvider.state(friends);
  $stateProvider.state(groups);
  $stateProvider.state(home);
  $stateProvider.state(login);
  $stateProvider.state(logout);
  $stateProvider.state(profile);
  $stateProvider.state(rides);
  $stateProvider.state(sandbox);

  $urlRouterProvider.otherwise('/');

  //delete $httpProvider.defaults.headers.common["X-Requested-With"];
  //$httpProvider.defaults.useXDomain = true;
  //delete $httpProvider.defaults.headers.common['X-Requested-With'];

  /*
  pluploadOptionProvider.setOptions({
    runtimes: 'html5,flash,silverlight,html4',
    flash_swf_url: 'assets/libs/plupload/js/Moxie.swf',
    silverlight_xap_url: 'assets/libs/plupload/js/Moxie.xap',
    max_file_size: '10mb'
  });
  */

}]);

// Declare app level root objects
highline.run(function($rootScope) {



});
