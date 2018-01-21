import Backbone from 'backbone';
import jQuery from 'jquery';

const Bootstrap = function () {
  Backbone.$ = window.$ = window.jQuery = jQuery;
  return Object.hasOwnProperty.call(window, '$');
};

export default Bootstrap();

