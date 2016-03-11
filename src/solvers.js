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
  var solutionCount = 0; //fixme
  var board = new Board({n: n});
  // var input = [];
  // board
  // [1, 2, 4, 8]
  // [1, 2, 4, 8]
  // [1, 2, 4, 8]
  // [1, 2, 4, 8]

  // for (var i = 1; i < matrix.length; i++) {
  //   input.push(i);
  // }
    
  // var chessBoard = function(rounds) {
  //   if (rounds <= 0) {
  //     return;
  //   }

  //   var recurse = function(round, arr) {
  //     var arr = arr || [[]];
  //     var result = [];
  //     for (var i = 0; i < arr.length; i++) {
  //       for (var j = 0; j < input.length; j++) {
  //         if (arr[i].indexOf(input[j]) < 0) {
  //           result.push(arr[i].concat(input[j]));
  //         }
  //       }
  //     }
  //     if (round === rounds) {
  //       return result.length;
  //     } else {
  //       return recurse(round + 1, result);
  //     }
  //   };
  //   return recurse(1);
  // };
  // solutionCount = chessBoard(input.length);

  var findRooksSolutions = function(row) {
    //Base case. If row = n then return
    if (row === n) {
      solutionCount++;
      return;
    }
    //put the piece on the board
    for (var i = 0; i < n; i++) {
      board.togglePiece(row, i);
      //if there isn't a rook conflict, then keep the piece there
      if (!board.hasAnyRooksConflicts()) {
      //recurse the function incrementing the row
        findRooksSolutions(row++);
      }
      board.togglePiece(row, i);      
    // else take off the piece on the board
    }

  };
  findRooksSolutions(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);

  return solutionCount;

};

window.countNRooksSolutions2 = function(n) {
  var solutionCount = 0;
  var board = findNRooksSolution(n);

  // board
  // [1, 0, 0, 0]
  // [0, 1, 0, 0]
  // [0, 0, 1, 0]
  // [0, 0, 0, 1]

  //iterate through all of the elements in the first row
    //for each of the first elements in the first row, find the different combinations of the rest of the rows
      //each time we find a solution, increment solutionCount
  for (var iterations = 0; iterations < n; iterations++) {
    for (var r = 1; r < n; r++) {
      for (var i = 0; i < n; i++) {
        if (board[r][i] === 1) {
          board.togglePiece(r, i);

        }
      }
    }
  }
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
