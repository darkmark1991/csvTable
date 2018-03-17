'use strict';

/**
 * @ngdoc function
 * @name csvTableApp.controller:csvTableCtrl
 * @description
 * # csvTableCtrl
 * Controller of the csvTableApp
 * csvTableApp controlls all interaction with views
 */
angular.module('csvTableApp')
	.controller('csvTableCtrl', ['handleUpload', 'handleData', function (uploader, parser) {
		// Variables for storing necessary information
		this.fileInfo = null;
		this.tableObj = null;
		this.csvData = null;
		this.rowLength = 0;
		this.error = null;
	
		// upload function
		this.upload = () => {
			let file = fileInput.files[0];
			// If the file is selected upload function will be called from handleUpload sercvice
			// if it is not - error will be set.
			if(file != undefined){
				this.error = null;
				this.fileInfo = uploader.getFileInfo(file);
				uploader.upload(file).then((data) => {
					// Set csvData to the received data 
					this.csvData = data;
				});
			} else {
				this.error = 'Please select a file.';
			}
		}

		// parseTableData calls parseCSV function from handleData service
		// and assigns tableObj and rowLength from the result
		this.parseTableData = () => {
			let res = parser.parseCSV(this.csvData);
			this.tableObj = res.obj;
			this.rowLength = res.length;
		}

		// getClass function evaluates cell value
		// and returns corresponding class name
		this.getClass = (value) => {
			if(/^[0-9]+$/.test(value)){
				// If the value contains only digits 'red' will be returned
				return 'red';
			} else if (/^[ a-zA-Z]+$/.test(value)){
				// If the value contains only latin letters - 'blue'
				return 'blue';
			}
		}

		// exportTable exports data object in csv
		this.exportTable = () => {
			// encodeCSV function is called from handleData service
			// ro encode tableObj into a csv string
			let csvData = parser.encodeCSV(this.tableObj);
			
			// CSV string is stored in a blob object 
			let dataBlob = new Blob([csvData], {type : 'text/csv', });

			// Url is generated from Blob object
			let url = URL.createObjectURL(dataBlob);

			// window.location is redirected to the generated url
			window.location.href = url;
		}

		// addRow function calls corresponding function in dataHandler service
		this.addRow = () => {
			this.tableObj = parser.addRow(this.tableObj, this.rowLength);
		}

		// removeRow function calls corresponding function in dataHandler service
		this.removeRow = (index) => {
			parser.removeRow(this.tableObj, index);			
		}
		
		// reset function resets all values to their initial states
		this.reset = () => {
			this.tableObj = null;
			this.csvData = null;
			this.fileInfo = null;
			this.rowLength = 0;
		}
	}]);
