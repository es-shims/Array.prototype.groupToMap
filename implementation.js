'use strict';

var GetIntrinsic = require('get-intrinsic');
var callBound = require('call-bind/callBound');

var Call = require('es-abstract/2021/Call');
var Get = require('es-abstract/2021/Get');
var IsCallable = require('es-abstract/2021/IsCallable');
var LengthOfArrayLike = require('es-abstract/2021/LengthOfArrayLike');
var ToObject = require('es-abstract/2021/ToObject');
var ToString = require('es-abstract/2021/ToString');

var $SyntaxError = GetIntrinsic('%SyntaxError%');
var $TypeError = GetIntrinsic('%TypeError%');
var $Map = GetIntrinsic('%Map%', true);
var $set = callBound('%Map.prototype.set%', true);

var forEach = require('es-abstract/helpers/forEach');

var AddValueToKeyedGroup = require('./AddValueToKeyedGroup'); // TODO: replace with es-abstract 2022 implementation

module.exports = function groupByToMap(callbackfn) {
	var O = ToObject(this); // step 1
	var len = LengthOfArrayLike(O); // step 2

	if (!IsCallable(callbackfn)) {
		throw new $TypeError('callbackfn must be a function'); // step 3
	}

	if (!$Map) {
		throw new $SyntaxError('This environment does not support Maps');
	}

	var thisArg;
	if (arguments.length > 1) {
		thisArg = arguments[1];
	}

	var k = 0; // step 4
	var groups = []; // step 5
	while (k < len) { // step 6
		var Pk = ToString(k);
		var kValue = Get(O, Pk);
		var key = Call(callbackfn, thisArg, [kValue, k, O]);
		if (key === 0) {
			key = 0; // step 6.d.
		}
		AddValueToKeyedGroup(groups, key, kValue);
		k += 1;
	}

	var map = new $Map(); // Construct($Map); // step 7
	forEach(groups, function (g) { // step 8
		// var elements = CreateArrayFromList(g.Elements);
		$set(map, g.Key, g.Elements);
	});

	return map; // step 9
};
