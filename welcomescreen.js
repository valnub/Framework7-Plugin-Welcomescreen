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
  
  var Welcomescreen = function (options) {
    var self = this,
      $$ = Dom7,
      slides,
      swiper,
      $swiper;
    
    function initSwiper() {
      swiper = new Swiper('.welcomescreen-swiper', {
        // Optional parameters
        direction: 'horizontal',
        loop: false,

        // If we need pagination
        pagination: '.welcomescreen-swiper-pagination'
      });
    }
    
    this.addSlides = function (slidesarray) {
      var i = 0,
        $swiperwrapper;
      
      slides = slidesarray;
      $swiperwrapper = $swiper.find('.swiper-wrapper');
      
      for (var i in slidesarray){
        $swiperwrapper.append($$(slidesarray[i].contenthtml).addClass('swiper-slide'));
      }
      
      initSwiper();
    };
    
    // Init
    (function () {
      // Create box
      var $wscreen = $$('<div class="welcomescreen-container">'),
        clientLeft,
        $closebtn = $$('<div class="welcomescreen-closebtn">');
      
      $swiper = $$('<div class="welcomescreen-swiper">').html('<div class="swiper-wrapper"></div><div class="swiper-pagination"></div>');
      
      // Add content
      // TODO
      $wscreen.html('');
      
      $wscreen.append($closebtn);
      $wscreen.append($swiper);
      
      $closebtn.html('x').click(
        function () {
          $wscreen.remove();
        }
      );
      
      // Add to DOM
      $$('body').append($wscreen);
      
      // Hide box on click
      $wscreen.find('.welcomescreen-closebtn').click(function () {
        $wscreen.remove();
      });
    }());
    
    return this;
  };
  
  app.welcomescreen = function (options) {
    return new Welcomescreen(options);
  };
  
};