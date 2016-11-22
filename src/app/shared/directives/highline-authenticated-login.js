'use strict';

angular.module('highline-ui').directive('highlineAuthenticatedLogin', [function() {
    return {
        restrict: 'E',
        scope: {
            activity: '='
        },
        templateUrl: 'app/shared/directives/templates/highline-authenticated-login.tpl.html',
        controller: ['$scope', 'HighlineAuthentication', function($scope, HighlineAuthentication) {

            $scope.$watch(function(){return HighlineAuthentication.isAuthenticated();}, function() {
                $scope.authenticated = HighlineAuthentication.isAuthenticated();
            });

        }]

    };

}]);

