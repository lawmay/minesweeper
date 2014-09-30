/**
 *  Panel
 *
 *  Model for side-panel or options.
 *  Buttons: Validate, New Game, Cheat
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

    // For each button in buttons array, create a new button
    // and attach button click event
    _.each(this.buttons, function(button) {
      this.set(button.type, new Button(button.text));

      this.get(button.type).on('buttonClick', function(currentButton) {
        this.trigger('handleButtonClick', button.type);
      }.bind(this));
    }.bind(this));
  },
});
