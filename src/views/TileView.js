/**
 *  TileView
 *
 *  View for the each tile.
 */

var TileView = Backbone.View.extend({
  tagName: 'td',
  className: 'tile',
  initialize: function() {
    this.model.on('change', this.render, this);
  },
  events: {
    'click': 'tileClicked'
  },
  tileClicked: function() {
    this.model.tileClicked();
  },
  render: function() {
    if (this.model.get('clicked')) {
      this.$el.removeClass('covered');  // Reveal tile on click
      this.$el.addClass('uncovered');

      if (this.model.get('mine')) {
        this.$el.html('<div class="mine">mine</div>');    // Reveal mine
      } else {
        var numberColorClasses = [  // Array of color classes to be applied depending on adjacent mines
          'zero'
          , 'one'
          , 'two'
          , 'three'
          , 'number'
          , 'number'
          , 'number'
          , 'number'
          , 'number'
        ]
        var adjacentMines = this.model.get('adjacentMines');  // Reveal appropriate number of adjacent mines
        this.$el.html('<div class="' + numberColorClasses[adjacentMines] + '">' + adjacentMines + '</div>');
      }
    } else {
      this.$el.html('');    // Initialization of tile view
      this.$el.removeClass('uncovered');
      this.$el.addClass('covered');
    }

    return this.$el;
  }
});