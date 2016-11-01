'use strict';

angular.module('highline-ui').controller('HighlineGroupsController', ['$scope', 'HIGHLINE', function($scope, HIGHLINE) {

    console.log('in HighlineGroupsController');
    console.log('HIGHLINE.SERVER: ' + angular.toJson(HIGHLINE.SERVER));
    console.log('HIGHLINE.PORT: ' + angular.toJson(HIGHLINE.PORT));
    console.log('test');

}]);

