import Marionette  from 'backbone.marionette';
import tmpl        from '../templates/admin.chbs';
let _self;

const AdminView = Marionette.View.extend({
  initialize: function (options) {
  },
  template: function (data) {
    return tmpl();
  },
  regions: {
    main: '#admin'
  }
});

export default AdminView;
