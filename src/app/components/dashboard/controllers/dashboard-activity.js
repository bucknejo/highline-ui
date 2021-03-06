'use strict';

angular.module('highline-ui').controller('HighlineDashboardActivityController', ['$scope', '$state', '$stateParams', 'HIGHLINE', 'HighlineHttpService', 'HighlineAuthentication', 'uibDateParser', '$filter', function($scope, $state, $stateParams, HIGHLINE, HighlineHttpService, HighlineAuthentication, uibDateParser, $filter) {

    $scope.activities = {};
    $scope.idSelected = 0;
    $scope.user_id = HighlineAuthentication.getUserId();

    // get details for ride selected from list
    $scope.activityDetail = function(id) {

        // set the selected id
        $scope.idSelected = id;

    };

    $scope.parseDateTime = function(date, type) {

        var format = 'yyyy-MM-dd HH:mm:ss.s';
        var d = uibDateParser.parse(date, format);

        var s = '';

        switch(type) {
            case 'date':
                s = $filter('date')(d, 'yyyy-MM-dd');
                break;
            case 'time':
                s = $filter('date')(d, 'HH:mm:ss');
                break;
            default:
                s = 'n/a';
                break;
        }

        return s;

    };

    function getActivityInfo() {
        var request = {
            method: 'GET',
            url: 'service/activity/user/' + $scope.user_id
        };
        HighlineHttpService.serve(request).then(function(response) {
            //console.log(angular.toJson(response));
            $scope.activities = response.data;
        }).catch(function(error) {
            console.log(angular.toJson(error));
        });
    }

    getActivityInfo();

}]);

