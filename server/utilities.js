function makeNewBoard(clues) {
  // very inefficient...
  // use newMakeNewBoard
  var board = [[0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0],
              [0,0,0,0,0,0,0,0,0]];

  // make an array of all coords
  var pos = [];
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j< 9; j++) {
      pos.push([i, j]);
    }
  }
  var count = 0;

  // place the appropriate number of clues
  while (count < clues) {
    [i, j] = pos.splice(random(pos.length), 1)[0];
    var allowed = allowedNum(i, j, board);
    if (allowed.length) {
      board[i][j] = allowed[random(allowed.length)];
      count++;
    } else {
      // if the coord does not have any allowed num
      // board has no solution, break
      var flag = 1;
      break;
    }
  }

  if (!flag) {
  // all clues placed, attempt to solve the board, return if solvable
    if (solve(board)) {
      return board;
    } else {
      console.log('Failed solve');
      return makeNewBoard(clues);
    }
  } else {
  // clue placement failed - redo
    console.log('Failed placement');
    return makeNewBoard(clues);
  }
}

function random(n) {
  // returns an integer in [0,n)
  return Math.floor(Math.random()*n);
}

function getCol(y, board) {
  return board.map(x => x[y]);
}

function getRow(x, board) {
  return board[x].slice();
}

function getBlock(x, y, board) {
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
}

// returns all numbers allowed in position x, y
function allowedNum(x, y, board) {
  var notAllowed = new Set(getCol(y, board).concat(getRow(x, board)).concat(getBlock(x, y, board)));
  var nums = Array.from({length: 9}, (v, k) => k + 1);
  return nums.filter(num => !notAllowed.has(num));
}

// returns all empty positions on the board
function unfilled(board) {
  var result = [];
  for (var i = 0; i < board.length; i++) {
    for (var j = 0; j < board.length; j++) {
      if (board[i][j] === 0) {
        result.push([i, j]);
      }
    }
  }
  return result;
}

function solve(board) {
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
}

var rotateMatrix = function(matrix, dir) {
  var rows = matrix.length;
  var cols = matrix[0].length;
  var result = [];

  for(var n = 0; n < cols; n++) {
    var rotatedRow = [];
    for(var m = 0; m < rows; m++) {
      rotatedRow.push(matrix[rows-m-1][n]);
    }
    result.push(rotatedRow);
  }

  if(dir === -1) {
    return rotateMatrix(rotateMatrix(result));
  } else {
    return result;
  }
};

var mapNum = function(board) {
  var numbers = [1,2,3,4,5,6,7,8,9];
  var mapping = {};
  for (var i = 1; i < 10; i++) {
    mapping[i] = numbers.splice(random(numbers.length), 1)[0];
  }
  return board.map(row => row.map(ele => mapping[ele]));
};

var switchRow = function(a, b, board) {
  var temp = board[a];
  board[a] = board[b];
  board[b] = temp;
  return board;
};

var dig = function(board, clues) {
  var pos = [];
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j< 9; j++) {
      pos.push([i, j]);
    }
  }

  while (pos.length > clues) {
    [i, j] = pos.splice(random(pos.length), 1)[0];
    board[i][j] = 0;
  }

  return board;
};

var randomise = function(board) {
  board = mapNum(board);
  if (Math.random() < 0.5) {
    board = rotateMatrix(board);
  }
  if (Math.random() < 0.5) {
    board = rotateMatrix(board);
  }
  if (Math.random() < 0.5) {
    board = rotateMatrix(board);
  }
  if (Math.random() < 0.5) {
    board = switchRow(0, 2, board);
  }
  if (Math.random() < 0.5) {
    board = switchRow(3, 5, board);
  }
  if (Math.random() < 0.5) {
    board = switchRow(6, 8, board);
  }
  return board;
};

var newMakeNewBoard = function(clues) {
  var board = [ [ 1, 2, 3, 4, 5, 6, 7, 8, 9 ],
                [ 4, 5, 6, 7, 8, 9, 1, 2, 3 ],
                [ 7, 8, 9, 1, 2, 3, 4, 5, 6 ],
                [ 2, 1, 4, 3, 6, 5, 8, 9, 7 ],
                [ 3, 6, 5, 8, 9, 7, 2, 1, 4 ],
                [ 8, 9, 7, 2, 1, 4, 3, 6, 5 ],
                [ 5, 3, 1, 6, 4, 2, 9, 7, 8 ],
                [ 6, 4, 2, 9, 7, 8, 5, 3, 1 ],
                [ 9, 7, 8, 5, 3, 1, 6, 4, 2 ] ];
  board = randomise(board);
  return dig(board, clues);
};


module.exports = {
  makeNewBoard: makeNewBoard,
  newMakeNewBoard: newMakeNewBoard
};
