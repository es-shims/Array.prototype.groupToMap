'use strict';

var define = require('define-properties');
var shimUnscopables = require('es-shim-unscopables');

var getPolyfill = require('./polyfill');

module.exports = function shim() {
	var polyfill = getPolyfill();

	define(
		Array.prototype,
		{ groupByToMap: polyfill },
		{ groupByToMap: function () { return Array.prototype.groupByToMap !== polyfill; } }
	);

	shimUnscopables('groupByToMap');

	return polyfill;
};
