# Framework7 Plugin Welcomescreen

## Just a quick plugin for Framework 7

This will display a fullscreen swipeable modal window to guide the user through a welcome screen (as requested here http://www.idangero.us/framework7/forum/#!/framework7/feature-requests%23request-centered-large-mod).

(Note: There is also a generic version that does not rely on Framework7 available here: https://github.com/valnub/welcomescreen-mobile)

## Screenshot

![Welcome screen](https://raw.githubusercontent.com/valnub/Framework7-Plugin-Welcomescreen/master/screens/screen1.png)

## Live demo

http://www.timo-ernst.net/misc/f7-plugin-welcomescreen

## Setup

1) Copy welcomescreen.css and welcomescreen.js to your project and reference them:

```html
<link rel="stylesheet" href="welcomescreen.css">
<script src="welcomescreen.js"></script>
```

2) Define slides

```javascript
var welcomescreen_slides = [
  {
    id: 'slide0',
    title: 'Slide 0', // optional
    picture: '<div class="tutorialicon">♥</div>',
    text: 'Welcome to this tutorial. In the next steps we will guide you through a manual that will teach you how to use this app.'
  },
  {
    id: 'slide1',
    title: 'Slide 1', // optional
    picture: '<div class="tutorialicon">✲</div>',
    text: 'This is slide 2'
  },
  {
    id: 'slide2',
    title: 'Slide 2', // optional
    picture: '<div class="tutorialicon">♫</div>',
    text: 'This is slide 3'
  },
  {
    id: 'slide3',
    //title: 'NO TITLE', 
    picture: '<div class="tutorialicon">☆</div>',
    text: 'Thanks for reading! Enjoy this app.<br><br><a id="tutorial-close-btn" href="#">End Tutorial</a>'
  }
];
```

Parameters

- *id* Set an id for this slide
- *picture* Set free html here
- *text* You *can* set html here but I recommend using just plain text

3) Initialize & options

```javascript
var myapp = new Framework7();
var options = {
  'bgcolor': '#0da6ec',
  'fontcolor': '#fff'
}
var welcomescreen = myapp.welcomescreen(welcomescreen_slides, options);
```

Available options (if not set, default will be used)

- **bgcolor** Set background color
- **fontcolor** Set font color
- **closeButton** (Default: true) Enabled/disable close button
- **closeButtonText** (Default: 'Skip') Close button text
- **cssClass** (Default: '') Additional class on container
- **pagination** (Default: true) Swiper pagination
- **navigation** (Default: false) Swiper navigation
- **loop** (Default: false) Swiper loop
- **template** (Default: String) Pass in a custom Dom7 template to render Welcomescreen
- **open** (Default: true) Open welcome screen on init
- **onOpened** (Default: none) Callback function when welcomescreen is opened
- **onClosed** (Default: none) Callback function when welcomescreen is closed
- **parallax** (Default: true), Enable parallax
- **parallaxBackgroundImage** (Default: 'http://lorempixel.com/900/600/nightlife/2/') Parallax default background image
- **parallaxBackground** (Default **percentage**: '-23%') Parallax default background speed effect
- **parallaxSlideElements** (Default **number** per element: {title: -100, subtitle: -200, text: -300}) Set speed of each element in parallax mode

### Note:
- **number** - value in px (as for title, subtitle in example above) to move element depending on progress. In this case such element will be moved on ± this value in px depending on slide position (next or previous)
- **percentage** - (as for "parallax-bg") to move element depending on progress and on its size. In this case such element will be moved on ± this percentage of its size (width in horizontal direction, and height in vertical direction) depending on slide position (next or previous). So if element has 400px width and you specified data-swiper-parallax="50%" then it will be moved on ± 200px

## API

The following methods are available on a welcomescreen instance

```javascript
welcomescreen.open();         // Open the screen
welcomescreen.close();        // Closes it
welcomescreen.next();         // Go to next slide
welcomescreen.previous();     // Go to previous slide
welcomescreen.slideTo(i); // Go to slide with index i
```

## Credits

Thanks to Vladi for improvements http://www.idangero.us

Made with <3 by www.timo-ernst.net

My YouTube channel about Framework7: http://youtube.com/xvalmar
