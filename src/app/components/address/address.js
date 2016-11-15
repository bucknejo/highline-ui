'use strict';

angular.module('highline-ui').controller('HighlineAddressController', ['$scope', '$log', '$state', '$stateParams', 'HIGHLINE', 'HighlineHttpService', 'HighlineAuthentication', 'HighlineApplicationConstants', 'Address', function ($scope, $log, $state, $stateParams, HIGHLINE, HighlineHttpService, HighlineAuthentication, HighlineApplicationConstants, Address) {

    $scope.states = HighlineApplicationConstants.OPTIONS.STATE;

    $scope.address_id = $stateParams.id;
    $scope.user_id = HighlineAuthentication.getUserId();
    $scope.master = new Address();

    $scope.address = Address.getByUser({id: $scope.address_id, user_id: $scope.user_id}, function () {
        $scope.master = $scope.address;
        $log.info('master set to first address get');
    });

    $scope.addAddress = function () {
        delete $scope.address.id;
        $scope.address.$save(function () {
            $log.info('Address [save]: ' + JSON.stringify($scope.address));
        });
    };

    $scope.updateAddress = function () {
        $scope.address.$update(function () {
            $log.info('Address [update]: ' + JSON.stringify($scope.address));
        });
    };

    $scope.deleteAddress = function (form) {
        $scope.address.$delete(function () {
            $log.info('Address [delete]: ' + JSON.stringify($scope.address));
            $scope.clear(form);
        });
    };


    $scope.clear = function (form) {
        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }
        $scope.address = new Address();
    };

    $scope.reset = function (form) {
        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }
        $scope.address = $scope.master;
    };

    $scope.deletable = function () {
        return $scope.address.id === undefined;
    };

    $scope.addable = function (invalid) {
        return invalid || $scope.address.id !== undefined;
    };

    $scope.updatable = function (invalid) {
        return $scope.address.id === undefined || invalid;
    };


}]);
