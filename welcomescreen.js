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

  
  var Welcomescreen = function (slides, options) {
    var self = this,
      $$ = Dom7,
      t7 = Template7;

    var defaults = {
      closeButtonText : 'skip',
      closeButton: true,
      cssClass: '',
      pagination: true,
      loop: false
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
              '{{#if picture}}' +
                '<div class="welcomescreen-picture">{{picture}}</div>' +
              '{{/if}}' +
              '{{#if text}}' +
                '<div class="welcomescreen-text">{{text}}</div>' +
              '{{/if}}' +
              '{{#if content}}' +
                '<div class="welcomescreen-content">{{content}}</div>' +
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
      self.swiper.destroy();
      // Remove from Dom
      self.container.remove();
      self.container = self.swiperContainer = null;
    };

    // Open on init
    self.open();
    
    // Return instance
    return self;
  };
  
  app.welcomescreen = function (slides, options) {
    return new Welcomescreen(slides, options);
  };
  
};