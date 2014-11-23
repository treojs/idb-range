var expect = require('chai').expect;
var range = require('../lib');

describe('idb-range', function() {
  before(function() {
    var IDBKeyRange = function(lower, upper, lowerOpen, upperOpen) {
      this.lower = lower;
      this.upper = upper;
      this.lowerOpen = lowerOpen;
      this.upperOpen = upperOpen;
    };
    IDBKeyRange.only = function(value) {
      return new IDBKeyRange(value, value, false, false);
    };
    IDBKeyRange.lowerBound = function(value, open) {
      return new IDBKeyRange(value, undefined, open, undefined);
    };
    IDBKeyRange.upperBound = function(value) {
      return new IDBKeyRange(undefined, value, undefined, open);
    };
    IDBKeyRange.bound = function(lower, upper, lowerOpen, upperOpen) {
      return new IDBKeyRange(lower, upper, lowerOpen, upperOpen);
    };
    // expose to `window`.
    window.IDBKeyRange = IDBKeyRange;
  });

  it('validates arguments', function() {
    expect(function() { range({ g: 2 }) }).throw('`g` is not valid key');
    expect(function() { range({ gt: 2, gte: 5 }) }).throw('conflicted keys');
    expect(function() { range({ lt: 'a', gte: 'ba', lte: 'c' }) }).throw('conflicted keys');
  });
});
