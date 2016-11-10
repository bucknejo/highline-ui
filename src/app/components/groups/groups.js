'use strict';

angular.module('highline-ui').controller('HighlineGroupsController', ['$scope', '$state', '$http', 'HIGHLINE', 'Gruppe', 'GruppeMember', '$log', '$filter', '$uibModal', 'HighlineAuthentication', function($scope, $state, $http, HIGHLINE, Gruppe, GruppeMember, $log, $filter, $uibModal, HighlineAuthentication) {

    // initialization
    $scope.debug = true;
    $scope.gruppe = new Gruppe();
    $scope.friends = [];
    $scope.user_id = HighlineAuthentication.getUserId();

    // drop down list items
    $scope.types = [{
        value: 0,
        text: 'Private',
        selected: false
    }, {
        value: 1,
        text: 'Public',
        selected: false
    }];

    $scope.yns = [{
        value: 0,
        text: 'No',
        selected: false
    }, {
        value: 1,
        text: 'Yes',
        selected: false
    }];

    // get gruppes by user
    $scope.getGruppesByUser = function() {

        var request = {
            method: 'GET',
            url: HIGHLINE.SERVER + 'service/gruppe/user/' + $scope.user_id
        };

        $http(request).then(function success(response) {
            $scope.gruppes = response.data;
        }, function error(response) {
            $log.info('error getting gruppes by user: ' + JSON.stringify(response));
        });
    };

    // get available friends that can be added to a particular gruppe
    $scope.getAvailableFriendsForGruppe = function() {

        var request = {
            method: 'GET',
            url: HIGHLINE.SERVER + 'service/friend/' + $scope.user_id + '/gruppe/' + $scope.gruppe.id
        };

        if ($scope.gruppe.id) {
            $http(request).then(function success(response) {
                $scope.friends = response.data;
            }, function error(response) {
                $log.info('error getting friends by user: ' + JSON.stringify(response));
            });
        } else {
            $scope.friends = [];
        }
    };

    // call server for latest gruppes and friends
    $scope.refresh = function() {
        $scope.getGruppesByUser();
        $scope.getAvailableFriendsForGruppe();
    };
    $scope.refresh();

    // get details for gruppe selected from list
    $scope.idSelected = null;
    $scope.gruppeDetail = function(id) {
        $log.info('in gruppe detail: ' + id);
        $scope.idSelected = id;

        // set the current gruppe in scope
        $scope.setCurrentGruppe(id);

        // call server for new friends
        $scope.getAvailableFriendsForGruppe();
    };

    $scope.setCurrentGruppe = function(id) {
        var gruppe = $filter('filter')($scope.gruppes, {id: id})[0];
        $scope.gruppe = new Gruppe();
        angular.extend($scope.gruppe, gruppe);
    };

    // start of crud operations
    $scope.addGruppe = function() {
        $scope.gruppe.user_id = $scope.user_id;
        $scope.gruppe.$save(function success(){
            $scope.refresh();
        }, function error(response) {
            $log.info('error running save on Gruppe: ' + JSON.stringify(response));
        });
    };

    $scope.updateGruppe = function() {
        $log.info('updating gruppe');
        $scope.gruppe.$update(function success(){
            $scope.refresh();
        }, function error(response) {
            $log.info('error running update on Gruppe: ' + JSON.stringify(response));
        });
    };

    $scope.deleteGruppe = function(form) {
        $scope.gruppe.$delete(function success(){
            $scope.getGruppesByUser();
            $scope.clear(form);
        }, function error(response) {
            $log.info('error running delete on Gruppe: ' + JSON.stringify(response));
        });
    };

    $scope.clear = function(form) {
        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }
        $scope.gruppe = new Gruppe();
        $scope.friends = [];
    };

    $scope.reset = function(form) {
        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }
        $scope.gruppe = new Gruppe();
        $scope.friends = [];
    };

    // functions to allow crud operations
    $scope.deletable = function() {
        return $scope.gruppe.id === undefined;
    };

    $scope.addable = function(invalid) {
        return $scope.gruppe.id !== undefined || invalid;
    };

    $scope.updatable = function(invalid) {
        return $scope.gruppe.id === undefined || invalid;
    };

    // functions for quick actions (list item add/remove)
    $scope.addMember = function(user_id) {

        var gruppe_id = $scope.gruppe.id;

        var gruppeMember = new GruppeMember();
        gruppeMember.gruppe_id = gruppe_id;
        gruppeMember.user_id = user_id;
        gruppeMember.role = '';

        gruppeMember.$save(function success() {
            $scope.refresh();
            $scope.gruppe = Gruppe.get({id: gruppe_id}, function success(){

            }, function error(response){

            });
        }, function error(response){
            $log.info('error running get on GruppeMember: ' + JSON.stringify(response));
        });

    };

    $scope.removeMember = function(user_id) {

        var gruppe_id = $scope.gruppe.id;

        var request = {
            id: 0,
            gruppe_id: $scope.gruppe.id,
            user_id: user_id
        };

        var gruppeMember = GruppeMember.remove(request, function success(){
            $scope.refresh();
            $scope.gruppe = Gruppe.get({id: gruppe_id}, function success(){

            }, function error(response){

            });
        }, function error(response) {
            $log.info('error running get on GruppeMember: ' + JSON.stringify(response));
        });

    };

    $scope.removeGruppe = function(id, form) {
        $log.info('remove gruppe: ' + id);
        $scope.setCurrentGruppe(id);
        $scope.deleteGruppe(form);
    };

    // modal configuration
    $scope.animationsEnabled = true;
    $scope.confirm = function(size) {

        var confirm = $uibModal.open({
            animation: $scope.animationsEnabled,
            templateUrl: 'gruppeConfirm.html',
            controller: 'GruppeModalInstanceController',
            size: size,
            resolve: {
            }

        });

        confirm.result.then(function () {
            // TODO do something here
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });


    };

}]);

angular.module('highline-ui').controller('GruppeModalInstanceController', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {

    $scope.ok = function () {
        $uibModalInstance.close();
    };

    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}]);

