'use strict';

angular.module('highline-ui').controller('HighlineLoginController', ['$scope', '$http', '$log', '$location', function($scope, $http, $log, $location) {

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
        url: '/highline/service/login/',
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
                $location.path('/users/detail/' + response.data.id);
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
        $location.path('/register');
    };

    // cancel
    $scope.cancel = function() {
        $log.info('cancel logic TBD...');
    };

}]);
