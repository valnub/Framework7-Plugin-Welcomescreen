/*jslint browser: true*/
/*global console*/

var myapp = myapp || {};
myapp.pages = myapp.pages || {};

myapp.pages.IndexPageController = function (myapp, $$) {
  'use strict';
  
  // Init method
  (function () {

    var options = {},
      welcomescreen_slides,
      welcomescreen;
    
    welcomescreen_slides = [
      {
        id: 0,
        contenthtml: '<div class="welcomecontent">Welcome user, this is slide 1<br>Swipe right to see next tutorial page</div>'
      },
      {
        id: 1,
        contenthtml: '<div class="welcomecontent">This is slide 2</div>'
      },
      {
        id: 2,
        contenthtml: '<div class="welcomecontent">This is slide 3</div>'
      },
      {
        id: 3,
        contenthtml: '<div class="welcomecontent">This is slide 4</div>'
      }
    ];
    
    welcomescreen = myapp.welcomescreen(welcomescreen_slides, options);
    
  }());

};