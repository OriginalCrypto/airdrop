import Marionette  from 'backbone.marionette';
import tmpl        from '../templates/root.chbs';
let _self;

const RootView = Marionette.View.extend({
  initialize: function (options) {
  },
  template: function (data) {
    return tmpl();
  },
  regions: {
    root: '.root-container',
    // TODO: add regions for sub views
  }
});

export default RootView;
