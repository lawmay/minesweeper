/**
 *  TileView
 *
 *
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
      this.$el.removeClass('covered');
      this.$el.addClass('uncovered');

      if (this.model.get('mine')) {
        this.$el.html('<div class="mine">mine</div>');
      } else {
        var numberColorClasses = [
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
        var adjacentMines = this.model.get('adjacentMines');
        this.$el.html('<div class="' + numberColorClasses[adjacentMines] + '">' + adjacentMines + '</div>');
      }
    } else {
      this.$el.html('');
      this.$el.removeClass('uncovered');
      this.$el.addClass('covered');
    }

    return this.$el;
  }
});