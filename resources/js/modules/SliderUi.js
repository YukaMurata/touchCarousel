import $ from 'jquery';
import anime from 'animejs';

var EventEmitter = require('events').EventEmitter;

class SliderUi extends EventEmitter {
  constructor(target) {
    super();
    this.target = target;
    this.slideWidth = $('.slide1 .slide__item').width();
    this.slideCount = 0;
    this.slideAnimationValue = 0;
    this.$next = $(target + ' .next');
    this.$prev = $(target + ' .prev');
    this.animateScroll = '';
    this.$list = $(target + ' .nav li');
    this.dot = '';
    this.listCount = '';
    this.slideLength = '';
    // this.countSlide(target);
    this.diffValue = 0;
    this.translateValue = 0;
    this.slideLength = $(target + ' .slide__item').length;
    this.slideCount = 0;
  }

  /**
   * �J���[�Z���̃A�j���[�V����
   */
  slideAnimation() {
    this.slideDotAnimation();
    this.stopScrollEvent();
    anime({
      targets: this.target + ' .slide',
      translateX: -this.slideAnimationValue,
      easing: 'linear',
      duration: 300,
      complete: () => {
        this.restartScrollEvent();
      }
    });
  }

  /**
   * �X���C�v���̏���
   * @param diff
   */
  moveSlide(diff) {
    //console.log(diff);//������������
    // console.log(this.slideWidth);//�R���e���c��
    // console.log(this.translateValue[4]);//��������
    // console.log(-this.slideWidth * (this.countList() - 1));//�������
    if (diff < -30) {
      if (this.translateValue[4] != 0 && this.translateValue[4] > -this.slideWidth * (this.countList() - 1)) {
        $(this.target + ' .slide').css('transform', 'translateX(' + (-this.slideAnimationValue + diff) + 'px)');
      } else if (this.slideAnimationValue === 0) {
        $(this.target + ' .slide').css('transform', 'translateX(' + diff + 'px)');
      } else if (this.translateValue[4] <= this.slideWidth * (this.countList() - 1)) {
        return false;
      }
    } else if (diff > 30) {
      if (this.translateValue[4] != 0 && this.translateValue[4] > -this.slideWidth * (this.countList() - 1)) {
        $(this.target + ' .slide').css('transform', 'translateX(' + (-this.slideAnimationValue + diff) + 'px)');
      } else if (this.slideAnimationValue === 0) {
        return false;
      } else {
        $(this.target + ' .slide').css('transform', 'translateX(' + (-this.slideAnimationValue + diff) + 'px)');
      }
    }

    this.emit('end');
  }

  /**
   *
   * @returns {number|*}
   */
  getSlideValue() {
    const slideValue = this.slideAnimationValue;
    return slideValue;
  }

  /**
   * �X���C�h
   */
  removeSlide() {

    $(this.target + ' .slide').css('transform', 'translateX(' + this.translateValue[4] + 'px)');

  }

  /**
   * ���݂̃X���C�h�ʒu�̎擾
   * @returns {*|jQuery|number}
   */
  translateData() {
    this.translateValue = $(this.target + ' .slide').css('transform');
    this.translateValue = this.translateValue.split('(')[1];
    this.translateValue = this.translateValue.split(',');
    return this.translateValue;
  }

  /**
   * �J�E���g��1���₷
   * @returns {boolean}
   */
  slideIncrementCount() {
    if (this.slideCount >= this.slideLength - 1) {
      return false;
    } else {
      this.slideCount++;
      return true;
    }
  }

  /**
   * �J�E���g��1���炷
   * @returns {boolean}
   */
  slideDecrementCount() {
    if (this.slideCount <= 0) {
      return false;
    } else {
      this.slideCount--;
      return true;
    }
  }

  /**
   * �E�ɃA�j���[�V����������ʒu�̌v�Z
   * @returns {number|*}
   */
  decrementSlideWidth() {
    this.slideAnimationValue = this.slideAnimationValue + this.slideWidth;
    return this.slideAnimationValue;
  }

  /**
   * ���ɃA�j���[�V����������ʒu�̌v�Z
   * @returns {number|*}
   */
  incrementSlideWidth() {
    this.slideAnimationValue = this.slideAnimationValue - this.slideWidth;
    return this.slideAnimationValue;
  }

  /**
   * �X���C�v�ō��փX���C�h
   * @param diff
   * @returns {number|*}
   */
  decrementDiffValue(diff) {
    console.log(diff);
    if (diff < 0 && diff > -this.slideWidth) {
      this.slideAnimationValue = this.slideAnimationValue - diff;
    } else if (diff < -this.slideWidth || this.slideAnimationValue > this.slideWidth) {
      this.slideAnimationValue = this.slideWidth;
    }
    return this.slideAnimationValue;
  }

  /**
   * �X���C�v�ŉE�փX���C�h
   * @param diff
   * @returns {number|*}
   */
  incrementDiffValue(diff) {
    if (diff > 0 && diff < this.slideWidth) {
      this.slideAnimationValue = this.slideAnimationValue + diff;
    } else {
      this.slideAnimationValue = this.slideAnimationValue - this.slideWidth;
    }

    return this.slideAnimationValue;
  }

  /**
   * �h�b�g�̈ړ�
   */
  slideDotAnimation() {
    this.countList();
    this.$list.removeClass('current');
    this.dot = this.$list.eq(this.slideCount);
    this.dot.addClass('current');
  }

  /**
   * �X���C�h���̃J�E���g
   * @returns {number|*|string}
   */
  countList() {
    this.listCount = this.$list.length;
    return this.listCount;
  }


  /**
   * next�N���X��active�N���X�̒ǉ�
   */
  nextArrowAdd() {
    this.$next.addClass('active');
  }


  /**
   * next�N���X����active�N���X�̍폜
   */
  nextArrowRemove() {
    this.$next.removeClass('active');
  }

  /**
   * prev�N���X��active�N���X�̒ǉ�
   */
  prevArrowAdd() {
    this.$prev.addClass('active');
  }

  /**
   * prev�N���X����active�N���X�̍폜
   */
  prevArrowRemove() {
    this.$prev.removeClass('active');
  }

  /**
   * ���̕t���ւ�
   */
  slideArrowAnimation() {
    if (this.slideCount === this.slideLength - 1) {
      this.nextArrowRemove();
      this.prevArrowAdd();
    } else {
      if (this.slideCount === 0) {
        this.prevArrowRemove();
        this.nextArrowAdd();
      } else {
        this.prevArrowAdd();
      }
    }
  }

  /**
   * ���X���C�v���̑��̃C�x���g���~
   */
  stopScrollEvent() {
    $('main').on('touchmove.noScroll', function (e) {
      e.preventDefault();
    });
  }

  /**
   * �~�߂��C�x���g���ēx�J�n
   */
  restartScrollEvent() {
    $('main').off('.noScroll');
  }


}

module.exports = SliderUi;
