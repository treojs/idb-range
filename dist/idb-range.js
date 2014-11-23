!function(e){if("object"==typeof exports&&"undefined"!=typeof module)module.exports=e();else if("function"==typeof define&&define.amd)define([],e);else{var f;"undefined"!=typeof window?f=window:"undefined"!=typeof global?f=global:"undefined"!=typeof self&&(f=self),f.idbRange=e()}}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){

/**
 * Parse `key` to valid range.
 * https://developer.mozilla.org/en-US/docs/Web/API/IDBKeyRange
 *
 * Available options (inspired by mongodb):
 *   gt: - greater
 *   lt: - lighter
 *   gte: - greater equal
 *   lte: - lighter equal
 *
 * @param {Object} key
 * @return {IDBKeyRange}
 */

module.exports = function parseRange(key) {
  var IDBKeyRange = keyRange();
  if (!key) return;
  if (key instanceof IDBKeyRange) return key;
  if (typeof key != 'object') return IDBKeyRange.only(key);

  var keys = Object.keys(key).sort();

  if (keys.length == 1) {
    var val = key[keys[0]];
    switch (keys[0]) {
      case 'gt':  return IDBKeyRange.lowerBound(val, true);
      case 'lt':  return IDBKeyRange.upperBound(val, true);
      case 'gte': return IDBKeyRange.lowerBound(val);
      case 'lte': return IDBKeyRange.upperBound(val);
    }
  } else {
    var x = key[keys[0]];
    var y = key[keys[1]];

    switch (keys[0] + '-' + keys[1]) {
      case 'gt-lt':   return IDBKeyRange.bound(x, y, true, true);
      case 'gt-lte':  return IDBKeyRange.bound(x, y, true, false);
      case 'gte-lt':  return IDBKeyRange.bound(x, y, false, true);
      case 'gte-lte': return IDBKeyRange.bound(x, y, false, false);
    }
  }
};

/**
 * Dynamic link to `window.IDBKeyRange` for dynamic polyfills.
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