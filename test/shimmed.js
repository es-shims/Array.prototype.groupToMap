'use strict';

require('../auto');

var test = require('tape');
var defineProperties = require('define-properties');
var callBind = require('call-bind');
var hasStrictMode = require('has-strict-mode')();
var functionsHaveNames = require('functions-have-names')();

var isEnumerable = Object.prototype.propertyIsEnumerable;

var runTests = require('./tests');

test('shimmed', function (t) {
	var fn = Array.prototype.groupToMap;
	t.equal(fn.length, 1, 'Array#groupToMap has a length of 1');
	t.test('Function name', { skip: !functionsHaveNames }, function (st) {
		st.equal(fn.name, 'groupToMap', 'Array#groupToMap has name "groupToMap"');
		st.end();
	});

	t.test('enumerability', { skip: !defineProperties.supportsDescriptors }, function (et) {
		et.equal(false, isEnumerable.call(Array.prototype, 'groupToMap'), 'Array#groupToMap is not enumerable');
		et.end();
	});

	t.test('bad array/this value', { skip: !hasStrictMode }, function (st) {
		/* eslint no-useless-call: 0 */
		st['throws'](function () { return fn.call(undefined, function () {}); }, TypeError, 'undefined is not an object');
		st['throws'](function () { return fn.call(null, function () {}); }, TypeError, 'null is not an object');
		st.end();
	});

	runTests(callBind(fn), t);

	t.end();
});
