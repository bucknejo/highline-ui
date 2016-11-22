'use strict';

angular.module('highline-ui').directive('highlineActivityType', [function() {
    return {
        restrict: 'E',
        scope: {
            activity: '='
        },
        templateUrl: 'app/shared/directives/templates/highline-activity-type.tpl.html'
    };

}]);

