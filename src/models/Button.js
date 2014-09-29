/**
 *  Button
 *
 *
 */

var Button = Backbone.Model.extend({
  initialize: function(text) {
    this.set('text', text);
  },
  buttonClick: function() {
    this.trigger('buttonClick', this);
  }
});