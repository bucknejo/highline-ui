'use strict';

angular.module('highline-ui').controller('HighlineSandboxController', ['$scope', '$log', '$state', '$http', function ($scope, $log, $state, $http) {

    $log.info('in SandboxController');

    var model = {
        user: "Jon",
        items: [{ action: "Buy Flowers", done: false },
            { action: "Get Shoes", done: false },
            { action: "Collect Tickets", done: true },
            { action: "Call Joe", done: false }]
    };

    $scope.todo = model;

    $scope.loadData = function() {
      $http.get("../assets/data/todo.json").then(
          function(data) {
            $log.info(angular.toJson(data));
            $scope.todo.items = data.data;
          },
          function(error) {
            $log.error('cannot find file: ' + error.message);
          }
      );
    };

    $scope.loadData();

    $scope.incompleteCount = function () {
        var count = 0;
        angular.forEach($scope.todo.items, function (item) {
            if (!item.done) { count++; }
        });
        return count;
    };

    $scope.warningLevel = function() {
        return $scope.incompleteCount() < 3 ? "label-success" : "label-warning";
    };

    $scope.actionText = "";

    $scope.addNewItem = function(actionText) {
        $scope.todo.items.push({action: actionText, done: false});
    };

}]);