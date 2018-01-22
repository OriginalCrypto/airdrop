import _              from 'underscore';
import Backbone       from 'backbone';
import Router         from './router';
import View           from './views/admin';
import ViewComponent  from '../_base/view-component';

let _self;

const Admin = ViewComponent.extend({
  appChannel: 'admin',
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
  loadAdmin: function () {
    // TODO: use sed or gulp to insert file path to console.log for all js files
    console.log('[src/js/admin/admin] we called loadAdmin');

    let region = _self
      .getContainer()
      .getView()
      .getRegion('root');
    
    this.showView(region);
  }
});

export default Admin;

