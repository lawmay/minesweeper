/**
 *  Tile
 *
 *  Model for one tile on the grid. Tiles exist in the Grid collection.
 */

var Tile = Backbone.Model.extend({
  initialize: function() {
    this.set('mine', false);
    this.set('clicked', false);
    this.set('row', null);
    this.set('column', null);
    this.set('adjacentMines', 0);
  },
  tileClicked: function() {
    this.trigger('handleTileClicked', this);  // Bubble up click event up to the Grid collection
  }
});