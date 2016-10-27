'use strict';

angular.module('highline-ui').controller('HighlineHomeController', ['$scope', 'HIGHLINE', function($scope, HIGHLINE) {

    console.log('in HighlineHomeController');
    console.log('HIGHLINE.SERVER: ' + angular.toJson(HIGHLINE.SERVER));
    console.log('HIGHLINE.PORT: ' + angular.toJson(HIGHLINE.PORT));
    console.log('test');

}]);

