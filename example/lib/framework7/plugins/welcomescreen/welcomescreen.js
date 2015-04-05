/*jslint browser: true*/
/*global console, Framework7, alert, Dom7, Swiper*/

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
      swiper,
      $swiperContainer,
      $closebtn,
      $wscreen;
    
    function initSwiper() {
      swiper = new Swiper('.swiper-container', {
        direction: 'horizontal',
        loop: false,
        pagination: '.swiper-pagination'
      });
    }
    
    function addSlides() {
      var i,
        $swiperwrapper = $swiperContainer.find('.swiper-wrapper');
      
      for (i = 0; i < slides.length; i = i + 1) {
        $swiperwrapper.append($$('<div class="swiper-slide">').html('<div class="welcomescreen-picture">' + slides[i].picture + '</div><div class="welcomescreen-text">' + slides[i].text + '</div>'));
      }
      
      initSwiper();
    }
    
    function removeWelcomeScreen() {
      $closebtn.off('click');
      swiper.destroy();
      $wscreen.remove();
    }
    
    this.close = function () {
      removeWelcomeScreen();
    };
    
    function setOptions() {
      if (options) {
        if (options.bgcolor) {
          $wscreen.css({
            'background-color': options.bgcolor,
            'color': options.fontcolor
          });
        }
        if (options.fontcolor) {
          $closebtn.css({
            'color': options.fontcolor
          });
        }
      }
    }
    
    // Init
    (function () {
      var clientLeft;
      
      $wscreen = $$('<div class="welcomescreen-container">');
      $closebtn = $$('<div class="welcomescreen-closebtn">');
      $swiperContainer = $$('<div class="welcomescreen-swiper swiper-container">').html('<div class="swiper-wrapper"></div><div class="swiper-pagination"></div>');
      $wscreen.append($closebtn);
      $wscreen.append($swiperContainer);
      $closebtn.html('skip').click(removeWelcomeScreen);
      $$('body').append($wscreen);
      console.log(options);
      setOptions();
      addSlides();
      
    }());
    
    return this;
  };
  
  app.welcomescreen = function (slides, options) {
    return new Welcomescreen(slides, options);
  };
  
};