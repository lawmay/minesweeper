/**
 *  GridView
 *
 *
 */

var GridView = Backbone.View.extend({
  tagName: 'table',
  className: 'grid-container',
  initialize: function(collection, gridSize) {
    this.gridSize = gridSize;
  },
  render: function() {
    var gridSize = this.gridSize;

    var newRow;
    this.collection.map(function(tile, index) {
      if ((index % gridSize) === 0) {
        newRow = $('<tr>');
      }

      newRow.append(new TileView({model: tile}).render());
      this.$el.append(newRow);
    }.bind(this));

    return this.$el;
  }
});