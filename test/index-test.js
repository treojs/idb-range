var expect = require('chai').expect;
var range = require('../lib');

describe('idb-parse', function() {
  var x = '1', y = '2', z = '3', val;

  before(function() {
    if (window.IDBKeyRange) return;

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
      return new IDBKeyRange(value, undefined, open || false, true);
    };
    IDBKeyRange.upperBound = function(value, open) {
      return new IDBKeyRange(undefined, value, true, open || false);
    };
    IDBKeyRange.bound = function(lower, upper, lowerOpen, upperOpen) {
      return new IDBKeyRange(lower, upper, lowerOpen || false, upperOpen || false);
    };

    // expose to `window`.
    window.IDBKeyRange = IDBKeyRange;
  });

  it('validates arguments', function() {
    expect(function() { range({ g: 2 }) }).throw('`g` is not valid key');
    expect(function() { range({ gt: 2, gte: 5 }) }).throw('conflicted keys');
    expect(function() { range({ lt: 'a', gte: 'ba', lte: 'c' }) }).throw('conflicted keys');
    expect(function() { range(1) }).throw('invalid range');
  });

  it('all keys <= x', function() {
    val = range({ lte: x });
    expect(val.upperOpen).false;
    expect(val.lowerOpen).true;
    expect(val.upper).equal(x);
    expect(val.lower).undefined;
  });

  it('all keys < x', function() {
    val = range({ lt: x });
    expect(val.upperOpen).true;
    expect(val.lowerOpen).true;
    expect(val.upper).equal(x);
    expect(val.lower).undefined;
  });

  it('all keys >= y', function() {
    val = range({ gte: y });
    expect(val.upperOpen).true;
    expect(val.lowerOpen).false;
    expect(val.upper).undefined;
    expect(val.lower).equal(y);
  });

  it('all keys > y', function() {
    val = range({ gt: y });
    expect(val.upperOpen).true;
    expect(val.lowerOpen).true;
    expect(val.upper).undefined;
    expect(val.lower).equal(y);
  });

  it('all keys >= x && <= y', function() {
    val = range({ lte: y, gte: x });
    expect(val.upperOpen).false;
    expect(val.lowerOpen).false;
    expect(val.upper).equal(y);
    expect(val.lower).equal(x);
  });

  it('all keys > x && < y', function() {
    val = range({ gt: x, lt: y });
    expect(val.upperOpen).true;
    expect(val.lowerOpen).true;
    expect(val.upper).equal(y);
    expect(val.lower).equal(x);
  });

  it('all keys > x && <= y', function() {
    val = range({ gt: x, lte: y });
    expect(val.upperOpen).false;
    expect(val.lowerOpen).true;
    expect(val.upper).equal(y);
    expect(val.lower).equal(x);
  });

  it('all keys >= x && < y', function() {
    val = range({ lt: y, gte: x });
    expect(val.upperOpen).true;
    expect(val.lowerOpen).false;
    expect(val.upper).equal(y);
    expect(val.lower).equal(x);
  });

  it('the key = z', function() {
    val = range({ eq: z });
    expect(val.upperOpen).false;
    expect(val.lowerOpen).false;
    expect(val.upper).equal(z);
    expect(val.lower).equal(z);
  });
});
