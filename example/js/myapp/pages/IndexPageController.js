/*jslint browser: true*/
/*global console*/

var myapp = myapp || {};
myapp.pages = myapp.pages || {};

myapp.pages.IndexPageController = function (myapp, $$) {
  'use strict';
  
  // Init method
  (function () {

    // Use toast plugin
    var options = {},
      welcomescreen_slides,
      welcomescreen = myapp.welcomescreen(options);
    
    welcomescreen_slides = [
      {
        id: 0,
        contenthtml: '<div><br><br><br>Welcome user, this is slide 1<br>Swipe right to see next tutorial page</div>'
      },
      {
        id: 1,
        contenthtml: '<div><br><br><br>This is slide 2</div>'
      },
      {
        id: 2,
        contenthtml: '<div><br><br><br>This is slide 3</div>'
      },
      {
        id: 3,
        contenthtml: '<div><br><br><br>This is slide 4</div>'
      }
    ];
    
    welcomescreen.addSlides(welcomescreen_slides);

  }());

};