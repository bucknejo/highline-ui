'use strict';

angular.module('highline-ui').controller('HighlineProfileController', ['$rootScope', '$scope', '$state', '$http', '$filter', 'HIGHLINE', 'HighlineAuthentication', 'User', function($rootScope, $scope, $state, $http, $filter, HIGHLINE, HighlineAuthentication, User) {

    // need user info
    $scope.debug = false;
    $scope.master = new User();
    $scope.user = new User();
    $scope.user_id = HighlineAuthentication.getUserId();
    $scope.location = {};

    var getUser = function() {
        $scope.user = User.get({id: $scope.user_id}, function () {
            $scope.location = $filter('filter')($scope.user.addresses, {rank: 1})[0];
            $scope.master = angular.copy($scope.user);
        });
    };

    getUser();


}]);