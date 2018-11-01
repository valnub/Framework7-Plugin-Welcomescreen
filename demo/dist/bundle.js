/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_f7_welcomescreen__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_f7_welcomescreen___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_f7_welcomescreen__);


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
  Framework7.use(__WEBPACK_IMPORTED_MODULE_0_f7_welcomescreen___default.a);

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


/***/ }),
/* 1 */
/***/ (function(module, exports) {

/**
 * A plugin for Framework7 to show a slideable welcome screen
 *
 * @module Framework7/prototype/plugins/welcomescreen
 * @author www.timo-ernst.net
 * @license MIT
 */
var F7WelcomescreenPlugin = {
  // Module Name
  name: 'welcomescreen',

  /**
   * Represents the welcome screen
   *
   * @class
   * @memberof module:Framework7/prototype/plugins/welcomescreen
   */
  Welcomescreen: function (app, slides, options) {

    // Private properties
    var self = this,
      defaultTemplate,
      template,
      container,
      swiper,
      swiperContainer,
      defaults = {
        closeButton: true,        // enabled/disable close button
        closeButtonText : 'Skip', // close button text
        cssClass: '',             // additional class on container
        pagination: true,         // swiper pagination, 
        navigation: false,        // swiper navigation
        loop: false,              // swiper loop
        open: true,               // open welcome screen on init
        parallax: false,          // adds parallax capabilities
        parallaxSpeed: 600,       // parallax default speed
        parallaxBackgroundImage: 'http://lorempixel.com/900/600/nightlife/2/', // parallax default background image
        parallaxBackground: '-23%', // parallax default background effect
        parallaxSlideElements: {
            title: -100, 
            subtitle: -300, 
            text: -500
        }
      };
    
    /**
     * Initializes the swiper
     *
     * @private
     */
    function initSwiper() {
      swiper = window.swiper.create('.welcomescreen-swiper', {
        direction: 'horizontal',
        loop: options.loop,
        pagination: options.pagination ? { el: '.swiper-pagination' } : undefined,
        parallax: options.parallax, 
        speed: options.parallaxSpeed
      });
    }
    
    /**
     * Sets colors from options
     *
     * @private
     */
    function setColors() {
      if (options.bgcolor) {
        container.css({
          'background-color': options.bgcolor,
          'color': options.fontcolor
        });
      }
    }
    
    /**
     * Sets the default template
     *
     * @private
     */
    function defineDefaultTemplate() {
      defaultTemplate = '<div class="welcomescreen-container {{#if options.cssClass}}{{options.cssClass}}{{/if}}">' +
          '{{#if options.closeButton}}' +
          '<div class="welcomescreen-closebtn close-welcomescreen">{{options.closeButtonText}}</div>' +
          '{{/if}}' +
          '<div class="welcomescreen-swiper">' +
            '{{#if options.parallax}}<div class="parallax-bg" style="background-image:url({{options.parallaxBackgroundImage}})" data-swiper-parallax="{{options.parallaxBackground}}"></div>{{/if}}' +
                '<div class="swiper-wrapper">' +
                  '{{#each slides}}' +
                  '<div class="swiper-slide" {{#if id}}id="{{id}}"{{/if}}>' +
                    '<div class="welcomescreen-title {{#unless title}}hide-title{{/unless}}" data-swiper-parallax="{{#if parallaxTitle}}{{parallaxTitle}}{{else}}{{@root.options.parallaxSlideElements.title}}{{/if}}">{{#if title}}{{title}}{{else}}title{{/if}}</div>' +
                    '{{#if content}}' +
                      '<div class="welcomescreen-content">{{content}}</div>' +
                    '{{else}}' +
                      '{{#if picture}}' +
                        '<div class="welcomescreen-picture" data-swiper-parallax="{{#if parallaxPicture}}{{parallaxPicture}}{{else}}{{@root.options.parallaxSlideElements.subtitle}}{{/if}}">{{picture}}</div>' +
                      '{{/if}}' +
                      '{{#if text}}' +
                        '<div class="welcomescreen-text" data-swiper-parallax="{{#if parallaxText}}{{parallaxText}}{{else}}{{@root.options.parallaxSlideElements.text}}{{/if}}">{{text}}</div>' +
                      '{{/if}}' +
                    '{{/if}}' +
                  '</div>' +
                  '{{/each}}' +
                '</div>' +
                '{{#if options.pagination}}' +
                '<div class="welcomescreen-pagination swiper-pagination"></div>' +
                '{{/if}}' +
                '{{#if options.navigation}}' +
                '<!-- If we need navigation buttons -->' + 
                '<div class="welcomescreen-navigation-prev swiper-button-prev"></div>' + 
                '<div class="welcomescreen-navigation-next swiper-button-next"></div>' + 
                '{{/if}}' +
            '</div>' +
          '</div>' +
        '</div>';
    }
    
    /**
     * Sets the options that were required
     *
     * @private
     */
    function applyOptions() {
      var def;
      options = options || {};
      for (def in defaults) {
        if (typeof options[def] === 'undefined') {
          options[def] = defaults[def];
        }
      }
    }
    
    /**
     * Compiles the template
     *
     * @private
     */
    function compileTemplate() {
      if (!options.template) {
        template = window.Template7.compile(defaultTemplate);
      } else {
        template = window.Template7.compile(options.template);
      }
    }
    
    /**
     * Shows the welcome screen
     *
     * @public
     * @memberof module:Framework7/prototype/plugins/welcomescreen
     */
    self.open = function () {
      container = window.Dom7(template({options: options, slides: slides}));
      swiperContainer = container.find('.welcomescreen-swiper');
      setColors();
      window.Dom7('body').append(container);
      initSwiper();
      container[0].f7Welcomescreen = self;
      if (typeof options.onOpened === 'function') { options.onOpened(); }
    };

    /**
     * Hides the welcome screen
     *
     * @public
     * @memberof module:Framework7/prototype/plugins/welcomescreen
     */
    self.close = function () {
      if (swiper) { swiper.destroy(true); }
      if (container) { container.remove(); }
      container = swiperContainer = swiper = undefined;
      if (typeof options.onClosed === 'function') { options.onClosed(); }
    };
    
   /**
     * Shows the next slide
     *
     * @public
     * @memberof module:Framework7/prototype/plugins/welcomescreen
     */
    self.next = function () {
      if (swiper) { swiper.slideNext(); }
    };
    
   /**
     * Shows the previous slide
     *
     * @public
     * @memberof module:Framework7/prototype/plugins/welcomescreen
     */
    self.previous = function () {
      if (swiper) { swiper.slidePrev(); }
    };
    
   /**
     * Goes to the desired slide
     *
     * @param {number} index The slide to show
     * @public
     * @memberof module:Framework7/prototype/plugins/welcomescreen
     */
    self.slideTo = function (index) {
      if (swiper) { swiper.slideTo(index); }
    };
    
    /**
     * Initialize the instance
     *
     * @method init
     */
    (function () {
      defineDefaultTemplate();
      compileTemplate();
      applyOptions();
      
      // Open on init
      if (options.open) {
        self.open();
      }
      
    }());
    
    // Return instance
    return self;
  },

  params: {
    welcomescreen: {
      options: {},
      slides: [],
    }
  },

	install() {
		var css = '.welcomescreen-container{position:absolute;top:0;right:0;bottom:0;left:0;background-color:#fff;z-index:10500;color:#666;font-size:16px}.welcomescreen-closebtn{top:5px;right:5px;position:absolute;text-align:right;z-index:9998;font-size:14px;padding:15px;cursor:pointer}.welcomescreen-swiper{position:relative;width:100%;height:100%}.welcomescreen-picture,.welcomescreen-title{width:100%;text-align:center;margin-top:20%}.welcomescreen-text{position:absolute;bottom:65px;left:0;right:0;padding-left:20px;padding-right:20px;text-align:center}.welcomescreen-content{padding:15px}.welcomescreen-container .swiper-pagination-bullet{background:rgba(255,255,255,.9)!important}.welcomescreen-container .swiper-pagination-bullet-active{background:#fff}.swiper-container-horizontal>.swiper-pagination{bottom:20px}html.with-statusbar-overlay .welcomescreen-container{top:20px}.parallax-bg{position:absolute;left:0;top:0;width:130%;height:100%;-webkit-background-size:cover;background-size:cover;background-position:center}.hide-title{opacity:0}';
    var head = document.head || document.getElementsByTagName('head')[0];
    var style = document.createElement('style');

		style.type = 'text/css';
		if (style.styleSheet){
			style.styleSheet.cssText = css;
		} else {
			style.appendChild(document.createTextNode(css));
		}

		head.appendChild(style);
	},

  /* Event handlers */
  on: {
    init() {
      window.Dom7 = this.$;
      window.Template7 = this.t7;
      window.swiper = this.swiper;

      // Click handler to close welcomescreen
      window.Dom7(document).on('click', '.close-welcomescreen', function (e) {
        e.preventDefault();
        var $wscreen = window.Dom7(this).parents('.welcomescreen-container');
        if ($wscreen.length > 0 && $wscreen[0].f7Welcomescreen) { $wscreen[0].f7Welcomescreen.close(); }
      });

      var app = this;
      var params = app.params.welcomescreen;
      app.welcomescreen = new F7WelcomescreenPlugin.Welcomescreen(app, params.slides, params.options);
    },
  },
};

module.exports = F7WelcomescreenPlugin;


/***/ })
/******/ ]);