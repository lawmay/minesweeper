/**
 *  ButtonView
 *
 *
 */

var ButtonView = Backbone.View.extend({
  tagName: 'div',
  className: 'button-view',
  initialize: function() {

  },
  events: {
    'click': function() {
      this.model.buttonClick();
    }
  },
  render: function() {
    this.$el.html(this.model.get('text'));
    return this.$el;
  }
});