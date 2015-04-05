/*jslint browser: true*/
/*global console, Framework7, alert, Dom7, Swiper, Template7*/

/**
 * A plugin for Framework7 to show a slideable welcome screen
 *
 * @author www.timo-ernst.net
 * @license MIT
 */
Framework7.prototype.plugins.welcomescreen = function (app, globalPluginParams) {
  'use strict';
  // Global Vars
  var $$ = Dom7,
      t7 = Template7;

  // Click handler to close welcomescreen
  $$(document).on('click', '.close-welcomescreen', function (e) {
    e.preventDefault();
    var $wscreen = $$(this).parents('.welcomescreen-container');
    if ($wscreen.length > 0 && $wscreen[0].f7Welcomescreen) $wscreen[0].f7Welcomescreen.close();
  });
  // Class
  var Welcomescreen = function (slides, options) {
    var self = this;

    var defaults = {
      closeButton: true, //enabled/disable close button
      closeButtonText : 'skip', //close button text
      cssClass: '', //additional class on container
      pagination: true,//swiper pagination
      loop: false, //swiper loop
      open: true, //open welcome screen on init
    };
    options = options || {};
    for (var def in defaults) {
        if (typeof options[def] === 'undefined') {
            options[def] = defaults[def];
        }
    }
    self.options = options;


    // Default Template
    var defaultTemplate = 
      '<div class="welcomescreen-container {{#if options.cssClass}}option.cssClass{{/if}}">' +
        '{{#if options.closeButton}}' +
        '<div class="welcomescreen-closebtn close-welcomescreen">{{options.closeButtonText}}</div>' +
        '{{/if}}' +
        '<div class="welcomescreen-swiper swiper-container">' +
          '<div class="swiper-wrapper">' +
            '{{#each slides}}' +
            '<div class="swiper-slide" {{#if id}}id="{{id}}"{{/if}}>' +
              '{{#if content}}' +
                '<div class="welcomescreen-content">{{content}}</div>' +
              '{{else}}' +
                '{{#if picture}}' +
                  '<div class="welcomescreen-picture">{{picture}}</div>' +
                '{{/if}}' +
                '{{#if text}}' +
                  '<div class="welcomescreen-text">{{text}}</div>' +
                '{{/if}}' +
              '{{/if}}' +
            '</div>' +
            '{{/each}}' +
          '</div>' +
          '{{#if options.pagination}}' +
          '<div class="welcomescreen-pagination swiper-pagination"></div>' +
          '{{/if}}' +
        '</div>' +
      '</div>';

    // Compile Template
    var template;
    if (!self.options.template) {
      // Cache compiled templates
      if (!app._compiledTemplates.welcomescreen) {
        app._compiledTemplates.welcomescreen = t7.compile(defaultTemplate);
      }
      template = app._compiledTemplates.welcomescreen;
    }
    else {
      template = t7.compile(self.options.template);
    }
    
    
    self.initSwiper = function () {
      self.swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: options.loop,
        pagination: options.pagination ? self.swiperContainer.find('.swiper-pagination') : undefined
      });
    };
    
    self.setColors = function () {
      if (options.bgcolor) {
        self.container.css({
          'background-color': options.bgcolor,
          'color': options.fontcolor
        });
      }
    };
    
    // Open
    self.open = function () {
      self.container = $$(template({options: options, slides: slides}));
      self.swiperContainer = self.container.find('.swiper-container');
      // Set Colors
      self.setColors();
      // Append to Body
      $$('body').append(self.container);
      // Init Swiper
      self.initSwiper();

      // Save instance link in Dom element
      self.container[0].f7Welcomescreen = self;
    };

    // Close
    self.close = function () {
      // Destroy Swiper
      if (self.swiper) self.swiper.destroy(true);
      // Remove from Dom
      if (self.container) self.container.remove();
      self.container = self.swiperContainer = self.swiper = null;
    };

    // Open on init
    if (options.open) {
      self.open();
    }
    
    // Return instance
    return self;
  };
  
  app.welcomescreen = function (slides, options) {
    return new Welcomescreen(slides, options);
  };
  
};