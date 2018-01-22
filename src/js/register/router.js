import Backbone   from 'backbone';
import Marionette from 'backbone.marionette';
let _self;


const RegisterRouter = Marionette.AppRouter.extend({
  initialize: function (options) {
    _self = this;
  },
  appRoutes: {
    'register': 'loadRegistration'
  },
  onRoute: function (name, path, args) {
    // TODO: if the account isn't the owner navigate back to root
    /*
    let model = _self.controller.model;

    if (model && model.user) {
      Backbone.history.navigate('play');
    }
    */
  }
});

export default RegisterRouter;
