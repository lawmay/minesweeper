/**
 *  AppView
 *
 *
 */

var AppView = Backbone.View.extend({
  className: 'app-container',
  initialize: function() {
    this.gridView = new GridView({
      collection: this.model.get('grid')
    }, gridSize);

    this.panelView = new PanelView({
      model: this.model.get('panel')
    });
  },
  render: function() {

    this.$el.append(this.gridView.render());
    this.$el.append(this.panelView.render());
    return this.$el;
  }
});