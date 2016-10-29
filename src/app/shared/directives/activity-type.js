'use strict';

angular.module('highline-ui').directive('activityType', [function() {
    return {
        restrict: 'E',
        scope: {
            activity: '='
        },
        templateUrl: 'app/shared/directives/templates/activity-type.tpl.html'
    };

}]);

