'use strict';

var inspect = require('object-inspect');
var forEach = require('foreach');
var v = require('es-value-fixtures');

var hasMap = typeof Map === 'function';

module.exports = function (groupByToMap, t) {
	t.test('callback function', function (st) {
		forEach(v.nonFunctions, function (nonFunction) {
			st['throws'](
				function () { groupByToMap([], nonFunction); },
				TypeError,
				inspect(nonFunction) + ' is not a function'
			);
		});

		st.end();
	});

	t.test('no Maps', { skip: hasMap }, function (st) {
		st['throws'](
			function () { groupByToMap([], Boolean); },
			SyntaxError,
			'Maps are not supported'
		);

		st.end();
	});

	t.test('grouping', { skip: !hasMap }, function (st) {
		st.deepEqual(
			groupByToMap([], function () { return 'a'; }),
			new Map(),
			'an empty array produces an empty Map'
		);

		var arr = [0, -0, 1, 2, 3, 4, 5, NaN, Infinity, -Infinity, null, undefined, true, /a/g];
		var parity = function (x) {
			if (typeof x !== 'number') {
				return x == null ? x : x.constructor; // eslint-disable-line eqeqeq
			}
			if (x !== x || x === 0) {
				return x;
			}
			if (!isFinite(x)) {
				return '∞';
			}
			return x % 2 === 0 ? 'even' : 'odd';
		};
		var grouped = new Map([
			[0, [0, -0]],
			['even', [2, 4]],
			['odd', [1, 3, 5]],
			[NaN, [NaN]],
			['∞', [Infinity, -Infinity]],
			[null, [null]],
			[undefined, [undefined]],
			[Boolean, [true]],
			[RegExp, [/a/g]]
		]);
		st.deepEqual(
			groupByToMap(arr, parity),
			grouped,
			inspect(arr) + ' group by parity groups to ' + inspect(grouped)
		);

		var sentinel = {};
		st.deepEqual(
			groupByToMap(arr, function (x, i, a) {
				st.equal(this, sentinel, 'receiver is as expected'); // eslint-disable-line no-invalid-this
				st.equal(x, arr[i], 'second argument ' + i + ' is ' + inspect(arr[i]));
				st.equal(a, arr, 'third argument is array');
				return 42;
			}, sentinel),
			new Map([[42, arr]]),
			'thisArg and callback arguments are as expected'
		);

		st.end();
	});
};
