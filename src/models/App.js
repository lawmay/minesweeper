/**
 *  App
 *
 *
 */

var App = Backbone.Model.extend({
  initialize: function(gridSize) {
    var grid = new Grid(this.createModels(gridSize), gridSize);
    this.set('grid', grid);

    var panel = new Panel();
    this.set('panel', panel);

    this.get('panel').on('handleButtonClick', function(buttonType) {
      this.get('grid').handleButtonClick(buttonType, gridSize);
    }.bind(this)); 

  },
  createModels: function(gridSize) {
    var tiles = [];

    for (var i = 0; i < (gridSize * gridSize); i++) {
      tiles.push(new Tile());
    }

    return tiles;
  }
});