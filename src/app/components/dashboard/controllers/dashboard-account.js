'use strict';

angular.module('highline-ui')
    .controller('HighlineDashboardAccountController',
        ['$scope', 'HIGHLINE', 'HighlineHttpService', function($scope, HIGHLINE, HighlineHttpService) {

    $scope.user = {};

    function getUserInfo() {
        var request = {
            method: 'GET',
            url: 'service/user/1'
        };
        HighlineHttpService.serve(request).then(function(response) {
            //console.log(angular.toJson(response));
            $scope.user = response.data;
        }).catch(function(error) {
            console.log(angular.toJson(error));
        });
    }

    getUserInfo();

}]);

