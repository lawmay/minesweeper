/**
 *  App
 *
 *  Model for the entire app. Containing main grid collection and side-panel model.
 */

var App = Backbone.Model.extend({
  initialize: function(gridSize) {
    var grid = new Grid(this.createModels(gridSize), gridSize); // Create grid
    this.set('grid', grid);

    var panel = new Panel();  // Create side-panel with button options
    this.set('panel', panel);

    this.get('panel').on('handleButtonClick', function(buttonType) {  // Handle panel clicks
      this.get('grid').handleButtonClick(buttonType, gridSize);
    }.bind(this)); 

  },
  createModels: function(gridSize) {    // Create appropriate number of tiles (used to initialize the Grid collection)
    var tiles = [];

    for (var i = 0; i < (gridSize * gridSize); i++) {
      tiles.push(new Tile());
    }

    return tiles;
  }
});