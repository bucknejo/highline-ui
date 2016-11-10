'use strict';

angular.module('highline-ui').directive('authenticatedLogin', [function() {
    return {
        restrict: 'E',
        scope: {
            activity: '='
        },
        templateUrl: 'app/shared/directives/templates/authenticated-login.tpl.html',
        controller: ['$scope', function($scope) {

            $scope.$watch('$root.authenticated', function() {
                $scope.authenticated = $scope.$root.authenticated;
            });

        }]

    };

}]);

