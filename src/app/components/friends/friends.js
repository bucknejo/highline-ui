'use strict';

angular.module('highline-ui').controller('HighlineFriendsController', ['$scope', 'HIGHLINE', function($scope, HIGHLINE) {

    console.log('in HighlineFriendsController');
    console.log('HIGHLINE.SERVER: ' + angular.toJson(HIGHLINE.SERVER));
    console.log('HIGHLINE.PORT: ' + angular.toJson(HIGHLINE.PORT));
    console.log('test');

}]);

