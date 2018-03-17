'use strict';

/**
 * @ngdoc filter
 * @name csvTableApp.filter:capitalize
 * @function
 * @description
 * # capitalize
 * Filter in the csvTableApp.
 */
angular.module('csvTableApp')
	// capitalize filter uppercases the first letter of a string
	.filter('capitalize', function () {
		return function (input) {
			return input[0].toUpperCase() + input.substring(1);
		};
	});
