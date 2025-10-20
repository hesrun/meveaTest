"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* -------------------------------------------------------------------------- */

/*                            initParallaxMouseMove                           */

/* -------------------------------------------------------------------------- */
function initParallaxMouseMove() {
  var mouseX = 0;
  var mouseY = 0;
  window.addEventListener('mousemove', function (e) {
    var centerX = window.innerWidth / 2;
    var centerY = window.innerHeight / 2;
    mouseX = e.pageX - centerX;
    mouseY = e.pageY - centerY;
  });
  var paralaxElements = document.querySelectorAll('.move-paralax');
  paralaxElements.forEach(function (block) {
    var currentX = 0;
    var currentY = 0;

    function animate() {
      var ease = 0.05;
      currentX += (mouseX - currentX) * ease;
      currentY += (mouseY - currentY) * ease;
      block.style.setProperty('--mouse-x', "".concat(currentX, "px"));
      block.style.setProperty('--mouse-y', "".concat(currentY, "px"));
      requestAnimationFrame(animate);
    }

    animate();
  });
}
/* -------------------------------------------------------------------------- */

/*                              startAnimations;                              */

/* -------------------------------------------------------------------------- */


function startAnimations() {
  var tlh = gsap.timeline({
    defaults: {
      duration: 0.6,
      ease: 'power2.out'
    }
  });
  tlh.from('.header__logo', {
    x: -50,
    opacity: 0
  });
  tlh.from('.header__drop', {
    x: 50,
    opacity: 0
  }, '-=0.3');
  tlh.from('.header__currency', {
    opacity: 0
  }, '-=0.3');
  tlh.from('.header__actions', {
    x: 50,
    opacity: 0
  }, '-=0.3');
  tlh.from('.header-menu-btn', {
    opacity: 0
  }, '-=0.3');
  var tlbg = gsap.timeline({
    defaults: {
      duration: 1,
      ease: 'power2.out'
    }
  });
  tlbg.from('.main-section__text-img', {
    x: -100,
    opacity: 0,
    delay: 0.6
  });
  tlbg.from('.main-section__car-img', {
    x: 100,
    opacity: 0
  }, '-=0.5');
  tlbg.from('.main-section__graham-img', _defineProperty({
    opacity: 0
  }, "opacity", 0), '-=0.5');
  var tlContnt = gsap.timeline({
    defaults: {
      duration: 1,
      ease: 'power2.out'
    }
  });
  tlContnt.from('.main-section__text', {
    y: 50,
    opacity: 0,
    delay: 1
  });
  tlContnt.from('.main-section__coins', {
    opacity: 0
  }, '-=0.5');
}
/* -------------------------------------------------------------------------- */

/*                              scrollAnimations                              */

/* -------------------------------------------------------------------------- */


function scrollAnimations() {
  gsap.registerPlugin(ScrollTrigger);
  var titlesBlocks = document.querySelectorAll('.section-title');
  var coinCards = document.querySelectorAll('.coin-card .coin-card');
  titlesBlocks.forEach(function (title) {
    gsap.from(title, {
      x: 50,
      opacity: 0,
      duration: 0.3,
      scrollTrigger: {
        trigger: title,
        start: 'top 80%' //markers: true,

      }
    });
  });
  gsap.from('.coins-cards .coin-card', {
    opacity: 0,
    x: 50,
    duration: 0.6,
    stagger: 0.2,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: '.coins-cards',
      start: 'top 80%',
      toggleActions: 'play none none none'
    }
  });
}

window.addEventListener('load', function () {
  var loader = document.querySelector('.loader');
  gsap.to('.loader', {
    opacity: 0,
    duration: 0.5,
    onComplete: function onComplete() {
      return loader.style.display = 'none';
    }
  });
  initParallaxMouseMove();
  startAnimations();
  scrollAnimations();
});