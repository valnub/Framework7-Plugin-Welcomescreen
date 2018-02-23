import welcomescreen from 'f7-welcomescreen';

document.addEventListener("DOMContentLoaded", function(event) { 
  var options = {
    'bgcolor': '#0da6ec',
    'fontcolor': '#fff', 

    // Parallax example – Remove comments to test it out:

    // parallax: true|false, 
    // parallaxBackgroundImage: 'http://lorempixel.com/900/600/nightlife/2/', // parallax default background image
    // parallaxBackground: '-23%', // parallax default background effect
    /* parallaxSlideElements: {
          title: -100, 
          subtitle: -300, 
          text: -500
      }, */

    'onOpened': function () {
      console.log("welcome screen opened");
    },
    'onClosed': function () {
      console.log("welcome screen closed");
    }
  };

  var welcomescreen_slides = [
    {
      id: 'slide0', 
      title: 'Slide 1', 
      picture: '<div class="tutorialicon">♥</div>',
      text: 'Welcome to this tutorial. In the <a class="tutorial-next-link" href="#">next steps</a> we will guide you through a manual that will teach you how to use this app.<br><br>Swipe to continue →'
    },
    {
      id: 'slide1',
      title: 'Slide 2', 
      picture: '<div class="tutorialicon">✲</div>',
      text: 'This is slide 2<br><br>Swipe to continue →'
    },
    {
      id: 'slide2',
      title: 'Slide 3', 
      picture: '<div class="tutorialicon">♫</div>',
      text: 'This is slide 3<br><br>Swipe to continue →'
    },
    {
      id: 'slide3',
      // title: 'NO TITLE', 
      picture: '<div class="tutorialicon">☆</div>',
      text: 'Thanks for reading! Enjoy this app or go to <a class="tutorial-previous-slide" href="#">previous slide</a>.<br><br><a class="tutorial-close-btn" href="#">End Tutorial</a>'
    } 
  ];

  // Tell F7 to use the plugin
  Framework7.use(welcomescreen);

  // Initialize Framework7 + plugin
  var app = new Framework7({
    root: '#app',
    name: 'welcomescreen-demo',
    id: 'de.timoernst.f7.welcomescreen',
    welcomescreen: {
      slides: welcomescreen_slides,
      options: options,
    },
  });

  var mainView = app.views.create('.view-main');
  
  Dom7(document).on('click', '.tutorial-close-btn', function () {
    app.welcomescreen.close();
  });

  Dom7('.tutorial-open-btn').click(function () {
    app.welcomescreen.open();  
  });
  
  Dom7(document).on('click', '.tutorial-next-link', function (e) {
    app.welcomescreen.next(); 
  });
  
  Dom7(document).on('click', '.tutorial-previous-slide', function (e) {
    app.welcomescreen.previous(); 
  });

});
