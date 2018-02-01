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

  offAll(key) {
    this.onObj[key] = [];
    this.oneObj[key] = [];
  },

  off(key, fn) {
    if (typeof fn !== 'function') {
      throw Error('pubsub.off only accept a function as the second parameter.');
    }

    for (let i = 0; i < this.onObj.length; i += 1) {
      const ifn = this.onObj[i];
      if (fn === ifn) {
        this.onObj.splice(i, 1);
      }
    }

    for (let i = 0; i < this.oneObj.length; i += 1) {
      const ifn = this.oneObj[i];
      if (fn === ifn) {
        this.oneObj.splice(i, 1);
      }
    }
  },

  emit() {
    let key;
    let args;
    if (arguments.length === 0) {
      return false;
    }
    key = arguments[0];
    args = [].concat(Array.prototype.slice.call(arguments, 1));

    if (this.onObj[key] !== undefined && this.onObj[key].length > 0) {
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

export default pubsub;
