'use strict';

angular.module('highline-ui').controller('HighlineRidesController', ['$scope', 'HIGHLINE', function($scope, HIGHLINE) {

    console.log('in HighlineRidesController');
    console.log('HIGHLINE.SERVER: ' + angular.toJson(HIGHLINE.SERVER));
    console.log('HIGHLINE.PORT: ' + angular.toJson(HIGHLINE.PORT));
    console.log('test');

}]);

