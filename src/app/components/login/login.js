'use strict';

angular.module('highline-ui').controller('HighlineLoginController', ['$scope', '$http', '$log', '$location', '$state', 'HIGHLINE', 'HighlineAuthentication', function($scope, $http, $log, $location, $state, HIGHLINE, HighlineAuthentication) {

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
        url: HIGHLINE.SERVER.RESOURCE + 'service/login',
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

        var _authCookie = HighlineAuthentication.getAuthenticationCookie() || "";

        $log.info('authentication cookie: ' + angular.toJson(_authCookie));

        if (_authCookie && _authCookie.authenticated && _authCookie.user_id > 0) {
            HighlineAuthentication.setAuthenticated(_authCookie.authenticated);
            HighlineAuthentication.setUserId(_authCookie.user_id);
            HighlineAuthentication.setAuthenticationCookie();
            $state.go('dashboard');
        } else {
            $http($scope.request).then(function success(response) {
                $log.info('success: ' + JSON.stringify(response));

                if (response.data.authenticated) {
                    HighlineAuthentication.setAuthenticated(true);
                    HighlineAuthentication.setUserId(response.data.id);
                    HighlineAuthentication.setAuthenticationCookie();
                    $state.go('dashboard');
                    $scope.showResult = false;
                } else {
                    $scope.result = response.data;
                    $scope.showResult = true;
                }

            }, function error(response){
                $log.info('error: ' + JSON.stringify(response));
            });
        }

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
