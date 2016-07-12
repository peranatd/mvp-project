angular.module('sudoku', [
  'sudoku-logic',
  'sudoku-state'
])
.controller('GameController', function ($scope, $http, State, Logic) {

  $scope.state = angular.extend($scope, State);
  $scope.logic = angular.extend($scope, Logic);

  // solve and display the solution
  $scope.getSol = function() {
    $scope.state.board = $scope.state.initBoard($scope.logic.solve($scope.state.origBoard));
  };

  // reset the board to the original untouched state
  $scope.reset = function() {
    $scope.state.board = $scope.state.initBoard($scope.state.origBoard);
  };

  // check the board's validity
  $scope.checkSol = function() {
    window.alert(
      ($scope.logic.checkValid($scope.state.board.map(row => row.map(cell => +cell.value)))) ?
      "Well done!" : "Try again"
    );
  };

  // get new board from server
  $scope.getNew = function(callback) {
    if (!$scope.disable) {
      $scope.disable = true;
      return $http({
        method: 'GET',
        url: '/new'
      })
      .then(function(response) {
        $scope.state.origBoard = response.data;
        $scope.reset();
        $scope.disable = false;
        return;
      })
      .then(function() {
        if (callback) {
          callback();
        }
      });
    }
  };

  // initial setup: get new board and start watching it
  $scope.init = function() {
    $scope.getNew(function() {

      // deep watch for state changes on the baord
      $scope.$watch('state.board', function() {
        var tempBoard = $scope.state.board.map(row => row.map(cell => +cell.value));
        $scope.state.board.forEach(row => row.forEach(cell => cell.invalid = $scope.logic.invalidPos(cell, tempBoard)));
      }, true);

    });
  };

  $scope.disable = false;
  $scope.init();
});