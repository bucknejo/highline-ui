'use strict';

angular.module('highline-ui')
    .controller('HighlineDashboardDataController',
        ['$scope', 'HIGHLINE', 'HighlineHttpService', function($scope, HIGHLINE, HighlineHttpService) {

    $scope.rides = {};
    $scope.gruppes = {};
    $scope.idSelected = 0;

    // get details for ride selected from list
    $scope.rideDetail = function(id) {

        // set the selected id
        $scope.idSelected = id;

    };

    function getRideInfo() {
        var request = {
            method: 'GET',
            url: 'service/ride/rides/user/1'
        };
        HighlineHttpService.serve(request).then(function(response) {
            //console.log(angular.toJson(response));
            $scope.rides = response.data;
        }).catch(function(error) {
            console.log(angular.toJson(error));
        });
    }

    getRideInfo();

    function getGruppeInfo() {
        var request = {
            method: 'GET',
            url: 'service/gruppe/user/1'
        };
        HighlineHttpService.serve(request).then(function(response) {
            //console.log(angular.toJson(response));
            $scope.gruppes = response.data;
        }).catch(function(error) {
            console.log(angular.toJson(error));
        });
    }

    getGruppeInfo();

}]);

