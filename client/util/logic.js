angular.module('sudoku-logic', [])
.factory('Logic', function() {

  var getCol = function(y, board) {
    return board.map(x => x[y]);
  };

  var getRow = function(x, board) {
    return board[x].slice();
  };

  var getBlock = function(x, y, board) {
    var block = [];
    var numBlock = {
      0: [0, 1, 2],
      1: [3, 4, 5],
      2: [6, 7, 8]
    };
    var xBlock = numBlock[Math.floor(x/3)];
    var yBlock = numBlock[Math.floor(y/3)];
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        block.push(board[xBlock[i]][yBlock[j]]);
      }
    }
    return block;
  };

  // returns all numbers allowed in position x, y
  var allowedNum = function(x, y, board) {
    var notAllowed = new Set(getCol(y, board).concat(getRow(x, board)).concat(getBlock(x, y, board)));
    var nums = Array.from({length: 9}, (v, k) => k + 1);
    return nums.filter(num => !notAllowed.has(num));
  };

  // returns all empty positions on the board
  var unfilled = function(board) {
    var result = [];
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board.length; j++) {
        if (board[i][j] === 0) {
          result.push([i, j]);
        }
      }
    }
    return result;
  };

  var invalidPos = function(cell, board) {
    var a = cell.value?+cell.value:cell.value;
    var i = cell.row;
    var j = cell.col;
    board[i][j] = 0;
    if (allowedNum(i, j, board).indexOf(+a) === -1 && a !== '' && cell.mutable) {
      board[i][j] = a;
      return true;
    } else {
      board[i][j] = a;
      return false;
    }
  };

  var checkValid = function(board) {
    for (var i = 0; i < board.length; i++) {
      for (var j = 0; j < board.length; j++) {
        var a = board[i][j];
        board[i][j] = 0;
        if (a !== allowedNum(i, j, board)[0]) {
          return false;
        }
        board[i][j] = a;
      }
    }
    return true;
  };

  var solve = function(board) {
    var solution = [];

    function move(board, empty) {
      if (!solution.length) {
        if (!empty.length) {
          board.forEach(row => solution.push(row.slice()));
          return;
        } else {
          var x = empty[0][0];
          var y = empty[0][1];
          for (var number of allowedNum(x, y, board)) {
            board[x][y] = number;
            move(board, empty.slice(1));
          }
          board[x][y] = 0;
        }
      }
    }

    move(board, unfilled(board));
    return solution.length ? solution.slice(0, 9) : false;
  };

  return {
    solve: solve,
    checkValid: checkValid,
    allowedNum: allowedNum,
    invalidPos: invalidPos
  };
});