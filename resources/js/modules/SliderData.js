import $ from 'jquery';
import anime from 'animejs';

class SliderData {
  constructor() {
    this.index = 0;
    this.$carousel1 = $('.carousel1');
    this.$carousel2 = $('.carousel2');
  }

  touchStartEvent() {
    this.$carousel1.on('touchstart', function (event) {
      touchStartX = event.touches[0].pageX;
      touchStartY = event.touches[0].pageY;
    });
    this.$carousel2.on('touchstart', function (event) {
      touchStartX = event.touches[0].pageX;
      touchStartY = event.touches[0].pageY;
    });
  }

  touchMoveEvent() {
    this.$carousel1.on('touchmove', function (event) {
      touchMoveX = event.changedTouches[0].pageX;
      touchMoveY = event.changedTouches[0].pageY;
      isTouched = true;
    });
    this.$carousel2.on('touchmove', function (event) {
      touchMoveX = event.changedTouches[0].pageX;
      touchMoveY = event.changedTouches[0].pageY;
      isTouched = true;
    });
  }

  touchMoveEvent() {
    this.$carousel1.on('touchend', function () {
        const moveRate = touchMoveX / moveY;
        const diff = touchStartX - touchMoveY;
        if (moveRate > Math.tan(15 * Math.PI / 180)) {
          this.stopScrollEvent();
        }
        if (diff > 35) {
          if (isTouched === true) {
            if (sliderUi.slide1IncrementCount()) {
              sliderUi.slide1ArrowAnimation();
              sliderUi.decrementSlide1Width();
              sliderUi.slide1Animation();
            }
            isTouched = false;
          }

        } else if (diff < -35) {
          if (isTouched === true) {
            if (sliderUi.slide1DecrementCount()) {
              sliderUi.slide1ArrowAnimation();
              sliderUi.incrementSlide1Width();
              sliderUi.slide1Animation();

            }
            isTouched = false;
          }
        }
      }
    );


    this.$carousel2.on('touchend', function () {
      const diff = touchStartX - touchMoveX;
      if (diff > 35) {
        if (isTouched === true) {
          if (sliderUi.slide2IncrementCount()) {
            sliderUi.slide2ArrowAnimation();
            sliderUi.decrementSlide2Width();
            sliderUi.slide2Animation();
          }
          isTouched = false;
        }

      } else if (diff < -35) {
        if (isTouched === true) {
          if (sliderUi.slide2DecrementCount()) {
            sliderUi.slide2ArrowAnimation();
            sliderUi.incrementSlide2Width();
            sliderUi.slide2Animation();

          }
          isTouched = false;
        }
      }

    });
  }

  stopScrollEvent() {
    $('main').on('touchmove.noScroll', function (e) {
      e.preventDefault();
    });
  }

  restartScrollEvent() {
    $('main').off('.noScroll');
  }

}
module.exports = SliderData;
