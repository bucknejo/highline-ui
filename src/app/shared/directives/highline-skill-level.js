'use strict';

angular.module('highline-ui').directive('highlineSkillLevel', [function() {
    return {
        restrict: 'E',
        scope: {
            skill: '='
        },
        templateUrl: 'app/shared/directives/templates/highline-skill-level.tpl.html',
        controller: ['$scope', '$attrs', function($scope, $attrs) {
        }]
    };
}]);
