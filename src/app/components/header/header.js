'use strict';

angular.module('highline-ui').controller('HighlineHeaderController', ['$scope', function($scope){

    console.log('in HighlineHeaderController, yeah!');
    $scope.root = $scope.$root;
    $scope.loggedIn = $scope.root.loggedIn;

}]);

angular.module('highline-ui').component('highlineHeader', {
    templateUrl: 'app/components/header/header.tpl.html',
    controller: 'HighlineHeaderController',
    bindings: {}
});