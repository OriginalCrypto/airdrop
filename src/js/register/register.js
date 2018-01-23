import _              from 'underscore';
import Backbone       from 'backbone';
import Router         from './router';
import View           from './views/register';
import ViewComponent  from '../_base/view-component';
import Ethereum       from '../utilities/ethereum';

let _self;

const Register = ViewComponent.extend({
  appChannel: 'register',
  initialize: function (options) {
    _self = this;
    let mainAccount = { address: Ethereum
      .getWeb3()
      .eth
      .accounts[0]
    },
    model = new Backbone.Model(mainAccount);

  (function(view, m) {
    _self.interval = window.setInterval(function() {
      m.set({ address: Ethereum.getWeb3().eth.accounts[0] });
    }, 5000);
  })(this, model);

    if (!_.isObject(this.view)) {
      this.setView(new View({ model: model }));
    } else {
      this.view.model.set(mainAccount);
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
  },
  onBeforeDestroy: function () {
    window.clearInterval(_self.interval);
  }
});

export default Register;

