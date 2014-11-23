!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.idbRange=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/**
 * Parse `opts` to valid IDBKeyRange.
 * https://developer.mozilla.org/en-US/docs/Web/API/IDBKeyRange
 *
 * @param {optsect} opts
 * @return {IDBKeyRange}
 */

module.exports = function range(opts) {
  var IDBKeyRange = keyRange();
  if (typeof opts != 'object') throw new TypeError('invalid range');
  if (opts instanceof IDBKeyRange) return opts;
  var keys = Object.keys(opts).sort();

  if (keys.length == 1) {
    var key = keys[0];
    var val = opts[key];
    switch (keys[0]) {
      case 'eq': return IDBKeyRange.only(val);
      case 'gt': return IDBKeyRange.lowerBound(val, true);
      case 'lt': return IDBKeyRange.upperBound(val, true);
      case 'gte': return IDBKeyRange.lowerBound(val);
      case 'lte': return IDBKeyRange.upperBound(val);
      default: throw new TypeError('`' + key + '` is not valid key');
    }
  } else {
    var x = opts[keys[0]];
    var y = opts[keys[1]];
    var pattern = keys.join('-');

    switch (pattern) {
      case 'gt-lt': return IDBKeyRange.bound(x, y, true, true);
      case 'gt-lte': return IDBKeyRange.bound(x, y, true, false);
      case 'gte-lt': return IDBKeyRange.bound(x, y, false, true);
      case 'gte-lte': return IDBKeyRange.bound(x, y, false, false);
      default: throw new TypeError('`' + pattern +'` are conflicted keys');
    }
  }
};

/**
 * Dynamic link to `window.IDBKeyRange` for `window.IDBKeyRange` polyfills.
 *
 * @return {IDBKeyRange}
 */

function keyRange() {
  return window.IDBKeyRange
      || window.webkitIDBKeyRange
      || window.msIDBKeyRange;
}

},{}]},{},[1])(1)
});