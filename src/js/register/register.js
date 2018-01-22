import _              from 'underscore';
import Backbone       from 'backbone';
import Router         from './router';
import View           from './views/register';
import ViewComponent  from '../_base/view-component';

let _self;

const Register = ViewComponent.extend({
  appChannel: 'register',
  initialize: function (options) {
    _self = this;
    if (!_.isObject(this.view)) {
      this.setView(new View());
    }
    this.listenTo(this.view, 'render', this.onViewRender); 
    this.router = new Router({ controller: this });
  },
  onViewRender: function () {
    // TODO: grab regions to put sub views in
    //       let region = this.view.getRegion('<some-region>');
    
    // TODO: show the view in the appropriate region
    //        viewComponent.showView(region);
    
  },
  loadRegistration: function () {
    // TODO: use sed or gulp to insert file path to console.log for all js files
    console.log('[src/js/register/register] we called loadRegistration');

    let region = _self
      .getContainer()
      .getView()
      .getRegion('root');

    region.detachView();

    this.showView(region);
  }
});

export default Register;

