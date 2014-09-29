/**
 *  Tile
 *
 *
 */

var Tile = Backbone.Model.extend({
  initialize: function() {
    this.set('mine', false);
    this.set('clicked', false);
    this.set('row', null);
    this.set('column', null);
    this.set('adjacentMines', 0);
    this.set('warning', 0);
  },
  tileClicked: function() {
    this.trigger('handleTileClicked', this);
  }
});