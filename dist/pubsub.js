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

const pubsub = {
  onObj: {},
  oneObj: {},

  on(key, fn) {
    if (this.onObj[key] === undefined) {
      this.onObj[key] = [];
    }
    this.onObj[key].push(fn);
  },

  one(key, fn) {
    if (this.oneObj[key] === undefined) {
      this.oneObj[key] = [];
    }
    this.oneObj[key].push(fn);
  },

  off(key) {
    this.onObj[key] = [];
    this.oneObj[key] = [];
  },

  emit() {
    let key;
    let args;
    if (arguments.length === 0) {
      return false;
    }
    key = arguments[0];
    args = [].concat(Array.prototype.slice.call(arguments, 1));

    if (this.onObj[key] !== undefined && this.onObj.length > 0) {
      for (let i in this.onObj[key]) {
        this.onObj[key][i].apply(null, args);
      }
    }

    if (this.oneObj[key] !== undefined && this.oneObj[key].length > 0) {
      for (let i in this.oneObj[key]) {
        this.oneObj[key][i].apply(null, args);
        this.oneObj[key][i] = undefined;
      }
      this.oneObj[key] = [];
    }
    return true;
  },
};

return pubsub;

})));
