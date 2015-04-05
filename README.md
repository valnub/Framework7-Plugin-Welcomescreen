# Framework7 Plugin Welcomescreen

## Just a quick plugin for Framework 7

This will display a fullscreen swipeable modal window to guide the user through a welcome screen (as requested here http://www.idangero.us/framework7/forum/#!/framework7/feature-requests%23request-centered-large-mod).

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

4) How to close it

```javascript
$$('#some-button').click(function () {
  welcomescreen.close();
});
```

That's it :-)
Enjoy

Made with <3 by www.timo-ernst.net
