/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other



window.findNRooksSolution = function(n) {
  var board = new Board({n: n});
  // look through the board and find a spot to toggle a rook attribute, array
    // check for conflicts at that spot
      // place rook
  for (var r = 0; r < n; r++) {
    for (var i = 0; i < n; i++) {
      element = board.attributes[r][i];
      board.togglePiece(r, i);
      if (board.hasRowConflictAt2(r) || board.hasColConflictAt2(i)) {
        board.togglePiece(r, i);
      }
    }
  }
  var solution = board.rows();
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return board.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var board = new Board({n: n});
  var solutionCount = 0; //fixme
  var matrix = findNRooksSolution(n);
  var input = [];

  for (var i = 1; i < matrix.length; i++) {
    input.push(Math.pow(i, 2));
  }

  var recurse = function(round, numArr) {
    var arr = numArr || [[]];
    var result = [];
    for (var i = 0; i < input.length; i++) {
      if (input[i] !== arr[i]) {
        result.push(arr[i]).concat(input[i]);
      }
    }
    if (round === rounds) {
      return result.length;
    } else {
      return recurse(solutionCount + 1, result);
    }

    return recurse(1);

  };


  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

window.countNRooksSolutions2 = function(n) {
  var board = new Board({n: n});

  return numResults;
};
// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
