/**
 *  Panel
 *
 *
 */

var Panel = Backbone.Model.extend({
  initialize: function() {
    this.buttons = [
      {
        type: 'validateButton',
        text: 'Validate'
      },
      {
        type: 'newGameButton',
        text: 'New Game'
      },
      {
        type: 'cheatButton',
        text: 'Cheat'
      },
    ];

    _.each(this.buttons, function(button) {
      this.set(button.type, new Button(button.text));

      this.get(button.type).on('buttonClick', function(currentButton) {
        this.trigger('handleButtonClick', button.type);
      }.bind(this));
    }.bind(this));
  },
});
