# idb-range [![Build Status](https://travis-ci.org/treojs/idb-range.png?branch=master)](https://travis-ci.org/treojs/idb-range)

Simple MongoDB inspired interface for `IDBKeyRange`.

## Installation

```bash
npm install --save idb-range
```

## Example

```js
var range = require('idb-range');

range({ lte: 'a', gt: 'b' }); // IDBKeyRange {lower: "a", upper: "b", lowerOpen: true, upperOpen: true}
range({ gte: 'c' }); // IDBKeyRange {lower: "c", upper: undefined, lowerOpen: false, upperOpen: true}
range({ eq: 'd' }); // IDBKeyRange {lower: "d", upper: "3", lowerOpen: false, upperOpen: false}
```

## range(opts)

Parse `opts` to valid [`IDBKeyRange`](https://developer.mozilla.org/en-US/docs/Web/API/IDBKeyRange).

Available options:

* `eq` - equal
* `gt` - greater
* `lt` - lighter
* `gte` - greater equal
* `lte` - lighter equal

## License

MIT
