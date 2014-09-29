/**
 *  Grid
 *
 *
 */

var Grid = Backbone.Collection.extend({
  model: Tile,
  initialize: function(models, gridSize) {
    this.setCurrentGrid(models, gridSize);
    this.initializeMines(gridSize);

    this.on('handleTileClicked', function(tile) {
      if (!tile.get('clicked')) {
        this.checkEndGame(tile, gridSize);
      }
    });
  },
  setCurrentGrid: function(models, gridSize) {
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

    this.currentGrid = currentGrid;
  },
  initializeMines: function(gridSize) {
    this.setMines();
    this.setAdjacentMines(gridSize);
  },
  setMines: function() {
    var randomChoices = [];
    for (var i = 0; i < 64; i++) {
      randomChoices.push(i);
    }

    for (var j = 0; j < 10; j++) {
      var randomIndex = Math.floor(Math.random() * (64 - j));
      var randomNumber = randomChoices.splice(randomIndex, 1)[0];

      var randomRowIndex = randomNumber % 8;
      var randomColumnIndex = Math.floor(randomNumber / 8);
      this.currentGrid[randomRowIndex][randomColumnIndex].set('mine', true);  
    }
  },
  setAdjacentMines: function(gridSize) {
    for (var i = 0; i < gridSize; i++) {
      for (var j = 0; j < gridSize; j++) {
        var count = 0;

        this.mapAdjacentMines(this.currentGrid[i][j], gridSize, function(currentRowIndex, currentColumnIndex) {
          if (this.currentGrid[currentRowIndex][currentColumnIndex].get('mine')) {
            count++;
          }
        }.bind(this));

        this.currentGrid[i][j].set('adjacentMines', count);
      }
    }
  },
  mapAdjacentMines: function(tile, gridSize, callback) {
    var tileRow = tile.get('row');
    var tileColumn = tile.get('column');
    for (var i = -1; i < 2; i++) {
      for (var j = -1; j < 2; j++) {

        var currentRowIndex = tileRow + i;
        var currentColumnIndex = tileColumn + j;

        if (currentRowIndex >= 0 && currentRowIndex < gridSize &&
          currentColumnIndex >= 0 && currentColumnIndex < gridSize &&
          !(currentRowIndex === tileRow && currentColumnIndex === tileColumn)
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
  uncoverAppropriateTiles: function(tile, gridSize) {
    if (tile.get('adjacentMines') === 0 && tile.get('clicked') !== true) {
      tile.set('clicked', true);

      this.mapAdjacentMines(tile, gridSize, function(currentRowIndex, currentColumnIndex) {
        this.uncoverAppropriateTiles(this.currentGrid[currentRowIndex][currentColumnIndex], gridSize);
      }.bind(this));
    } else {
      tile.set('clicked', true);
    }
  },
  handleButtonClick: function(buttonType, gridSize) {
    if (buttonType === 'validateButton') {
      this.validateGame();
      
    }
    if (buttonType === 'newGameButton') {
      this.resetTiles();
      this.initializeMines(gridSize);
    }
    if (buttonType === 'cheatButton') {
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
  mapAllTiles: function(callback) {
    _.each(this.currentGrid, function(currentRow) {
      _.each(currentRow, function(tile) {
        callback(tile);
      });
    });
  }
});
