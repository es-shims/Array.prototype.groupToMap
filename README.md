# array.prototype.groupbytomap <sup>[![Version Badge][npm-version-svg]][package-url]</sup>

[![dependency status][deps-svg]][deps-url]
[![dev dependency status][dev-deps-svg]][dev-deps-url]
[![License][license-image]][license-url]
[![Downloads][downloads-image]][downloads-url]

[![npm badge][npm-badge-png]][package-url]

An ESnext spec-compliant `Array.prototype.groupByToMap` shim/polyfill/replacement that works as far down as ES3.

This package implements the [es-shim API](https://github.com/es-shims/api) interface. It works in an ES3-supported environment and complies with the proposed [spec](https://tc39.github.io/proposal-array-grouping/).

Because `Array.prototype.groupByToMap` depends on a receiver (the `this` value), the main export takes the array to operate on as the first argument.

## Getting started

```sh
npm install --save array.prototype.groupbytomap
```

## Usage/Examples

```js
var groupByToMap = require('array.prototype.groupbytomap');
var assert = require('assert');

var arr = [0, 1, 2, 3, 4, 5];
var parity = function (x) { return x % 2 === 0 ? 'even' : 'odd'; };

var results = groupByToMap(arr, function (x, i, a) {
    assert.equal(x, arr[i]);
    assert.equal(a, arr);
    return parity(x);
});

assert.deepEqual(results, new Map([
    ['even', [0, 2, 4]],
    ['odd', [1, 3, 5]],
]));
```

```js
var groupByToMap = require('array.prototype.groupbytomap');
var assert = require('assert');
/* when Array#groupByToMap is not present */
delete Array.prototype.groupByToMap;
var shimmed = groupByToMap.shim();

assert.equal(shimmed, groupByToMap.getPolyfill());
assert.deepEqual(arr.groupByToMap(parity), groupByToMap(arr, parity));
```

```js
var groupByToMap = require('array.prototype.groupbytomap');
var assert = require('assert');
/* when Array#groupByToMap is present */
var shimmed = groupByToMap.shim();

assert.equal(shimmed, Array.prototype.groupByToMap);
assert.deepEqual(arr.groupByToMap(parity), groupByToMap(arr, parity));
```

## Tests
Simply clone the repo, `npm install`, and run `npm test`

[package-url]: https://npmjs.org/package/array.prototype.groupbytomap
[npm-version-svg]: https://versionbadg.es/es-shims/Array.prototype.groupByToMap.svg
[deps-svg]: https://david-dm.org/es-shims/Array.prototype.groupByToMap.svg
[deps-url]: https://david-dm.org/es-shims/Array.prototype.groupByToMap
[dev-deps-svg]: https://david-dm.org/es-shims/Array.prototype.groupByToMap/dev-status.svg
[dev-deps-url]: https://david-dm.org/es-shims/Array.prototype.groupByToMap#info=devDependencies
[npm-badge-png]: https://nodei.co/npm/array.prototype.groupbytomap.png?downloads=true&stars=true
[license-image]: https://img.shields.io/npm/l/array.prototype.groupbytomap.svg
[license-url]: LICENSE
[downloads-image]: https://img.shields.io/npm/dm/array.prototype.groupbytomap.svg
[downloads-url]: https://npm-stat.com/charts.html?package=array.prototype.groupbytomap
