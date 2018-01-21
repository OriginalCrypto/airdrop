import Bootstrap from './bootstrap';

import App       from './app';
import Root      from './root/root';

const app = new App();

app.addComponent({
  name: 'root',
  componentClass: Root,
  isRoot: true
});

app.start();

