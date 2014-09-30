/**
 *  ButtonView
 *
 *  View for each button in the side-panel.
 */

var ButtonView = Backbone.View.extend({
  tagName: 'div',
  className: 'button-view',
  initialize: function() {

  },
  events: {
    'click': function() {       // Call function on model when clicked
      this.model.buttonClick(); // We need to pass the event up to App to be handled by the Grid
    }
  },
  render: function() {
    this.$el.html(this.model.get('text'));  // Add text from buttons object to the button
    return this.$el;
  }
});