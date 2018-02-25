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
   * カルーセルのアニメーション
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
   * スワイプ時の処理
   * @param diff
   */
  moveSlide(diff) {
    //console.log(diff);//動かした差分
    // console.log(this.slideWidth);//コンテンツ幅
    // console.log(this.translateValue[4]);//動いた量
    // console.log(-this.slideWidth * (this.countList() - 1));//動ける量
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
   * スライド
   */
  removeSlide() {

    $(this.target + ' .slide').css('transform', 'translateX(' + this.translateValue[4] + 'px)');

  }

  /**
   * 現在のスライド位置の取得
   * @returns {*|jQuery|number}
   */
  translateData() {
    this.translateValue = $(this.target + ' .slide').css('transform');
    this.translateValue = this.translateValue.split('(')[1];
    this.translateValue = this.translateValue.split(',');
    return this.translateValue;
  }

  /**
   * カウントを1増やす
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
   * カウントを1減らす
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
   * 右にアニメーションさせる位置の計算
   * @returns {number|*}
   */
  decrementSlideWidth() {
    this.slideAnimationValue = this.slideAnimationValue + this.slideWidth;
    return this.slideAnimationValue;
  }

  /**
   * 左にアニメーションさせる位置の計算
   * @returns {number|*}
   */
  incrementSlideWidth() {
    this.slideAnimationValue = this.slideAnimationValue - this.slideWidth;
    return this.slideAnimationValue;
  }

  /**
   * スワイプで左へスライド
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
   * スワイプで右へスライド
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
   * ドットの移動
   */
  slideDotAnimation() {
    this.countList();
    this.$list.removeClass('current');
    this.dot = this.$list.eq(this.slideCount);
    this.dot.addClass('current');
  }

  /**
   * スライド数のカウント
   * @returns {number|*|string}
   */
  countList() {
    this.listCount = this.$list.length;
    return this.listCount;
  }


  /**
   * nextクラスへactiveクラスの追加
   */
  nextArrowAdd() {
    this.$next.addClass('active');
  }


  /**
   * nextクラスからactiveクラスの削除
   */
  nextArrowRemove() {
    this.$next.removeClass('active');
  }

  /**
   * prevクラスへactiveクラスの追加
   */
  prevArrowAdd() {
    this.$prev.addClass('active');
  }

  /**
   * prevクラスからactiveクラスの削除
   */
  prevArrowRemove() {
    this.$prev.removeClass('active');
  }

  /**
   * 矢印の付け替え
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
   * 横スワイプ中の他のイベントを停止
   */
  stopScrollEvent() {
    $('main').on('touchmove.noScroll', function (e) {
      e.preventDefault();
    });
  }

  /**
   * 止めたイベントを再度開始
   */
  restartScrollEvent() {
    $('main').off('.noScroll');
  }


}

module.exports = SliderUi;
