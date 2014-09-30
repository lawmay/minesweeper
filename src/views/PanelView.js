/**
 *  PanelView
 *
 *  View for the side-panel.
 */

var PanelView = Backbone.View.extend({
  tagName: 'div',
  className: 'panel-container',
  initialize: function() {
    this.buttonViews = [];

    _.each(this.model.buttons, function(button) {   // Create button view for each button in the buttons array
      this.buttonViews.push(new ButtonView({
        model: this.model.get(button.type)
      }));
    }.bind(this));
  },
  render: function() {
    this.$el.css({    // Side-panel should take up entire height of screen
      'height': window.innerHeight
    });

    _.each(this.buttonViews, function(buttonView) { // Render each button view
      this.$el.append(buttonView.render());
    }.bind(this));

    return this.$el;
  }
});