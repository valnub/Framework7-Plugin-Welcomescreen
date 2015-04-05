/*jslint browser: true*/
/*global console*/

var myapp = myapp || {};
myapp.pages = myapp.pages || {};

myapp.pages.IndexPageController = function (myapp, $$) {
  'use strict';
  
  // Init method
  (function () {

    var options = {
      'bgcolor': '#0da6ec',
      'fontcolor': '#fff'
    },
      welcomescreen_slides,
      welcomescreen;
    
    welcomescreen_slides = [
      {
        id: 0,
        picture: '<div class="tutorialicon">♥</div>',
        text: 'Welcome to this tutorial. In the next steps we will guide you through a manual that will teach you how to use this app.'
      },
      {
        id: 1,
        picture: '<div class="tutorialicon">✲</div>',
        text: 'This is slide 2'
      },
      {
        id: 2,
        picture: '<div class="tutorialicon">♫</div>',
        text: 'This is slide 3'
      },
      {
        id: 3,
        picture: '<div class="tutorialicon">☆</div>',
        text: 'Thanks for reading! Enjoy this app.<br><br><a id="tutorial-close-btn" href="#">End Tutorial</a>'
      }
    ];

    welcomescreen = myapp.welcomescreen(welcomescreen_slides, options);
    
    $$('#tutorial-close-btn').click(function () {
      welcomescreen.close();
    });
    
  }());

};