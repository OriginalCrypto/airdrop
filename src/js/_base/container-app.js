import _              from 'underscore';
import Marionette     from 'backbone.marionette';
import ContainerMixin from '../_mixins/container';

const ContainerApp = Marionette.Application.extend({
  constructor(options) {
    this._initContainer();
    Marionette.Application.apply(this, arguments);
  }
});


_.extend(ContainerApp.prototype, ContainerMixin);

export default ContainerApp;
