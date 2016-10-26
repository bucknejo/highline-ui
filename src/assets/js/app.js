'use strict';

// Declare app level module which depends on views, and components
var highline = angular.module('highline-ui', ['ui.router']);

highline.config(['$stateProvider', function($stateProvider) {

  var helloState = {
    name: 'hello',
    url: '/hello',
    template: '<h3>Hello!</h3>'
  }

  var aboutState = {
    name: 'about',
    url: '/about',
    template: '<h3>This is a UI Router-enabled app!</h3>'
  }

  $stateProvider.state(helloState);
  $stateProvider.state(aboutState);

}]);
