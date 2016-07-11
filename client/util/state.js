angular.module('sudoku-state', [])
.factory('State', function() {
  var board = [[5,3,0,0,7,0,0,0,0],
               [6,0,0,1,9,5,0,0,0],
               [0,9,8,0,0,0,0,6,0],
               [8,0,0,0,6,0,0,0,3],
               [4,0,0,8,0,3,0,0,1],
               [7,0,0,0,2,0,0,0,6],
               [0,6,0,0,0,0,2,8,0],
               [0,0,0,4,1,9,0,0,5],
               [0,0,0,0,8,0,0,7,9]];

  var initBoard = function(rawBoard) {
    var cookedBoard = [];
    for (var row of rawBoard) {
      newRow = [];
      for (var cell of row) {
        newRow.push({
          value: cell?cell:'',
          mutable: (cell===0)?true:false,
          valid: true,
        })
      }
      cookedBoard.push(newRow);
    }
    return cookedBoard;
  }

  var makeRaw = function(cookedBoard) {
    var rawBoard = [];
    var nums = new Set(Array.from({length: 9}, (v, k) => k + 1));
    for (var i = 0; i < cookedBoard.length; i++) {
      var row = [];
      for (var j = 0; j < cookedBoard.length; j++) {
        row.push(nums.has(cookedBoard[i][j].value)?cookedBoard[i][j].value:0);
      }
      rawBoard.push(row);
    }
    return rawBoard;
  }

  var set = function(x, y, val) {
    if (typeof(+val) === 'number' && val <= 9 && val >= 0) {
      board[x][y] = val;
    }
    val = '';
  }

  return {
    initBoard: initBoard,
    makeRaw: makeRaw,
    origBoard: board,
    board: initBoard(board),
    set: set
  }
});