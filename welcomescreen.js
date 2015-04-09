/*jslint browser: true*/
/*global console, Framework7, alert, Dom7, Swiper, Template7*/

/**
 * A plugin for Framework7 to show a slideable welcome screen
 *
 * @module Framework7/prototype/plugins/welcomescreen
 * @author www.timo-ernst.net
 * @license MIT
 */
Framework7.prototype.plugins.welcomescreen = function (app, globalPluginParams) {
  'use strict';
  
  // Variables in module scope
  var $$ = Dom7,
    t7 = Template7,
    Welcomescreen;

  // Click handler to close welcomescreen
  $$(document).on('click', '.close-welcomescreen', function (e) {
    e.preventDefault();
    var $wscreen = $$(this).parents('.welcomescreen-container');
    if ($wscreen.length > 0 && $wscreen[0].f7Welcomescreen) { $wscreen[0].f7Welcomescreen.close(); }
  });
  
  /**
   * Represents the welcome screen
   *
   * @class
   * @memberof module:Framework7/prototype/plugins/welcomescreen
   */
  Welcomescreen = function (slides, options) {
    
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
        pagination: true,         // swiper pagination
        loop: false,              // swiper loop
        open: true                // open welcome screen on init
      };
    
    /**
     * Initializes the swiper
     *
     * @private
     */
    function initSwiper() {
      swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: options.loop,
        pagination: options.pagination ? swiperContainer.find('.swiper-pagination') : undefined
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
        // Cache compiled templates
        if (!app._compiledTemplates.welcomescreen) {
          app._compiledTemplates.welcomescreen = t7.compile(defaultTemplate);
        }
        template = app._compiledTemplates.welcomescreen;
      } else {
        template = t7.compile(options.template);
      }
    }
    
    /**
     * Shows the welcome screen
     *
     * @public
     * @memberof module:Framework7/prototype/plugins/welcomescreen
     */
    self.open = function () {
      container = $$(template({options: options, slides: slides}));
      swiperContainer = container.find('.swiper-container');
      setColors();
      $$('body').append(container);
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
  };
  
  app.welcomescreen = function (slides, options) {
    return new Welcomescreen(slides, options);
  };
  
};