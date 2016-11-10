'use strict';

angular.module('highline-ui').controller('HighlineAccountController', ['$scope', '$log', '$state', 'HIGHLINE', 'HighlineHttpService', 'HighlineAuthentication', 'User', function ($scope, $log, $state, HIGHLINE, HighlineHttpService, HighlineAuthentication, User) {

    console.log('in HighlineAccountController');
    console.log('HIGHLINE.SERVER: ' + angular.toJson(HIGHLINE.SERVER));
    console.log('HIGHLINE.PORT: ' + angular.toJson(HIGHLINE.PORT));

    if (!HighlineAuthentication.isAuthenticated()) {
        $state.go('login');
    }

    $scope.master = new User();
    $scope.user_id = HighlineAuthentication.getUserId();

    $log.info('UserDetailController: ' + $scope.user_id);
    $scope.test = 'this is a test.';

    $scope.user = User.get({id: $scope.user_id}, function () {
        $scope.master = $scope.user;
        $log.info('master set to first user get');
    });

    $scope.addUser = function () {
        delete $scope.user.id;
        $scope.user.$save(function () {
            $log.info('User [save]: ' + JSON.stringify($scope.user));
        });
    };

    $scope.updateUser = function () {
        $scope.user.$update(function () {
            $log.info('User [update]: ' + JSON.stringify($scope.user));
        });
    };

    $scope.deleteUser = function (form) {
        $scope.user.$delete(function () {
            $log.info('User [delete]: ' + JSON.stringify($scope.user));
            $scope.clear(form);
        });
    };

    $scope.clear = function (form) {
        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }
        $scope.user = new User();
    };

    $scope.reset = function (form) {
        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }
        $scope.user = $scope.master;
    };

    $scope.deletable = function () {
        return $scope.user.id === undefined;
    };

    $scope.addable = function (invalid) {
        return invalid || $scope.user.id !== undefined;
    };

    $scope.updatable = function (invalid) {
        return $scope.user.id === undefined || invalid;
    };

    $scope.editEquipment = function(id) {
        $log.info('edit equipment id: ' + id);
    };

    // select lists
    $scope.skills = [{
        value: 'Beginner',
        text: 'Beginner',
        selected: false
    }, {
        value: 'Intermediate',
        text: 'Intermediate',
        selected: false
    }, {
        value: 'Advanced',
        text: 'Advanced',
        selected: false
    }, {
        value: 'Expert',
        text: 'Expert',
        selected: false
    }];

    $scope.styles = [{
        value: 'Mellow',
        text: 'Mellow',
        selected: false
    }, {
        value: 'Steady',
        text: 'Steady',
        selected: false
    }, {
        value: 'Moderate',
        text: 'Moderate',
        selected: false
    }, {
        value: 'Agressive',
        text: 'Agressive',
        selected: false
    }, {
        value: 'Race',
        text: 'Race',
        selected: false
    }];

    $scope.viewables = [{
        value: 0,
        text: 'Private',
        selected: false
    }, {
        value: 1,
        text: 'Public',
        selected: false
    }];

    $scope.genders = [{
        value: 'M',
        text: 'Male',
        selected: false
    }, {
        value: 'F',
        text: 'Female',
        selected: false
    }, {
        value: 'A',
        text: 'Alien',
        selected: false
    }];


}]);

