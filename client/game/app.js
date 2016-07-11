angular.module('sudoku', [
  'sudoku-logic',
  'sudoku-state'
])
.controller('GameController', function ($scope, State, Logic) {

  $scope.state = angular.extend($scope, State);
  $scope.logic = angular.extend($scope, Logic);

  $scope.$watch('state.board', function() {
    var tempBoard = $scope.state.board.map(row => row.map(cell => +cell.value));
    $scope.state.board.forEach(row => row.forEach(cell => cell.invalid = $scope.logic.invalidPos(cell, tempBoard)))
  }, true)

  $scope.getSol = function() {
    $scope.state.board = $scope.state.initBoard($scope.logic.solve($scope.state.origBoard));
  }

  $scope.reset = function() {
    $scope.state.board = $scope.state.initBoard($scope.state.origBoard);
  }

  $scope.checkSol = function() {
    window.alert(
      ($scope.logic.checkValid($scope.state.board.map(row => row.map(cell => +cell.value)))) ?
      "Well done!" : "Try again"
    );
  }


});