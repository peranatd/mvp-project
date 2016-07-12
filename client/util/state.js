angular.module('sudoku-state', [])
.factory('State', function(Logic) {

  // convert a 2D array board into game state
  var initBoard = function(rawBoard) {
    var cookedBoard = [];
    for (var i = 0; i < rawBoard.length; i++) {
      var newRow = [];
      for (var j = 0; j < rawBoard.length; j++) {
        newRow.push({
          value: rawBoard[i][j]?rawBoard[i][j]:'',
          mutable: (rawBoard[i][j]===0)?true:false,
          row: i,
          col: j,
          invalid: false
        });
      }
      cookedBoard.push(newRow);
    }
    return cookedBoard;
  };

  return {
    initBoard: initBoard
  };
});