'use strict';

var callBind = require('call-bind');
var groupBy = require('map.groupby');

module.exports = function groupToMap(callbackfn) {
	var thisArg = arguments.length > 0 ? arguments[1] : this;
	var cb = callBind(callbackfn, thisArg);
	var self = this;
	return groupBy(this, function (k, v) {
		return cb(k, v, self);
	});
};
