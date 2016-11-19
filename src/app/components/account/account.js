'use strict';

angular.module('highline-ui').controller('HighlineAccountController', ['$rootScope', '$scope', '$log', '$state', 'HIGHLINE', 'HighlineHttpService', 'HighlineAuthentication', 'HighlineApplicationConstants', 'User', function ($rootScope, $scope, $log, $state, HIGHLINE, HighlineHttpService, HighlineAuthentication, HighlineApplicationConstants, User) {

    if (!HighlineAuthentication.isAuthenticated()) {
        $state.go('login');
    }

    $scope.debug = false;
    $scope.master = new User();
    $scope.user = new User();
    $scope.user_id = HighlineAuthentication.getUserId();

    var getUser = function() {
        $scope.user = User.get({id: $scope.user_id}, function () {
            $scope.master = angular.copy($scope.user);
        });
    };

    getUser();

    $rootScope.$on(HIGHLINE.EVENTS.USER, function() {
        getUser();
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

    $scope.resetUser = function (form) {
        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }
        $scope.user = angular.copy($scope.master);
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
        $state.go('equipment', {"id": id});
    };

    $scope.editAddress = function(id) {
        $log.info('edit address id: ' + id);
        $state.go('address', {"id": id});
    };

    // select lists
    $scope.skills = HighlineApplicationConstants.OPTIONS.ACCOUNT.SKILLS;
    $scope.styles = HighlineApplicationConstants.OPTIONS.ACCOUNT.STYLES;
    $scope.viewables = HighlineApplicationConstants.OPTIONS.ACCOUNT.ACCESS;
    $scope.genders = HighlineApplicationConstants.OPTIONS.ACCOUNT.GENDERS;

}]);

