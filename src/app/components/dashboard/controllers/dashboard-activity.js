'use strict';

angular.module('highline-ui')
    .controller('HighlineDashboardActivityController',
        ['$scope', 'HIGHLINE', 'HighlineHttpService', function($scope, HIGHLINE, HighlineHttpService) {

    $scope.rides = {};
    $scope.idSelected = 0;

    // get details for ride selected from list
    $scope.rideDetail = function(id) {

        // set the selected id
        $scope.idSelected = id;

    };


    function getRideInfo() {
        var request = {
            method: 'GET',
            url: 'service/ride/activity/user/1'
        };
        HighlineHttpService.serve(request).then(function(response) {
            console.log(angular.toJson(response));
            $scope.rides = response.data;
        }).catch(function(error) {
            console.log(angular.toJson(error));
        });
    }

    getRideInfo();

}]);

