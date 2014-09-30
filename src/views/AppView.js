/**
 *  AppView
 *
 *  View for the entire app. Renders the grid and the side-panel.
 */

var AppView = Backbone.View.extend({
  className: 'app-container',
  initialize: function() {
    this.gridView = new GridView({  // Create view for the grid
      collection: this.model.get('grid')
    }, gridSize);

    this.panelView = new PanelView({  // Create view for the side-panel
      model: this.model.get('panel')
    });
  },
  render: function() {
    this.$el.append(this.gridView.render());
    this.$el.append(this.panelView.render());
    return this.$el;
  }
});