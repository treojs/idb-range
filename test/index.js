var expect = require('chai').expect
var range = require('../lib')
if (!global.IDBKeyRange) require('idb-polyfill').polyfill()

describe('idb-range', function() {
  var x = '1'
  var y = '2'
  var z = ['3', '4']
  var val

  it('validates arguments', function() {
    expect(function() { range({ g: 2 }) }).throw('`g` is not valid key')
    expect(function() { range({ gt: 2, gte: 5 }) }).throw('conflicted keys')
    expect(function() { range({ lt: 'a', gte: 'ba', lte: 'c' }) }).throw('conflicted keys')
  })

  it('all keys <= x', function() {
    val = range({ lte: x })
    expect(val.upperOpen).false
    expect(val.lowerOpen).true
    expect(val.upper).equal(x)
    expect(val.lower).undefined
  })

  it('all keys < x', function() {
    val = range({ lt: x })
    expect(val.upperOpen).true
    expect(val.lowerOpen).true
    expect(val.upper).equal(x)
    expect(val.lower).undefined
  })

  it('all keys >= y', function() {
    val = range({ gte: y })
    expect(val.upperOpen).true
    expect(val.lowerOpen).false
    expect(val.upper).undefined
    expect(val.lower).equal(y)
  })

  it('all keys > y', function() {
    val = range({ gt: y })
    expect(val.upperOpen).true
    expect(val.lowerOpen).true
    expect(val.upper).undefined
    expect(val.lower).equal(y)
  })

  it('all keys >= x && <= y', function() {
    val = range({ lte: y, gte: x })
    expect(val.upperOpen).false
    expect(val.lowerOpen).false
    expect(val.upper).equal(y)
    expect(val.lower).equal(x)
  })

  it('all keys > x && < y', function() {
    val = range({ gt: x, lt: y })
    expect(val.upperOpen).true
    expect(val.lowerOpen).true
    expect(val.upper).equal(y)
    expect(val.lower).equal(x)
  })

  it('all keys > x && <= y', function() {
    val = range({ gt: x, lte: y })
    expect(val.upperOpen).false
    expect(val.lowerOpen).true
    expect(val.upper).equal(y)
    expect(val.lower).equal(x)
  })

  it('all keys >= x && < y', function() {
    val = range({ lt: y, gte: x })
    expect(val.upperOpen).true
    expect(val.lowerOpen).false
    expect(val.upper).equal(y)
    expect(val.lower).equal(x)
  })

  it('the key = z', function() {
    val = range({ eq: z })
    expect(val.upperOpen).false
    expect(val.lowerOpen).false
    expect(val.upper).eql(z)
    expect(val.lower).eql(z)
  })

  it('allows any value', function() {
    val = range(z)
    expect(val.upperOpen).false
    expect(val.lowerOpen).false
    expect(val.upper).eql(z)
    expect(val.lower).eql(z)
  })

  it('returns nothing when key is undefined', function() {
    global.shimIndexedDB
      ? expect(range()).undefined
      : expect(range()).null
  })
})
