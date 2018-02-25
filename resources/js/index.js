import $ from 'jquery';
import SliderUi from './modules/SliderUi';


const slider1 = new SliderUi('.carousel1');
const slider2 = new SliderUi('.carousel2');


var touchStartX = 0;
var touchStartY = 0;
var touchMoveX = 0;
var touchMoveY = 0;
var isAnimation = false;
var isTouched = false;
const slideWidth = $('.slide1 .slide__item').width();
const $carousel1 = $('.carousel1');
const $carousel2 = $('.carousel2');
var moveValue;
var moveRate;
var touchedMoveX = 0;


$('.carousel1 .next').on('click', function () {
  if (slider1.slideIncrementCount()) {
    slider1.slideArrowAnimation();
    slider1.decrementSlideWidth();
    slider1.slideAnimation();
  }
});

$('.carousel1 .prev').on('click', function () {
  if (slider1.slideDecrementCount()) {
    slider1.slideArrowAnimation();
    slider1.incrementSlideWidth();
    slider1.slideAnimation();

  }
});


$carousel1.on('touchstart', function (event) {
  touchStartX = event.touches[0].pageX;
  touchStartY = event.touches[0].pageY;
  slider1.translateData();
  slider1.getSlideValue();
});

$carousel1.on('touchmove', function (event) {
  touchMoveX = event.changedTouches[0].pageX;
  touchMoveY = event.changedTouches[0].pageY;
  const diff = touchMoveX - touchStartX;
  moveRate = touchMoveX / touchMoveY;
  if (diff > 0) {
    slider1.moveSlide(diff);
  } else {
    slider1.moveSlide(diff);
  }
  isTouched = true;
});

$carousel1.on('touchend', function () {
  const moveDiff = touchMoveX - touchStartX;

  if (Math.abs(moveDiff) < slideWidth / 2) {
    slider1.removeSlide();
  } else {
    const diff = touchStartX - touchMoveX;
    if (diff > 0) {
      if (isTouched === true) {
        if (slider1.slideIncrementCount()) {
          slider1.slideArrowAnimation();
          slider1.decrementSlideWidth();
          slider1.slideAnimation();
        }
        isTouched = false;
      }

    } else if (diff < -0) {
      if (isTouched === true) {
        if (slider1.slideDecrementCount()) {
          slider1.slideArrowAnimation();
          slider1.incrementSlideWidth();
          slider1.slideAnimation();

        }
        isTouched = false;
      }
    }
  }
});


$('.carousel2 .next').on('click', function () {
  if (slider2.slideIncrementCount()) {
    slider2.slideArrowAnimation();
    slider2.decrementSlideWidth();
    slider2.slideAnimation();
  }
});

$('.carousel2 .prev').on('click', function () {
  if (slider2.slideDecrementCount()) {
    slider2.slideArrowAnimation();
    slider2.incrementSlideWidth();
    slider2.slideAnimation();

  }
});


$carousel2.on('touchstart', function (event) {
  touchStartX = event.touches[0].pageX;
  touchStartY = event.touches[0].pageY;
  slider2.translateData();
  slider2.getSlideValue();
});

$carousel2.on('touchmove', function (event) {
  touchMoveX = event.changedTouches[0].pageX;
  touchMoveY = event.changedTouches[0].pageY;
  const diff = touchMoveX - touchStartX;
  moveRate = touchMoveX / touchMoveY;
  if (diff > 0) {
    slider2.moveSlide(diff);
  } else {
    slider2.moveSlide(diff);
  }
  isTouched = true;
});

$carousel2.on('touchend', function () {
  const moveDiff = touchMoveX - touchStartX;
  if (Math.abs(moveDiff) < slideWidth / 6) {
    slider2.removeSlide();
  } else {
    const diff = touchStartX - touchMoveX;
    if (diff > 0) {
      if (isTouched === true) {
        if (slider2.slideIncrementCount()) {
          slider2.slideArrowAnimation();
          slider2.decrementSlideWidth();
          slider2.slideAnimation();
        }
        isTouched = false;
      }

    } else if (diff < -0) {
      if (isTouched === true) {
        if (slider2.slideDecrementCount()) {
          slider2.slideArrowAnimation();
          slider2.incrementSlideWidth();
          slider2.slideAnimation();

        }
        isTouched = false;
      }
    }
  }

});