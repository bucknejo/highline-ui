'use strict';

angular.module('highline-ui').directive('authenticatedLogin', [function() {
    return {
        restrict: 'E',
        scope: {
            activity: '='
        },
        templateUrl: 'app/shared/directives/templates/authenticated-login.tpl.html',
        controller: ['$scope', 'HighlineAuthentication', function($scope, HighlineAuthentication) {

            $scope.$watch(function(){return HighlineAuthentication.isAuthenticated();}, function() {
                $scope.authenticated = HighlineAuthentication.isAuthenticated();
            });

        }]

    };

}]);

