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
    //run on object
    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },
    //run on object
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
      var diagonalArr = [];
      var indicesArr = [];
      var n = this.attributes.n;
      var isTrue = false;
      var key = (n - 1);

      var arr1 = [];

      for (var i = 0; i < n; i++) {
        
          // if i === 0 you can't step back, only 1 element array
        if (i === 0) {
          arr1.push(this.attributes[key][i]);
        } else {
          arr1 = [];
          for (var j = i; j >= 0; j--) {
            arr1.push(this.attributes[key][j]);
          }
          console.log(arr1);

          isTrue = this.hasMajorDiagonalConflictAt(arr1);
          console.log(isTrue);

          if (isTrue) {
            return true;
          }
        }
      }

      arr1 = [];

      //for (keys in obj) {
              
      for (var i = 1; i < this.attributes.n; i++) {
        for (var j = 0; j < this.attributes.n - i; j++) {
          var k = j;
          var l = i + j;              
          arr1.push(this.attributes[k][l]);        
        }
        isTrue = this.hasMajorDiagonalConflictAt(arr1);
        if (isTrue) {
          return true;
        }
        arr1 = [];
      }
      // Helper function to get all indices of pieces in a row.
      // var getAllIndexes = function (arr, val) {
      //   var indexes = [];
      //   for (i = 0; i < arr.length; i++) {
      //     if (arr[i] === val) {
      //       indexes.push(i);
      //     }
      //   }
      //   return indexes;
      // };
      // Loop to find the diagonal values.
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      return false; // fixme
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
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
