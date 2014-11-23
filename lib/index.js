
/**
 * Parse `range` to valid range.
 * https://developer.mozilla.org/en-US/docs/Web/API/IDBKeyRange
 *
 * Available options (inspired by mongodb):
 *   eq - equal
 *   gt - greater
 *   lt - lighter
 *   gte - greater equal
 *   lte - lighter equal
 *
 * @param {Object} range
 * @return {IDBKeyRange}
 */

module.exports = function parseRange(range) {
  var IDBKeyRange = keyRange();
  if (!range) return;
  if (range instanceof IDBKeyRange) return range;
  if (typeof range != 'object') throw new TypeError('invalid range');
  var keys = Object.keys(range).sort();

  if (keys.length == 1) {
    var key = keys[0];
    var val = range[key];
    switch (keys[0]) {
      case 'eq': return IDBKeyRange.only(val);
      case 'gt': return IDBKeyRange.lowerBound(val, true);
      case 'lt': return IDBKeyRange.upperBound(val, true);
      case 'gte': return IDBKeyRange.lowerBound(val);
      case 'lte': return IDBKeyRange.upperBound(val);
      default: throw new TypeError('`' + key + '` is not valid key');
    }
  } else {
    var x = range[keys[0]];
    var y = range[keys[1]];
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
