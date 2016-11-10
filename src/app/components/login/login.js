'use strict';

angular.module('highline-ui').controller('HighlineLoginController', ['$scope', '$http', '$log', '$location', '$state', 'HIGHLINE', function($scope, $http, $log, $location, $state, HIGHLINE) {

    $scope.master = {
        email: '',
        password: ''
    };

    $scope.user = {
        email: '',
        password: ''
    };

    $scope.request = {
        method: 'POST',
        url: HIGHLINE.SERVER + 'service/login',
        data: $scope.user
    };

    $scope.result = {
        id: 0,
        authenticated: false,
        code: 0,
        message: '',
        error: ''
    };

    $scope.showResult = false;

    // login
    $scope.login = function(form) {

        $log.info('login user: ' + JSON.stringify($scope.request));

        $http($scope.request).then(function success(response) {
            $log.info('success: ' + JSON.stringify(response));

            if (response.data.authenticated) {
                $scope.$root.authenticated = true;
                $scope.$root.user_id = response.data.id;
                $state.go('dashboard', {id: response.data.id});
                $scope.showResult = false;
            } else {
                $scope.result = response.data;
                $scope.showResult = true;
            }

        }, function error(response){
            $log.info('error: ' + JSON.stringify(response));
        });
    };

    // register
    $scope.register = function() {
        $state.go('register');
    };

    // cancel
    $scope.cancel = function() {
        $log.info('cancel logic TBD...');
    };

}]);
