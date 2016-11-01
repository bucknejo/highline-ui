'use strict';

angular.module('highline-ui').controller('HighlineAccountController', ['$scope', 'HIGHLINE', function($scope, HIGHLINE) {

    console.log('in HighlineAccountController');
    console.log('HIGHLINE.SERVER: ' + angular.toJson(HIGHLINE.SERVER));
    console.log('HIGHLINE.PORT: ' + angular.toJson(HIGHLINE.PORT));

}]);

