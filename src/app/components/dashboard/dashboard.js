'use strict';

angular.module('highline-ui').controller('HighlineDashboardController', ['$scope', '$log', '$state', 'HighlineAuthentication', function($scope, $log, $state, HighlineAuthentication) {

    if (!HighlineAuthentication.isAuthenticated()) {
        $state.go('login');
    }

    $scope.editAccount = function() {
        $state.go('account');
    };

    $scope.editEquipment = function() {
        $state.go('equipment');
    };

}]);

