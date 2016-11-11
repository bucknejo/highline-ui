'use strict';

angular.module('highline-ui').controller('HighlineEquipmentController', ['$scope', '$log', '$state', '$stateParams', 'HIGHLINE', 'HighlineHttpService', 'HighlineAuthentication', 'HighlineApplicationConstants', 'Equipment', function ($scope, $log, $state, $stateParams, HIGHLINE, HighlineHttpService, HighlineAuthentication, HighlineApplicationConstants, Equipment) {

    $scope.equipment_id = $stateParams.id;
    $scope.user_id = HighlineAuthentication.getUserId();
    $scope.master = new Equipment();

    $scope.equipment = Equipment.getByUser({id: $scope.equipment_id, user_id: $scope.user_id}, function () {
        $scope.master = $scope.equipment;
        $log.info('master set to first equipment get');
    });

    $scope.addEquipment = function () {
        delete $scope.equipment.id;
        $scope.equipment.$save(function () {
            $log.info('Equipment [save]: ' + JSON.stringify($scope.equipment));
        });
    };

    $scope.updateEquipment = function () {
        $scope.equipment.$update(function () {
            $log.info('Equipment [update]: ' + JSON.stringify($scope.equipment));
        });
    };

    $scope.deleteEquipment = function (form) {
        $scope.equipment.$delete(function () {
            $log.info('Equipment [delete]: ' + JSON.stringify($scope.equipment));
            $scope.clear(form);
        });
    };

    $scope.clear = function (form) {
        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }
        $scope.equipment = new Equipment();
    };

    $scope.reset = function (form) {
        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }
        $scope.equipment = $scope.master;
    };

    $scope.deletable = function () {
        return $scope.equipment.id === undefined;
    };

    $scope.addable = function (invalid) {
        return invalid || $scope.equipment.id !== undefined;
    };

    $scope.updatable = function (invalid) {
        return $scope.equipment.id === undefined || invalid;
    };

}]);
