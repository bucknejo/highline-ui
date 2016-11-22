'use strict';

angular.module('highline-ui').directive('highlinePolarHelper', [function() {
    return {
        restrict: 'E',
        scope: {
            polar: '=polar',
            type: '=type'
        },
        templateUrl: 'app/shared/directives/templates/highline-polar-helper.tpl.html',
        controller: ['$scope', '$attrs', function($scope, $attrs) {
        }]
    };
}]);
