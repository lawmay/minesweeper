/**
 *  PanelView
 *
 *
 */

var PanelView = Backbone.View.extend({
  tagName: 'div',
  className: 'panel-container',
  initialize: function() {
    this.buttonViews = [];

    _.each(this.model.buttons, function(button) {
      this.buttonViews.push(new ButtonView({
        model: this.model.get(button.type)
      }));
    }.bind(this));
  },
  render: function() {
    this.$el.css({
      'height': window.innerHeight
    });

    _.each(this.buttonViews, function(buttonView) {
      this.$el.append(buttonView.render());
    }.bind(this));

    return this.$el;
  }
});