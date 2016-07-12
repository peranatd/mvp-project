angular.module('sudoku-state', [])
.factory('State', function(Logic) {

  // var board = [[5,3,0,0,7,0,0,0,0],
  //              [6,0,0,1,9,5,0,0,0],
  //              [0,9,8,0,0,0,0,6,0],
  //              [8,0,0,0,6,0,0,0,3],
  //              [4,0,0,8,0,3,0,0,1],
  //              [7,0,0,0,2,0,0,0,6],
  //              [0,6,0,0,0,0,2,8,0],
  //              [0,0,0,4,1,9,0,0,5],
  //              [0,0,0,0,8,0,0,7,9]];

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

  // var makeRaw = function(cookedBoard) {
  //   var rawBoard = [];
  //   var nums = new Set(Array.from({length: 9}, (v, k) => k + 1));
  //   for (var i = 0; i < cookedBoard.length; i++) {
  //     var row = [];
  //     for (var j = 0; j < cookedBoard.length; j++) {
  //       row.push(nums.has(cookedBoard[i][j].value)?cookedBoard[i][j].value:0);
  //     }
  //     rawBoard.push(row);
  //   }
  //   return rawBoard;
  // };

  return {
    initBoard: initBoard
    // makeRaw: makeRaw,
    // origBoard: board,
    // board: initBoard(board)
  };
});