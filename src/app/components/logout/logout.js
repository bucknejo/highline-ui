'use strict';

angular.module('highline-ui').controller('HighlineLogoutController', ['$scope', '$http', '$log', '$location', '$state', function($scope, $http, $log, $location, $state) {

    $scope.logout = function() {
        $scope.$root.authenticated = false;
        $scope.$root.user_id = -1;
        $state.go('login');
    };

    $scope.logout();

}]);