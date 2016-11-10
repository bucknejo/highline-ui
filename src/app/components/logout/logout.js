'use strict';

angular.module('highline-ui').controller('HighlineLogoutController', ['$scope', '$http', '$log', '$location', '$state', 'HighlineAuthentication', function($scope, $http, $log, $location, $state, HighlineAuthentication) {

    $scope.logout = function() {
        HighlineAuthentication.setAuthenticated(false);
        HighlineAuthentication.setUserId(-1);
        HighlineAuthentication.removeAuthenticationCookie();

        $state.go('login');
    };

    $scope.logout();

}]);