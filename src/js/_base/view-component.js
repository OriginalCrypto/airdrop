import _                from 'underscore';
import ComponentObject  from './component-object';
import Marionette       from 'backbone.marionette';
import ViewableMixin    from '../_mixins/viewable';

const ViewComponent = ComponentObject.extend({
  constructor: function (options) {
    ComponentObject.apply(this, arguments);

    if (options && options.view) {
      this.setView(options.view);
    }
  }
});

_.extend(ViewComponent.prototype, ViewableMixin);

export default ViewComponent;
