import Marionette  from 'backbone.marionette';
import tmpl        from '../templates/register.chbs';
let _self;

const RegisterView = Marionette.View.extend({
  initialize: function (options) {
    _self = this;
  },
  template: function (data) {
    if (_self.model) {
      return tmpl(_self.model.toJSON());
    } else {
      return tmpl();
    }
  },
  regions: {
    main: '#registration'
  }
});

export default RegisterView;
