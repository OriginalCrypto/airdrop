import ComponentObject from './component-object';
import Marionette from 'backbone.marionette';

const ViewComponent = ComponentObject.extend({
  initialize: function (options) {
    if (options && options.view) {
      this.view = optins.view;
    }
  },
  getView: function () {
    return this.view;
  },
  setView: function (view) {
    if (view && (view instanceof Marionette.View)) {
      this.view = view;
    } else {
      throw new Error('"view" is missing or is not a valid Marionette view');
    }
  },
  showView: function (region) {
    if (region && (region instanceof Marionette.Region)) {
      if (this.view && (this.view instanceof Marionette.View)) {
        region.show(this.view);
      } else {
        throw new Error('"view" is missing or is not a valid Marionette view');
      }
    } else {
      throw new Error('"region" is missing or is not a valid Marionette region');
    }
  }
});

export default ViewComponent;
