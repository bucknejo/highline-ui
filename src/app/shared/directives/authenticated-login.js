'use strict';

angular.module('highline-ui').directive('authenticatedLogin', [function() {
    return {
        restrict: 'E',
        scope: {
            activity: '='
        },
        templateUrl: 'app/shared/directives/templates/authenticated-login.tpl.html',
        controller: ['$scope', function($scope) {

            $scope.showAuthenticatedMenu = true;

            $scope.root = $scope.$root;

            $scope.showMenu = function() {
                console.log('clicking menu from directive controller!');
                $scope.showAuthenticatedMenu = !$scope.showAuthenticatedMenu;

            };

        }]

    };

}]);

