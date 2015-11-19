# idb-range

> MongoDB inspired interface for `IDBKeyRange`.

[![](https://saucelabs.com/browser-matrix/idb-range.svg)](https://saucelabs.com/u/idb-range)

[![](https://img.shields.io/npm/v/idb-range.svg)](https://npmjs.org/package/idb-range)
[![](https://img.shields.io/travis/treojs/idb-range.svg)](https://travis-ci.org/treojs/idb-range)
[![](http://img.shields.io/npm/dm/idb-range.svg)](https://npmjs.org/package/idb-range)

## Installation

    npm install --save idb-range

## Example

```js
import range from 'idb-range'

range({ lte: 'a', gt: 'b' }) // IDBKeyRange {lower: "a", upper: "b", lowerOpen: true, upperOpen: true}
range({ gte: 'c' }) // IDBKeyRange {lower: "c", upper: undefined, lowerOpen: false, upperOpen: true}

// it accepts a specific value as a shortcut to IDBKeyRange.only
range('hello') // IDBKeyRange {lower: "hello", upper: "hello", lowerOpen: false, upperOpen: false}
// but it's more explicit to always use object notation
range({ eq: 'hello' })

// IDBKeyRange and no arguments are ignored
range(IDBKeyRange.only('hello')) // ignores IDBKeyRange instances
range() // null
```

## range(opts)

Parse `opts` to valid [`IDBKeyRange`](https://developer.mozilla.org/en-US/docs/Web/API/IDBKeyRange).

Available options, when `opts` is an object:

* `gt` - greater
* `lt` - lighter
* `gte` - greater equal
* `lte` - lighter equal
* `eq` - equal

## License

[MIT](./LICENSE)
