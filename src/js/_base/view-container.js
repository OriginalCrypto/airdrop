import ContainerObject  from './container-object';
import Marionette       from 'backbone.marionette';
import ViewableMixin    from '../_mixins/viewable';

const ViewContainer = ContainerObject.extend({
  constructor: function (options) {
    ContainerObject.apply(this, arguments);

    if (options && options.view) {
      this.setView(options.view);
    }
  }
});

_.extend(ViewContainer.prototype, ViewableMixin);

export default ViewContainer;
