import jQuery from 'jquery';

const Bootstrap = function () {
  window.$ = window.jQuery = jQuery;
  return Object.hasOwnProperty.call(window, '$');
};

export default Bootstrap();

