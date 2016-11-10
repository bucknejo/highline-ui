'use strict';

angular.module('highline-ui').controller('HighlineDashboardController', ['$scope', '$log', '$state', '$stateParams', function($scope, $log, $state, $stateParams) {

    var user_id = $stateParams.id;

    if (user_id < 0) {
        $state.go('login');
    }

}]);

