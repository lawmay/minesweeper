/**
 *  Grid
 *
 *  Collection for the grid of tiles.
 *  Contains game logic.
 */

var Grid = Backbone.Collection.extend({
  model: Tile,
  initialize: function(models, gridSize) {
    this.setCurrentGrid(models, gridSize);  // Create a 2d-array containing references to models in the grid
    this.initializeMines(gridSize); // Randomly generate mines

    this.on('handleTileClicked', function(tile) {   // Handle a tile click
      if (!tile.get('clicked')) {
        this.checkEndGame(tile, gridSize);
      }
    });
  },
  setCurrentGrid: function(models, gridSize) {  // Setup 2d-array grid. Logic is easier to with than a flat array of models.
    var currentGrid = [];

    for (var i = 0; i < gridSize; i++) {
      var currentRow = [];
      for (var j = (i * gridSize), column = 0; j < ((i * gridSize) + gridSize); j++, column++) {
        models[j].set('row', i);
        models[j].set('column', column);

        currentRow.push(models[j]);
      }
      currentGrid.push(currentRow);
    }

    this.currentGrid = currentGrid; // Use this.currentGrid to interface with tiles
  },
  initializeMines: function(gridSize) {
    this.setMines();
    this.setAdjacentMines(gridSize);
  },
  setMines: function() {
    var randomChoices = []; // Create random choices
    for (var i = 0; i < 64; i++) {
      randomChoices.push(i);
    }

    for (var j = 0; j < 10; j++) {    // Unbiased random number generator (Fisher-Yates like?)
      var randomIndex = Math.floor(Math.random() * (64 - j));
      var randomNumber = randomChoices.splice(randomIndex, 1)[0]; // Pull a random element randomly out remaining possible results

      var randomRowIndex = Math.floor(randomNumber / 8);
      var randomColumnIndex = randomNumber % 8;
      this.currentGrid[randomRowIndex][randomColumnIndex].set('mine', true);  
    }
  },
  setAdjacentMines: function(gridSize) {  // Set the number of adjacent mines surrounding a tile
    for (var i = 0; i < gridSize; i++) {
      for (var j = 0; j < gridSize; j++) {
        var count = 0;
        // Use a callback to execute the incrementing
        this.mapAdjacentMines(this.currentGrid[i][j], gridSize, function(currentRowIndex, currentColumnIndex) {
          if (this.currentGrid[currentRowIndex][currentColumnIndex].get('mine')) {
            count++;
          }
        }.bind(this));

        this.currentGrid[i][j].set('adjacentMines', count);
      }
    }
  },
  mapAdjacentMines: function(tile, gridSize, callback) {    // Examine all 8 tiles around a certain tile
    var tileRow = tile.get('row');
    var tileColumn = tile.get('column');
    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {
        var currentRowIndex = tileRow + i;
        var currentColumnIndex = tileColumn + j;

        if (currentRowIndex >= 0 && currentRowIndex < gridSize &&
          currentColumnIndex >= 0 && currentColumnIndex < gridSize &&
          !(currentRowIndex === tileRow && currentColumnIndex === tileColumn)   // Skip the center space
          ){
          callback(currentRowIndex, currentColumnIndex);
        }
      }
    }
  },
  checkEndGame: function(tile, gridSize) {
    if (tile.get('mine')) {
      tile.set('clicked', true);
      this.gameFail();
      this.resetGame();
    } else {
      this.uncoverAppropriateTiles(tile, gridSize);
    }
  },
  gameFail: function() {
    alert('You lost!');
  },
  gameWin: function() {
    alert('You won!');
  },
  resetGame: function() {
    this.resetTiles();
    this.initializeMines(gridSize);
  },
  resetTiles: function() {
    this.mapAllTiles(function(tile) {
      tile.set('mine', false);
      tile.set('clicked', false);
    });
  },
  uncoverAppropriateTiles: function(tile, gridSize) { // Uncover all appropriate tiles when a tile is clicked (and not a mine)
    if (tile.get('adjacentMines') === 0 && tile.get('clicked') !== true) {
      tile.set('clicked', true);

      this.mapAdjacentMines(tile, gridSize, function(currentRowIndex, currentColumnIndex) {
        // Call this function recursively in the callback when iterating all surrounding tiles
        // Will effectively uncover all tiles around the current tile with 0 adjacent mines
        this.uncoverAppropriateTiles(this.currentGrid[currentRowIndex][currentColumnIndex], gridSize);
      }.bind(this));
    } else {
      tile.set('clicked', true);
    }
  },
  handleButtonClick: function(buttonType, gridSize) {
    if (buttonType === 'validateButton') {
      this.validateGame();
    } else if (buttonType === 'newGameButton') {
      this.resetTiles();
      this.initializeMines(gridSize);
    } else if (buttonType === 'cheatButton') {
      this.showMines();
    }
  },
  validateGame: function() {
    var gameFailed = false;
    this.mapAllTiles(function(tile) {
      if (!tile.get('clicked') && !tile.get('mine')) {
        gameFailed = true;
      }
    }.bind(this));

    gameFailed ? this.gameFail() : this.gameWin();
    this.resetGame();
  },
  showMines: function() {
    this.mapAllTiles(function(tile) {
      if (tile.get('mine')) {
        tile.set('clicked', true);
      }
    });
  },
  mapAllTiles: function(callback) { // Map utility function for all tiles in the board
    _.each(this.currentGrid, function(currentRow) {
      _.each(currentRow, function(tile) {
        callback(tile);
      });
    });
  }
});
