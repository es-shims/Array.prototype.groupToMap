'use strict';

var implementation = require('./implementation');

module.exports = function getPolyfill() {
	return Array.prototype.groupByToMap || implementation;
};