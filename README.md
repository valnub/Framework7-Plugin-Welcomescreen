# Framework7 Plugin Welcomescreen

This plugin will show a tutorial screen when starting [Framework7](http://www.framework7.io) apps and websites. (Note: There is also a generic version that does not rely on Framework7 [available](https://github.com/valnub/welcomescreen-mobile))

## Screenshot

<a href="https://raw.githubusercontent.com/valnub/Framework7-Plugin-Welcomescreen/master/screens/screen1.jpg"><img src="https://raw.githubusercontent.com/valnub/Framework7-Plugin-Welcomescreen/master/screens/screen1.jpg" alt="Framwork7 Welcomescreen Plugin Screenshot" width="250"></a>

## Live demo

You can find a running demo [here](http://www.timo-ernst.net/misc/f7-plugin-welcomescreen).

## Install

### 1. Add dependency

#### With module bundler (Webpack, Vite...)

```shell
$ yarn add f7-welcomescreen
```

In your main js file do:

```
import F7WelcomescreenPlugin from 'f7-welcomescreen';
```

In your stylesheet add F7 styles (if not exist yet!). This is when using Webpack:

```
@import '~f7-welcomescreen/styles.css';
```

For Vite

```
@import 'f7-welcomescreen/styles.css';
```

#### Alternative: Without bundler (direct linking)

1. Copy files `f7-welcomescreen.min.js` and `f7-welcomescreen.min.css` from `dist` into your project folder.
2. Reference the files in HTML like this:

```
<head>
  <link rel="stylesheet" href="f7-welcomescreen.min.css"></link>
  <script src="f7-welcomescreen.min.js"></script>
</head>
```

### 3. Define slides

```javascript
var welcomescreen_slides = [
  {
    id: 'slide0',
    title: 'Slide 0', // optional
    picture: '<div class="tutorialicon">♥</div>',
    text: 'Welcome to this tutorial. In the next steps we will guide you through a manual that will teach you how to use this app.',
  },
  {
    id: 'slide1',
    title: 'Slide 1', // optional
    picture: '<div class="tutorialicon">✲</div>',
    text: 'This is slide 2',
  },
  {
    id: 'slide2',
    title: 'Slide 2', // optional
    picture: '<div class="tutorialicon">♫</div>',
    text: 'This is slide 3',
  },
  {
    id: 'slide3',
    //title: 'NO TITLE',
    picture: '<div class="tutorialicon">☆</div>',
    text: 'Thanks for reading! Enjoy this app.<br><br><a id="tutorial-close-btn" href="#">End Tutorial</a>',
  },
];
```

Used parameters are:

- `id` Set an id for this slide
- `picture` Set free html here
- `text` You _can_ set html here but I recommend using just plain text

### 4. Initialize & options

#### For Framework7 Core version

```javascript
Framework7.use(F7WelcomescreenPlugin);

// Define options for welcomescreen plugin
var options = {
  bgcolor: '#0da6ec',
  fontcolor: '#fff',
};

var app = new Framework7({
  root: '#app', // or what ever your root is
  name: 'welcomescreen-demo', // choose a name
  welcomescreen: {
    // Setup welcomescreen plugin
    slides: welcomescreen_slides,
    options: options,
  },
});
```

#### For Framework7 React version

app.js

```javascript
Framework7.use(F7WelcomescreenPlugin);
```

app.jsx

```javascript
var options = {
  bgcolor: '#0da6ec',
  fontcolor: '#fff',
};

const f7params = {
  name: 'welcomescreen-demo',
  theme: 'auto',
  store: store,
  routes: routes,
  welcomescreen: {
    slides: welcomescreen_slides,
    options: options,
  },
};
```

#### For Framework7 Vue version

app.js

```
Framework7.use(F7WelcomescreenPlugin);

const app = createApp(App);
registerComponents(app);
app.mount('#app');
```

In your component add parameters in `onMounted()` and initilize:

```
onMounted(() => {
  f7ready((f7) => {
    f7.welcomescreen.init(welcomescreen_slides, options);
  });
});
```

You can use same values for welcomescreen_slides and options as with React and Core version above.

#### Available options (if not set, default will be used)

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
app.welcomescreen.open(); // Open the screen
app.welcomescreen.close(); // Closes it
app.welcomescreen.next(); // Go to next slide
app.welcomescreen.previous(); // Go to previous slide
app.welcomescreen.slideTo(i); // Go to slide with index i
```

## Example project

See [demo](https://github.com/valnub/Framework7-Plugin-Welcomescreen/tree/master/demo) directory. The demo has the following scripts:

- `yarn start` Starts a http server and serves content from `demo/build`
- `yarn build` Creates a new build into the `demo/build` directory
- `yarn watch` Watches for changes in .js files and runs `yarn build`

I recommend to just run `yarn start` from the demo directory. Then open http://127.0.0.1:8080 in your browser.

## Credits

Made with <3 by www.timo-ernst.net

My YouTube channel about Framework7: http://www.timoernst.tv

Thanks for helping [@nolimits4web](https://twitter.com/nolimits4web)
