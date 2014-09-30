/**
 *  GridView
 *
 *  View for the entire tile grid.
 */

var GridView = Backbone.View.extend({
  tagName: 'table',
  className: 'grid-container',
  initialize: function(collection, gridSize) {
    this.gridSize = gridSize;
  },
  render: function() {
    var currentRow;
    this.collection.map(function(tile, index) {
      if ((index % this.gridSize) === 0) {   // Create a table row element once every gridSize elements
        currentRow = $('<tr>');
      }

      currentRow.append(new TileView({model: tile}).render());  // Add tile to the current row
      this.$el.append(currentRow);
    }.bind(this));

    return this.$el;
  }
});