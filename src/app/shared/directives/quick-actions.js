'use strict';

angular.module('highline-ui').directive('highlineQuickActions', [function() {
    return {
        restrict: 'E',
        scope: {
            activity: '='
        },
        templateUrl: 'app/shared/directives/templates/quick-actions.tpl.html',
        controller: ['$scope', '$state', '$attrs', function($scope, $state, $attrs) {

            $scope.actions = ['account', 'dashboard', 'friends', 'groups', 'rides'];

            $scope.actionSelected = 0;

            if (angular.isDefined($attrs.action)) {
                $scope.actionSelected = $scope.actions.indexOf($attrs.action);
            }

            $scope.navigateTo = function(action) {
                $state.go(action);
            };

        }]
    };

}]);

