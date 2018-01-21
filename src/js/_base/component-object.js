import _              from 'underscore';
import Marionette     from 'backbone.marionette'; 
import ComponentMixin from '../_mixins/component';

const ComponentObject = Marionette.Object.extend({
  constructor(options) {
    this._initComponent();
    Marionette.Object.apply(this, arguments);
  }
});

_.extend(ComponentObject.prototype, ComponentMixin);

export default ComponentObject;
