'use strict';

angular.module('highline-ui').controller('HighlineFriendsController', ['$scope', '$state', 'Friend', 'Member', '$log', 'HIGHLINE', 'HighlineAuthentication', function($scope, $state, Friend, Member, $log, HIGHLINE, HighlineAuthentication) {

    var statii = ['Invitation Pending', 'Current Friend', 'Unknown Friend Status', 'Deleted Friend'];

    $scope.user_id = HighlineAuthentication.getUserId();

    $scope.invite = function(id) {
        // TODO implement invite business logic
    };

    $scope.isInvite = function(status) {
        if (status === 0) return true;
    };

    $scope.remove = function(id) {
        // TODO implement removal business logic
    };

    $scope.isRemove = function(status) {
        if (status === 1) return true;
    };

    $scope.friendStatus = function(status) {
        var cls = ['blue', 'green', 'yellow', 'red'];
        return cls[status];
    };

    $scope.friendStatusText = function(status) {
        return statii[status];
    };

    $scope.friends = Friend.query({id: $scope.user_id}, function() {
        $log.info('Friends: ' + JSON.stringify($scope.friends));
    });

    $scope.members = Member.query({id: $scope.user_id}, function() {
        $log.info('Members: ' + JSON.stringify($scope.members));
    });

    $scope.showAddress = function(friend) {
        var display = '[Location not available]';
        if (friend && angular.isArray(friend.addresses) && friend.addresses.length > 0) {
            var address = friend.addresses[0];
            if (angular.isArray(friend.preferences) && friend.preferences.length > 0) {
                var preferences = friend.preferences[0];
                if (preferences.address_show_all) {
                     return address.city + ", " + address.state + " " + address.zip;
                }
                if (preferences.address_show_city && preferences.address_show_state) {
                    return address.city + ", " + address.state;
                }
                if (preferences.address_show_state) {
                    return address.state;
                }
                if (preferences.address_show_zip) {
                    return address.zip;
                }
            }
        }
        return display;
    };

    $scope.avatarSource = function(friend)  {
        if (friend.avatar && friend.avatar.length() > 0) {
            return HIGHLINE.SERVER.RESOURCE + friend.avatar;
        } else {
            return 'assets/img/common/double-black.jpg';
        }
    };


}]);
