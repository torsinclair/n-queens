// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {
      var conflictCount = 0;
      for (var i = 0; i < rowIndex.length; i++) {
        if (rowIndex[i] !== 0) {
          conflictCount++;
        }
      }
      if (conflictCount > 1) {
        return true;
      }
      return false; // fixme
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      var isTrue = false;
      for (var k in this.attributes) {
        var row = this.attributes[k];
        isTrue = this.hasRowConflictAt(row);
        if (isTrue) {
          return true;
        }
      }

      // for (var k in this.attributes) {
      //   var row = this.attributes[k];
      //   if (Array.isArray(row)) {
      //     var onesArr = row.filter(function (val) { return val === 1; });
      //     if (onesArr.length > 2) {
      //       return true;
      //     }
      //   }
      // }
      return false; // fixme
    },



    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
      return this.hasRowConflictAt(colIndex);
      // var conflictCount = 0;
      // for (var i = 0; i < colIndex.length; i++) {
      //   if (colIndex[i] !== 0) {
      //     conflictCount++;
      //   }
      // }
      // if (conflictCount > 1) {
      //   return true;
      // }
      // return false;
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      var col = [];
      var arrayCount = this.attributes.n;
      var isTrue = false;

      for (var k in this.attributes) {
        if (Array.isArray(this.attributes[k])) {
          col = [];
          for (var i = 0; i < arrayCount; i++) {
            col.push(this.attributes[i][k]);
          }
          isTrue = this.hasColConflictAt(col);
          if (isTrue) {
            return true;
          }
        }
      }
      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict
    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      return this.hasRowConflictAt(majorDiagonalColumnIndexAtFirstRow); // fixme
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var n = this.attributes.n;
      var isTrue = false;
      var majDiagonalArr = [];
      var thisRow = 0;
      var diagSize = n;

      //Check diagonals below row 0 index 0
      for (var numPushes = 0; numPushes < n; numPushes++) {
        majDiagonalArr = [];
        thisRow = numPushes;
        for (var i = 0; i < diagSize; i++) {
          majDiagonalArr.push(this.attributes[thisRow][i]);
          thisRow++;
        }
        isTrue = this.hasMajorDiagonalConflictAt(majDiagonalArr);
        if (isTrue) {
          return true;
        }
        diagSize--;
      }
      //reset majDiagonalArr
      majDiagonalArr = [];

      //Check diagonals above row 0 index 0              
      for (var i = 1; i < this.attributes.n; i++) {
        for (var j = 0; j < this.attributes.n - i; j++) {
          var k = j;
          var l = i + j;              
          majDiagonalArr.push(this.attributes[k][l]);        
        }
        isTrue = this.hasMajorDiagonalConflictAt(majDiagonalArr);
        if (isTrue) {
          return true;
        }
        majDiagonalArr = [];
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return this.hasRowConflictAt(minorDiagonalColumnIndexAtFirstRow);
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var matrix = this.attributes;
      var n = this.attributes.n;
      var isTrue = false;
      var minDiagonalArr = [];
      var thisRow = 0;
      var thisIndex = 1;
      var diagSize = 2;
      for (var numPushes = 1; numPushes < n; numPushes++) {
        minDiagonalArr = [];
        thisRow = 0;
        for (var i = thisIndex; i > -1; i--) {
          minDiagonalArr.push(matrix[thisRow][i]);
          thisRow++;
        }
        isTrue = this.hasMinorDiagonalConflictAt(minDiagonalArr);
        if (isTrue) {
          return true;
        }
        thisIndex++;
        diagSize++;
      }

      diagSize = 0;
      for (var r = 1; r < n; r++) {
        debugger;
        minDiagonalArr = [];
        thisRow = r;
        for (var index = n - 1; index > diagSize; index--) {
          minDiagonalArr.push(matrix[thisRow][index]);
          thisRow++;
        }
        isTrue = this.hasMinorDiagonalConflictAt(minDiagonalArr);
        if (isTrue) {
          return true;
        }
        diagSize++;
      }



      return false; // fixme
    }
    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
