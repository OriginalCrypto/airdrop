import _              from 'underscore';
import Marionette     from 'backbone.marionette'; 
import ComponentMixin from '../_mixins/component';
import ContainerMixin from '../_mixins/container';
import ViewableMixin  from '../_mixins/viewable';

const ViewContainerComponent = Marionette.Object.extend({
  constructor(options) {
    this._initComponent();
    this._initContainer();
    Marionette.Object.apply(this, arguments);

    if (options && options.view) {
      this.setView(options.view);
    }
  }
});

_.extend(ViewContainerComponent.prototype, ComponentMixin, ContainerMixin, ViewableMixin);

export default ViewContainerComponent;
