# Framework7 Plugin Welcomescreen

## Just a quick plugin for Framework 7

This will display a fullscreen swipeable modal window to guide the user through a welcome screen.

## Live demo

http://www.timo-ernst.net/misc/f7-plugin-welcomescreen

## Setup

1) Copy welcomescreen.css and welcomescreen.js to your project and reference them:

```html
<link rel="stylesheet" href="welcomescreen.css">
<script src="welcomescreen.js"></script>
```

2) Define slides. You can use any html as parameter "contenthtml".

```javascript
var welcomescreen_slides = [
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
```

3) Initialize

```javascript
var app = new Framework7();
app.welcomescreen(welcomescreen_slides);
```

I also recommend to set a small margin-top or content will collide with close button:

```css
.welcomecontent{
  margin-top: 60px;
}
```

That's it :-)
Enjoy

Made with <3 by www.timo-ernst.net
