'use strict';

angular.module('highline-ui').controller('HighlineDashboardDataController', ['$scope', '$state', '$stateParams', 'HIGHLINE', 'HighlineHttpService', function($scope, $state, $stateParams, HIGHLINE, HighlineHttpService) {

    $scope.rides = {};
    $scope.gruppes = {};
    $scope.friends = {};
    $scope.idSelected = 0;
    $scope.user_id = $scope.$root.user_id;

    // get details for ride selected from list
    $scope.rideDetail = function(id) {

        // set the selected id
        $scope.idSelected = id;

    };

    function getRideInfo() {
        var request = {
            method: 'GET',
            url: 'service/ride/rides/user/' + $scope.user_id
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
            url: 'service/gruppe/user/' + $scope.user_id
        };
        HighlineHttpService.serve(request).then(function(response) {
            //console.log(angular.toJson(response));
            $scope.gruppes = response.data;
        }).catch(function(error) {
            console.log(angular.toJson(error));
        });
    }

    getGruppeInfo();

    function getFriendInfo() {
        var request = {
            method: 'GET',
            url: 'service/friend/' + $scope.user_id
        };
        HighlineHttpService.serve(request).then(function(response) {
            //console.log(angular.toJson(response));
            $scope.friends = response.data;
        }).catch(function(error) {
            console.log(angular.toJson(error));
        });
    }

    getFriendInfo();


}]);

