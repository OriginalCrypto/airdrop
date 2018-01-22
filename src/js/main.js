import Bootstrap from './bootstrap';

import App       from './app';
import Root      from './root/root';
import Admin     from './admin/admin';
/*
import Register  from './register/register';
*/

const app = new App();

const root = app.addComponent({
  name: 'root',
  componentClass: Root,
  isRoot: true
});

root.addComponent({
  name: 'admin',
  componentClass: Admin
});
/*
root.addComponent({
  name: 'register',
  componentClass: Region,
  active: true

});
*/

app.start();

