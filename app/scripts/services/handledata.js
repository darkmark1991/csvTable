'use strict';

/**
 * @ngdoc service
 * @name csvTableApp.handleData
 * @description
 * # handleData
 * Service in the csvTableApp.
 * This service handles all data manipulation
 */
angular.module('csvTableApp')
	.service('handleData', function () {
		// parseCsv parses a csv string and returns an array object
		this.parseCSV = (data) => {
			// First split string into rows
			let csvObj = data.split('\n');
			let length = 0;

			// Remove the trailing newline if it was in the file
			if(csvObj[csvObj.length-1] === ''){
				csvObj.splice(csvObj.length-1, 1);
			}
			console.log(111);

			csvObj.forEach((row, i, arr) => {
				// Next split into parameters
				arr[i] = row.split(';');
				arr[i].forEach((cell, j, rowArr) => {
					// Assigning object { value: cell } ensures competent binding with ng-model
					rowArr[j] = { value: cell };
				});
				// length is equal to the size of the longest row
				length = (length > arr[i].length) ? length : arr[i].length;
			});			

			// Return parsed object and max. row length
			return { obj: csvObj, length: length };
		}

		// encodeCsv generates a csv string from array object
		this.encodeCSV = (obj) => {
			// object needs to run through this process to filter out information added to it by angular
			let jsonObj = JSON.parse(angular.toJson(obj));			
			let csvStr = '';

			jsonObj.forEach((row, i, arr) => {
				// Reverse the { value: cell } buffering done by parseCsv
				arr[i].forEach((cell, j, rowArr) => {
					rowArr[j] = cell.value;
				});
				// First glue parameters together by ';'
				arr[i] = arr[i].join(';');
			});

			// Next glue rows together by newline
			csvStr = jsonObj.join('\n');

			// Return csv string
			return csvStr;
		}
		
		// addRow adds an empty row to the table object
		this.addRow = (obj, length) => {
			// Create array of empty objects of the given length 
			let row = [];
			
			for(let i=0; i<length; i++){
				row.push({value: ''});
			}

			// Return the expanded array
			return [...obj, row];
		}

		// removeRow removes the indicated row from table object
		this.removeRow = (obj, index) => {
			return obj.splice(index, 1);
		}
	});
