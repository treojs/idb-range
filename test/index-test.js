var expect = require('chai').expect;
var parseRange = require('../lib');

describe('idb-range', function() {
  var x = '1', y = '2', z = '3', range;

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
    expect(function() { parseRange({ g: 2 }) }).throw('`g` is not valid key');
    expect(function() { parseRange({ gt: 2, gte: 5 }) }).throw('conflicted keys');
    expect(function() { parseRange({ lt: 'a', gte: 'ba', lte: 'c' }) }).throw('conflicted keys');
    expect(function() { parseRange(1) }).throw('invalid range');
  });

  it('all keys ≤ x', function() {
    range = parseRange({ lte: x });
    expect(range.upperOpen).false;
    expect(range.lowerOpen).true;
    expect(range.upper).equal(x);
    expect(range.lower).undefined;
  });

  it('all keys < x', function() {
    range = parseRange({ lt: x });
    expect(range.upperOpen).true;
    expect(range.lowerOpen).true;
    expect(range.upper).equal(x);
    expect(range.lower).undefined;
  });

  it('all keys ≤ y', function() {
    range = parseRange({ gte: y });
    expect(range.upperOpen).true;
    expect(range.lowerOpen).false;
    expect(range.upper).undefined;
    expect(range.lower).equal(y);
  });

  it('all keys > y', function() {
    range = parseRange({ gt: y });
    expect(range.upperOpen).true;
    expect(range.lowerOpen).true;
    expect(range.upper).undefined;
    expect(range.lower).equal(y);
  });

  it('all keys ≤ x && ≤ y', function() {
    range = parseRange({ lte: x, gte: y });
    expect(range.upperOpen).false;
    expect(range.lowerOpen).false;
    expect(range.upper).equal(x);
    expect(range.lower).equal(y);
  });

  it('all keys > x && < y', function() {
    range = parseRange({ lt: x, gt: y });
    expect(range.upperOpen).true;
    expect(range.lowerOpen).true;
    expect(range.upper).equal(x);
    expect(range.lower).equal(y);
  });

  it('all keys > x && ≤ y', function() {
    range = parseRange({ lt: x, gte: y });
    expect(range.upperOpen).true;
    expect(range.lowerOpen).false;
    expect(range.upper).equal(x);
    expect(range.lower).equal(y);
  });

  it('all keys ≤ x && < y', function() {
    range = parseRange({ lte: x, gt: y });
    expect(range.upperOpen).false;
    expect(range.lowerOpen).true;
    expect(range.upper).equal(x);
    expect(range.lower).equal(y);
  });

  it('the key = z', function() {
    range = parseRange({ eq: z });
    expect(range.upperOpen).false;
    expect(range.lowerOpen).false;
    expect(range.upper).equal(z);
    expect(range.lower).equal(z);
  });
});
