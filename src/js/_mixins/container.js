import _ from 'underscore';

export default {
  _initContainer() {
    this.on('destroy', this._destroyContainer);
  },
  _destroyContainer() {
    const components = _.values(this.getComponents());
    components.forEach(component => component.setContainer(null));
    delete this.components;
  },
  addComponent (options) {
    const name = _.result(options, 'name');
    if (!name || typeof name !== 'string') {
      throw new Error('"name" is missing or is not a valid string');
    }

    if (!options || typeof options !== 'object') {
      throw new Error('"options is missing or is not an object');
    }

    if (!_.has(options, 'componentClass')) {
      throw new Error('missing "componentClass" option');
    }

    if (typeof options.componentClass !== 'function') {
      throw new Error('"componentClass" option is not a valid function');
    }

    let componentOptions = _.omit(options, 'componentClass'),
        component = new options.componentClass(componentOptions);

    if (component.setContainer) {
      component.setContainer(this);
    }

    this.getComponents()[name] = component;

    return component;

  },
  getComponent(name) {
    return this.getComponents()[name];
  },
  getComponents() {
    const components = this.components || (this.components = {});
    return components;
  }
};
