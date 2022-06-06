'use strict';

var define = require('define-properties');
var shimUnscopables = require('es-shim-unscopables');

var getPolyfill = require('./polyfill');

module.exports = function shim() {
	var polyfill = getPolyfill();

	define(
		Array.prototype,
		{ groupToMap: polyfill },
		{ groupToMap: function () { return Array.prototype.groupToMap !== polyfill; } }
	);

	shimUnscopables('groupToMap');

	return polyfill;
};
