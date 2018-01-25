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
  var solution = new Board({n: n});
  solution.togglePiece(0, 0);

  if (n === 1) {
    return solution.rows();
  } else {
    for (var i = 1; i < n; i++) {
      for (var j = 1; j < n; j++) {
        solution.togglePiece(i, j);
        if (solution.hasAnyRooksConflicts()) {
          solution.togglePiece(i, j);
        }
      }
    }
  }

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 1;
  //This is (n - 1)!
  if ( n < 2) {
    solutionCount = n;
  } else {
    for (var i = n; i > 1; i --) {
      solutionCount *= i;
    }
  }

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount;
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = new Board({n: n});

  if (n === 1) {
    solution.togglePiece(0, 0);
  } else if (n > 3) {
    var count = 0;
    var recursiveSearch = function(solution, count, curRow) {
      if (curRow === n && count === n) {
        //console.log(solution.rows());
        return true;
      } else if (curRow === n && count < n) {
        return false;
      }
      //check current row for any conflicts when toggled.
      var row = solution.get(curRow);
      //console.log('curRow: ->' + curRow + 'Count: ->' + count);
      for (let i = 0; i < n; i++) {
        solution.togglePiece(curRow, i);
        if (!solution.hasAnyQueenConflictsOn(curRow, i)) { //we check if current spot has Queen conflicts
          count++;
          //console.log('curCount: -> ' + count);
          var result = recursiveSearch(solution, count, curRow + 1);
          if (!result) {
            solution.togglePiece(curRow, i);
            count--;
            //console.log('Conflict subtree: -> Count: -> ' + count);
          } else {
            return true;
          }
        } else {
          solution.togglePiece(curRow, i);
        }
      }
    };

    var val = recursiveSearch(solution, count, 0);
    if (val) {
      return solution.rows();
    }
  }

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution.rows();
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solution = new Board({n: n});
  var solutionCount = 0;

  if (n === 1 || n === 0) {
    solutionCount++;
  } else if (n > 3) {
    var count = 0;
    var Search = function(solution, count, curRow) {
      if (curRow === n && count === n) {
        return 1;
      } else if (curRow === n && count < n) {
        return 0;
      }
      //check current row for any conflicts when toggled.
      var row = solution.get(curRow);
      //console.log('curRow: ->' + curRow + 'Count: ->' + count);
      for (let i = 0; i < n; i++) {
        solution.togglePiece(curRow, i);
        if (!solution.hasAnyQueenConflictsOn(curRow, i)) { //we check if current spot has Queen conflicts
          count++;
          //console.log('curCount: -> ' + count);
          var result = Search(solution, count, curRow + 1);
          if (!result) {
            solution.togglePiece(curRow, i);
            count--;
            //console.log('Conflict subtree: -> Count: -> ' + count);
          } else {
            solutionCount++;
            solution.togglePiece(curRow, i);
            count--;
            return false;
          }
        } else {
          solution.togglePiece(curRow, i);
        }
      }
    };

    Search(solution, count, 0);
  }

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
