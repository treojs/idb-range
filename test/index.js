import treoWebsql from 'treo-websql'
import { expect } from 'chai'
import range from '../src'

const x = '1'
const y = '2'
const z = '3'
treoWebsql.polyfill()

describe('idb-range', () => {
  it('validates arguments', () => {
    expect(() => { range({ g: 2 }) }).throw('not valid key')
    expect(() => { range({ gt: 2, gte: 5 }) }).throw('conflicted keys')
    expect(() => { range({ lt: 'a', gte: 'ba', lte: 'c' }) }).throw('conflicted keys')
  })

  it('all keys <= x', () => {
    const val = range({ lte: x })
    expect(val.upperOpen).equal(false)
    expect(val.lowerOpen).equal(true)
    expect(val.upper).equal(x)
    expect(val.lower).equal(undefined)
  })

  it('all keys < x', () => {
    const val = range({ lt: x })
    expect(val.upperOpen).equal(true)
    expect(val.lowerOpen).equal(true)
    expect(val.upper).equal(x)
    expect(val.lower).equal(undefined)
  })

  it('all keys >= y', () => {
    const val = range({ gte: y })
    expect(val.upperOpen).equal(true)
    expect(val.lowerOpen).equal(false)
    expect(val.upper).equal(undefined)
    expect(val.lower).equal(y)
  })

  it('all keys > y', () => {
    const val = range({ gt: y })
    expect(val.upperOpen).equal(true)
    expect(val.lowerOpen).equal(true)
    expect(val.upper).equal(undefined)
    expect(val.lower).equal(y)
  })

  it('all keys >= x && <= y', () => {
    const val = range({ lte: y, gte: x })
    expect(val.upperOpen).equal(false)
    expect(val.lowerOpen).equal(false)
    expect(val.upper).equal(y)
    expect(val.lower).equal(x)
  })

  it('all keys > x && < y', () => {
    const val = range({ gt: x, lt: y })
    expect(val.upperOpen).equal(true)
    expect(val.lowerOpen).equal(true)
    expect(val.upper).equal(y)
    expect(val.lower).equal(x)
  })

  it('all keys > x && <= y', () => {
    const val = range({ gt: x, lte: y })
    expect(val.upperOpen).equal(false)
    expect(val.lowerOpen).equal(true)
    expect(val.upper).equal(y)
    expect(val.lower).equal(x)
  })

  it('all keys >= x && < y', () => {
    const val = range({ lt: y, gte: x })
    expect(val.upperOpen).equal(true)
    expect(val.lowerOpen).equal(false)
    expect(val.upper).equal(y)
    expect(val.lower).equal(x)
  })

  it('the key = z', () => {
    const val = range({ eq: z })
    expect(val.upperOpen).equal(false)
    expect(val.lowerOpen).equal(false)
    expect(val.upper).eql(z)
    expect(val.lower).eql(z)
  })

  it('allows any value', () => {
    const val = range(z)
    expect(val.upperOpen).equal(false)
    expect(val.lowerOpen).equal(false)
    expect(val.upper).eql(z)
    expect(val.lower).eql(z)
  })

  it('returns nothing when key is undefined', () => {
    expect(range()).equal(null)
  })
})
