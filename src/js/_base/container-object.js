import _              from 'underscore';
import Marionette     from 'backbone.marionette';
import ContainerMixin from '../_mixins/container';

const ContainerObject = Marionette.Object.extend({
  constructor(options) {
    Marionette.Object.apply(this, arguments);
    this._initContainer();
  }
});

_.extend(ContainerObject.prototype, ContainerMixin);

export default ContainerObject;


