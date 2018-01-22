import _                      from 'underscore';
import Backbone               from 'backbone';
import View                   from './views/root';
import ViewContainerComponent from '../_base/view-container-component';

let _self;

const Root = ViewContainerComponent.extend({
  appChannel: 'root',
  initialize: function (options) {
    _self = this;
    if (!_.isObject(this.view)) {
      this.setView(new View());
    }
    this.listenTo(this.view, 'render', this.onViewRender); 
  },
  onViewRender: function () {
    // TODO: grab regions to put sub views in
    let region = this
      .getView()
      .getRegion('root');
    
    // TODO: show the view in the appropriate region
    //        viewComponent.showView(region);
    let componentsArray = Object.values(this.components),
        activeComponent = _.find(componentsArray,
          function (component) {
            return component.options.active;
          }),
        firstComponent = _.first(componentsArray);

    let candidateComponent = activeComponent || firstComponent;

    if (candidateComponent) {
      candidateComponent.showView(region);
      //region.show(candidateComponent.getView());
    } else {
      throw new Error('no components to show');
    }
  }
});

export default Root;

