'use strict';

angular.module('highline-ui').controller('HighlineSandboxController', ['$scope', '$log', '$state', function ($scope, $log, $state) {

    $log.info('in SandboxController');

    var model = {
        user: "Adam",
        items: [{ action: "Buy Flowers", done: false },
            { action: "Get Shoes", done: false },
            { action: "Collect Tickets", done: true },
            { action: "Call Joe", done: false }]
    };

    $scope.todo = model;

    $scope.incompleteCount = function () {
        var count = 0;
        angular.forEach($scope.todo.items, function (item) {
            if (!item.done) { count++; }
        });
        return count;
    };

}]);