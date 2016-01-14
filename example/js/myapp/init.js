/*jslint browser: true*/
/*global console, Framework7, angular, Dom7*/

var myapp = myapp || {};

myapp.init = (function () {
  'use strict';
  
  var exports = {};
  
  document.addEventListener("DOMContentLoaded", function(event) { 
    // Initialize app
    var fw7App = new Framework7(),
      fw7ViewOptions = {
        dynamicNavbar: true,
        domCache: true
      },
      mainView = fw7App.addView('.view-main', fw7ViewOptions),
      $$ = Dom7,
      ipc = new myapp.pages.IndexPageController(fw7App, $$);
  });
  
  return exports;

}());