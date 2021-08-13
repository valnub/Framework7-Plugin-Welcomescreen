import Template7 from 'template7';
import Swiper from 'swiper';

// A plugin for Framework7 to show a slideable welcome screen
var F7WelcomescreenPlugin = {
  name: 'welcomescreen',

  Welcomescreen: function (app, slides, options) {
    // Private properties
    var self = this,
      defaultTemplate,
      template,
      container,
      swiper,
      swiperContainer,
      defaults = {
        closeButton: true, // enabled/disable close button
        closeButtonText: 'Skip', // close button text
        cssClass: '', // additional class on container
        pagination: true, // swiper pagination,
        navigation: false, // swiper navigation
        loop: false, // swiper loop
        open: true, // open welcome screen on init
        parallax: false, // adds parallax capabilities
        parallaxSpeed: 600, // parallax default speed
        parallaxBackgroundImage: 'http://lorempixel.com/900/600/nightlife/2/', // parallax default background image
        parallaxBackground: '-23%', // parallax default background effect
        parallaxSlideElements: {
          title: -100,
          subtitle: -300,
          text: -500,
        },
      };

    function initSwiper() {
      swiper = new Swiper('.welcomescreen-swiper', {
        direction: 'horizontal',
        loop: options.loop,
        pagination: options.pagination
          ? { el: '.swiper-pagination' }
          : undefined,
        parallax: options.parallax,
        speed: options.parallaxSpeed,
      });
    }

    function setColors() {
      if (options.bgcolor) {
        container.css({
          'background-color': options.bgcolor,
          color: options.fontcolor,
        });
      }
    }

    function defineDefaultTemplate() {
      defaultTemplate =
        '<div class="welcomescreen-container {{#if options.cssClass}}{{options.cssClass}}{{/if}}">' +
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

    function applyOptions() {
      var def;
      options = options || {};
      for (def in defaults) {
        if (typeof options[def] === 'undefined') {
          options[def] = defaults[def];
        }
      }
    }

    function compileTemplate() {
      const T7 = window.Template7 || Template7;
      if (!options.template) {
        template = T7.compile(defaultTemplate);
      } else {
        template = T7.compile(options.template);
      }
    }

    self.open = function () {
      container = window.Dom7(template({ options: options, slides: slides }));
      swiperContainer = container.find('.welcomescreen-swiper');
      setColors();
      window.Dom7('body').append(container);
      initSwiper();
      container[0].f7Welcomescreen = self;
      if (typeof options.onOpened === 'function') {
        options.onOpened();
      }
    };

    self.close = function () {
      if (swiper) {
        swiper.destroy(true);
      }
      if (container) {
        container.remove();
      }
      container = swiperContainer = swiper = undefined;
      if (typeof options.onClosed === 'function') {
        options.onClosed();
      }
    };

    self.next = function () {
      if (swiper) {
        swiper.slideNext();
      }
    };

    self.previous = function () {
      if (swiper) {
        swiper.slidePrev();
      }
    };

    self.slideTo = function (index) {
      if (swiper) {
        swiper.slideTo(index);
      }
    };

    (function () {
      defineDefaultTemplate();
      compileTemplate();
      applyOptions();

      // Open on init
      if (options.open) {
        self.open();
      }
    })();

    // Return instance
    return self;
  },

  params: {
    welcomescreen: {
      options: {},
      slides: [],
    },
  },

  /* Event handlers */
  on: {
    init: function () {
      window.Dom7 = this.$;
      window.swiper = this.swiper;

      // Click handler to close welcomescreen
      window.Dom7(document).on('click', '.close-welcomescreen', function (e) {
        e.preventDefault();
        var $wscreen = window.Dom7(this).parents('.welcomescreen-container');
        if ($wscreen.length > 0 && $wscreen[0].f7Welcomescreen) {
          $wscreen[0].f7Welcomescreen.close();
        }
      });

      var app = this;
      var params = app.params.welcomescreen;
      app.welcomescreen = new F7WelcomescreenPlugin.Welcomescreen(
        app,
        params.slides,
        params.options
      );
    },
  },
};

export default F7WelcomescreenPlugin;
