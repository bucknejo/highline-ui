'use strict';

angular.module('highline-ui').controller('HighlineEquipmentController', ['$scope', '$log', '$state', '$stateParams', 'HIGHLINE', 'HighlineHttpService', 'HighlineAuthentication', 'HighlineApplicationConstants', 'Equipment', function($scope, $log, $state, $stateParams, HIGHLINE, HighlineHttpService, HighlineAuthentication, HighlineApplicationConstants, Equipment) {

    $log.info('in HighlineEquipmentController...');

    $scope.debug = false;
    $scope.equipment_id = $stateParams.id;
    $scope.user_id = HighlineAuthentication.getUserId();
    $scope.master = new Equipment();

    $scope.states = HighlineApplicationConstants.OPTIONS.STATE;

    $scope.types = HighlineApplicationConstants.OPTIONS.EQUIPMENT.TYPES;
    $scope.styles = HighlineApplicationConstants.OPTIONS.EQUIPMENT.STYLES;
    $scope.makes = HighlineApplicationConstants.OPTIONS.EQUIPMENT.MAKES;
    $scope.years = HighlineApplicationConstants.OPTIONS.EQUIPMENT.YEARS;

    $log.info('types: ' + angular.toJson($scope.types));
    $log.info('styles: ' + angular.toJson($scope.styles));
    $log.info('makes: ' + angular.toJson($scope.makes));
    $log.info('years: ' + angular.toJson($scope.years));

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
