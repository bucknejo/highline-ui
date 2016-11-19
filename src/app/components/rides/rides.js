'use strict';

angular.module('highline-ui').controller('HighlineRidesController', ['$scope', '$state', '$http', '$log', '$filter', '$uibModal', 'HIGHLINE', 'Ride', 'Location', 'Address', 'Gruppe', 'HighlineAuthentication', 'HighlineApplicationConstants', function($scope, $state, $http, $log, $filter, $uibModal, HIGHLINE, Ride, Location, Address, Gruppe, HighlineAuthentication, HighlineApplicationConstants) {

    $scope.debug = false;
    $scope.rides = Ride.query();
    $scope.ride = new Ride();
    $scope.user_id = HighlineAuthentication.getUserId();
    $scope.current = new Ride();

    $scope.rides = [];
    $scope.gruppes = [];
    $scope.friends = [];
    $scope.locations = [];

    $scope.idSelected = 0;

    $scope.statii = HighlineApplicationConstants.OPTIONS.RIDE.STATII;
    $scope.yns = HighlineApplicationConstants.OPTIONS.RIDE.YNS;
    $scope.tempos = HighlineApplicationConstants.OPTIONS.RIDE.TEMPOS;
    $scope.availability = HighlineApplicationConstants.OPTIONS.RIDE.ACCESS;

    $scope.getRidesByUser = function() {
        Ride.retrieve({id: 0, user_id: $scope.user_id}, function success(response) {
            $scope.rides = [];
            $scope.rides = response;
            $scope.rideDetail($scope.idSelected);
        }, function error(response) {
            $log.info('exception getting rides by user: ' + JSON.stringify(response));
        });
    };

    $scope.getRidesByUser();

    $scope.locs = Location.retrieve({id: 0, state: 'NJ'}, function success(){

        for (var i=0; i < $scope.locs.length; i++) {
            $scope.locations.push({
                value: $scope.locs[i].id,
                text: $scope.locs[i].name,
                selected: false
            });
        }

    }, function error(response){
        $log.error('exception processing location retrieve: ' + JSON.stringify(response));
    });

    $scope.addresses = [];
    $scope.getAddressesByLocation = function() {

        $scope.addrs = Address.retrieve({id: 0, location_id: $scope.ride.location_id}, function success(){

            // clear addresses
            $scope.addresses = [];

            for (var i=0; i < $scope.addrs.length; i++) {
                $scope.addresses.push({
                    value: $scope.addrs[i].id,
                    text: $scope.addrs[i].description,
                    selected: false
                });
            }

        }, function error(response) {
            $log.error('exception processing address retrieve: ' + JSON.stringify(response));
        });

    };

    $scope.getAddressesByLocation();

    $scope.getGruppesByUser = function() {

        var request = {
            method: 'GET',
            url: HIGHLINE.SERVER.RESOURCE + 'service/gruppe/user/' + $scope.user_id
        };

        $http(request).then(function success(response) {
            $scope.gruppes = response.data;
        }, function error(response) {
            $log.info('error getting gruppes by user: ' + JSON.stringify(response));
        });
    };

    $scope.getGruppesByUser();

    $scope.rm = {
        template: 'rm.html'
    };

    function disabled(data) {
        var date = data.date,
            mode = data.mode;
        return mode === 'day' && (date.getDay() === 0 || date.getDay() === 6);
    }

    $scope.dt = {
        state: false,
        format: 'yyyy-MM-dd',
        date: new Date(),
        altInputFormats:['M!/d!/yyyy'],
        open: function() {
            this.state = true;
        },
        dateOptions: {
            //dateDisabled: disabled,
            formatYear: 'yy',
            maxDate: new Date(2020, 5, 22),
            minDate: new Date(),
            startingDay: 1
        }
    };

    $scope.tm = {
        content: 'Select a time',
        hstep: 1,
        mstep: 15,
        ismeridian: true,
        template: 'tm.html',
        mytime: new Date().setHours(12, 0, 0, 0),
        changed: function () {
            $log.info('changing time!');
            $scope.ride.time = $filter('date')(this.mytime, 'hh:mm a');
            $log.info('ride.time: ' + this.mytime);
        }
    };

    $scope.getAvailableFriendsForRide = function() {

        var request = {
            method: 'GET',
            url: HIGHLINE.SERVER.RESOURCE + 'service/friend/' + $scope.user_id + '/ride/' + $scope.ride.id
        };

        if ($scope.ride.id) {
            $http(request).then(function success(response) {
                $scope.friends = response.data;
            }, function error(response) {
                $log.info('error getting friends by ride: ' + JSON.stringify(response));
            });
        } else {
            $scope.friends = [];
        }
    };

    // get details for ride selected from list
    $scope.rideDetail = function(id) {

        // set the selected id
        $scope.idSelected = id;

        // set the current ride in scope
        $scope.setCurrentRide(id);

        // call server for new friends
        $scope.getAvailableFriendsForRide();

        // call server for locations
        $scope.getAddressesByLocation();

    };

    $scope.setCurrentRide = function(id) {

        if (angular.isArray($scope.rides)) {
            $scope.ride = $filter('filter')($scope.rides, {id: id})[0];

            if ($scope.ride) {
                $scope.ride.date = new Date($scope.ride.date);
                $scope.current = angular.copy($scope.ride);

                //$log.info('current ride: ' + JSON.stringify($scope.current));
            }

        }

    };

    $scope.addMemberToRide = function(user_id) {

        $log.info('add member: ' + user_id);

        var request = {
            method: 'POST',
            url: HIGHLINE.SERVER.RESOURCE + 'service/ridemember/' + $scope.ride.id + '/' + user_id
        };

        if ($scope.ride.id && user_id) {
            $http(request).then(function success(response) {
                $scope.getRidesByUser();
            }, function error(response) {
                $log.info('error getting friends by user: ' + JSON.stringify(response));
            });
        }

    };

    $scope.addGruppeToRide = function(gruppe_id) {
        // TODO - implementation for gruppe members add to ride
        $log.info('add gruppe [ride id]: ' + $scope.ride.id);
        $log.info('add gruppe [gruppe id]: ' + gruppe_id);

        var request = {
            method: 'POST',
            url: HIGHLINE.SERVER.RESOURCE + 'service/ride/gruppe/add/' + $scope.ride.id + '/' + gruppe_id
        };

        if ($scope.ride.id && gruppe_id) {
            $http(request).then(function success(response) {
                $scope.getRidesByUser();
            }, function error(response) {
                $log.info('error getting friends by user: ' + angular.toJson(response, true));
            });
        }

    };

    $scope.removeMemberFromRide = function(user_id) {

        $log.info('remove member: ' + user_id);

        var request = {
            method: 'DELETE',
            url: HIGHLINE.SERVER.RESOURCE + 'service/ridemember/' + $scope.ride.id + '/' + user_id
        };

        if ($scope.ride.id) {
            $http(request).then(function success(response) {
                $scope.getRidesByUser();
            }, function error(response) {
                $log.info('error getting friends by user: ' + JSON.stringify(response));
            });
        } else {
            $scope.friends = [];
        }

    };

    $scope.savable = function(invalid) {
        //return $scope.ride.id === undefined || invalid;
        return invalid;
    };

    $scope.deletable = function(invalid) {
        return $scope.ride.id === undefined;
    };

    $scope.resettable = function(invalid) {
        return $scope.ride.id === undefined;
    };

    $scope.clear = function(form) {
        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }

        $scope.ride = new Ride();
    };

    $scope.reset = function(form) {
        $scope.ride = $scope.current;

        for (var i=0; i < $scope.rides.length; i++) {
            if ($scope.ride.id === $scope.rides[i].id) {
                $scope.rides[i] = $scope.ride;
            }
        }

        $log.info('$scope.ride.name: ' + $scope.ride.name);
        $log.info('$scope.current.name: ' + $scope.current.name);
        if (form) {
            form.$setPristine();
            form.$setUntouched();
        }
    };

    $scope.saveRide = function() {

        $log.info('saveRide [ride.id]: ' + $scope.ride.id);

        // set user id
        $scope.ride.user_id = $scope.user_id;

        // reset riders property to empty array
        if ($scope.ride.riders) {
            $scope.ride.riders = [];
        }
        if ($scope.ride.date) {
            $scope.ride.date = $filter('date')($scope.ride.date, 'yyyy-MM-dd');
        }

        if ($scope.ride.id) {
            $scope.ride.$update(function success() {
                $log.info('success updating ride: ' + $scope.ride.id);
                $scope.getRidesByUser();
            }, function error(response) {
                $log.info('error updating ride: ' + angular.toJson(response, true));
            });
        } else {
            $scope.ride.$save(function success(){
                $log.info('success saving ride');
                $scope.idSelected = $scope.ride.id;
                $scope.getRidesByUser();
            }, function error(response) {
                $log.info('error saving ride: ' + angular.toJson(response, true));
            });
        }

    };

    $scope.deleteRide = function() {

    };

}]);



