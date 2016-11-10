'use strict';

angular.module('highline-ui').controller('HighlineDashboardAccountController', ['$scope', '$state', 'HIGHLINE', 'HighlineHttpService', 'HighlineAuthentication', function($scope, $state, HIGHLINE, HighlineHttpService, HighlineAuthentication) {

    if (!HighlineAuthentication.isAuthenticated()) {
        $state.go('login');
    }

    $scope.user = {};
    $scope.user_id = HighlineAuthentication.getUserId();

    function getUserInfo() {
        var request = {
            method: 'GET',
            url: 'service/user/' + $scope.user_id
        };
        HighlineHttpService.serve(request).then(function(response) {
            $scope.user = response.data;
        }).catch(function(error) {
            console.log(angular.toJson(error));
        });
    }

    getUserInfo();

}]);

