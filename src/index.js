import isPlainObject from 'is-plain-obj'

/**
 * Parse `opts` to valid IDBKeyRange.
 * https://developer.mozilla.org/en-US/docs/Web/API/IDBKeyRange
 *
 * @param {Object} opts
 * @return {IDBKeyRange}
 */

export default function range(opts) {
  const IDBKeyRange = global.IDBKeyRange || global.webkitIDBKeyRange
  if (opts instanceof IDBKeyRange) return opts
  if (typeof opts === 'undefined') return null
  if (!isPlainObject(opts)) return IDBKeyRange.only(opts)
  const keys = Object.keys(opts).sort()

  if (keys.length === 1) {
    const key = keys[0]
    const val = opts[key]

    switch (key) {
      case 'eq': return IDBKeyRange.only(val)
      case 'gt': return IDBKeyRange.lowerBound(val, true)
      case 'lt': return IDBKeyRange.upperBound(val, true)
      case 'gte': return IDBKeyRange.lowerBound(val)
      case 'lte': return IDBKeyRange.upperBound(val)
      default: throw new TypeError(`"${key}" is not valid key`)
    }
  } else {
    const x = opts[keys[0]]
    const y = opts[keys[1]]
    const pattern = keys.join('-')

    switch (pattern) {
      case 'gt-lt': return IDBKeyRange.bound(x, y, true, true)
      case 'gt-lte': return IDBKeyRange.bound(x, y, true, false)
      case 'gte-lt': return IDBKeyRange.bound(x, y, false, true)
      case 'gte-lte': return IDBKeyRange.bound(x, y, false, false)
      default: throw new TypeError(`"${pattern}" are conflicted keys`)
    }
  }
}
