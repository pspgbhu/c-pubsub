(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.pubsub = factory());
}(this, (function () { 'use strict';

/**
 * @author pspgbhu <brotherchun001@gmail.com>
 *
 * @Reference http://taobaofed.org/blog/2016/11/17/react-components-communication/
 */

var pubsub = {
  onObj: {},
  oneObj: {},

  on: function on(key, fn) {
    if (this.onObj[key] === undefined) {
      this.onObj[key] = [];
    }
    this.onObj[key].push(fn);
  },
  one: function one(key, fn) {
    if (this.oneObj[key] === undefined) {
      this.oneObj[key] = [];
    }
    this.oneObj[key].push(fn);
  },
  offAll: function offAll(key) {
    this.onObj[key] = [];
    this.oneObj[key] = [];
  },
  off: function off(key, fn) {
    if (typeof fn !== 'function') {
      throw Error('pubsub.off only accept a function as the second parameter.');
    }

    for (var i = 0; i < this.onObj.length; i += 1) {
      var ifn = this.onObj[i];
      if (fn === ifn) {
        this.onObj.splice(i, 1);
      }
    }

    for (var _i = 0; _i < this.oneObj.length; _i += 1) {
      var _ifn = this.oneObj[_i];
      if (fn === _ifn) {
        this.oneObj.splice(_i, 1);
      }
    }
  },
  emit: function emit() {
    var key = void 0;
    var args = void 0;
    if (arguments.length === 0) {
      return false;
    }
    key = arguments[0];
    args = [].concat(Array.prototype.slice.call(arguments, 1));

    if (this.onObj[key] !== undefined && this.onObj[key].length > 0) {
      for (var i in this.onObj[key]) {
        this.onObj[key][i].apply(null, args);
      }
    }

    if (this.oneObj[key] !== undefined && this.oneObj[key].length > 0) {
      for (var _i2 in this.oneObj[key]) {
        this.oneObj[key][_i2].apply(null, args);
        this.oneObj[key][_i2] = undefined;
      }
      this.oneObj[key] = [];
    }
    return true;
  }
};

return pubsub;

})));
