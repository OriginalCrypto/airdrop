import Backbone      from 'backbone';
import View          from './views/root';
import ViewComponent from '../_base/view-component';

let _self;
  

const Root = ViewComponent.extend({
  appChannel: 'root',
  initialize: function (options) {
    _self = this;
    this.view = new View();

    // TODO: instantiate sub view components
    //        viewComponent = new ViewComponent();

    this.listenTo(this.view, 'render', this.onViewRender); 
  },
  onViewRender: function () {
    // TODO: grab regions to put sub views in
    //       let region = this.view.getRegion('<some-region>');
    
    // TODO: show the view in the appropriate region
    //        viewComponent.showView(region);
  }
});

export default Root;

