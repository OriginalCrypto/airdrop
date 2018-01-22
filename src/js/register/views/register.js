import Marionette  from 'backbone.marionette';
import tmpl        from '../templates/register.chbs';
let _self;

const RegisterView = Marionette.View.extend({
  initialize: function (options) {
  },
  template: function (data) {
    return tmpl();
  },
  regions: {
    main: '#registration'
  }
});

export default RegisterView;
