'use strict';

angular.module('highline-ui')
    .controller('HighlineDashboardActivityController',
        ['$scope', 'HIGHLINE', 'HighlineHttpService', 'uibDateParser', '$filter', function($scope, HIGHLINE, HighlineHttpService, uibDateParser, $filter) {

    $scope.activities = {};
    $scope.idSelected = 0;

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
            url: 'service/activity/user/1'
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

