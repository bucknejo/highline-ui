'use strict';

angular.module('highline-ui').controller('HighlineDashboardAccountController', ['$scope', '$state', 'HIGHLINE', 'HighlineHttpService', function($scope, $state, HIGHLINE, HighlineHttpService) {

    $scope.user = {};
    $scope.user_id = $scope.$root.user_id;

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

