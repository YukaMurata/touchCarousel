var $ = require('jquery');
var velocity = require('velocity-animate');

class Accordion {
    constructor() {
        this.$button = $('.detail__title__icon');
    }

    attachEvent() {
        $('.detail__title__box').on('click', () => {
            if ($('.detail__inner').is(':hidden')) {
                this.openSlide();
                this.openButton();
            } else {
                this.closeSlide();
                this.closeButton();
            }
        });
    }

    openSlide() {
        $('.detail__inner').slideDown();
    }

    closeSlide() {
        $('.detail__inner').slideUp();
    }

    openButton() {
        const $icon1 = $('.icon1');
        const $icon2 = $('.icon2');

        velocity($icon1, 'stop');
        velocity($icon1, {
            rotateZ: 360 + 90
        });
        velocity($icon2, 'stop');
        velocity($icon2, {
            rotateZ: 360
        });
    }

    closeButton() {
        const $icon1 = $('.icon1');
        const $icon2 = $('.icon2');

        velocity($icon1, 'stop');
        velocity($icon1, {
            rotateZ: 0
        });
        velocity($icon2, 'stop');
        velocity($icon2, {
            rotateZ: 0
        });
    }
}
module.exports = Accordion;