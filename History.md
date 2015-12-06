## 3.1.3 / 2015-12-06

* ignore `null` value

## 3.1.2 / 2015-11-19

* compile with [add-module-exports](https://github.com/59naga/babel-plugin-add-module-exports) to provide ES6 modules and CommonJS support

## 3.1.1 / 2015-11-18

* fix module export [#2](https://github.com/treojs/idb-range/issues/2)

## 3.1.0 / 2015-11-13

* full rewwrite with ES6 and babel@6
* use `is-plain-obj` to check object argument
* change exception messages
* use zuul to test in all supported browsers
* minor docs updates

## 3.0.0 / 2015-10-24

* **breaking:** return `null` for empty arguments
* documentation for non-object arguments
* use treo-websql to polyfill `IDBKeyRange`
* use eslint

## 2.4.0 / 2015-05-27

* fix support of indexedDBShim and Safari

## 2.3.1 / 2015-05-01

* minor code style changes

## 2.3.0 / 2015-03-23

* remove `component-type` as dependency

## 2.2.0 / 2015-03-19

* improve object type check
* use `idb-polyfill` to polyfill IDBKeyRange

## 2.1.0 / 2015-03-17

* use `global` instead of `window` to support node/web-workers env
* support array as possible value for `IDBKeyRange.only`

## 2.0.0 / 2015-01-16

* **breaking:** ignore empty values
* remove bower and standalone support
* allow any value as a shortcut for `IDBKeyRange.only`

## 1.0.0 / 2014-11-23

* extracted from [treo](https://github.com/treojs/treo) :sparkles:
