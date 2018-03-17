'use strict';

/**
 * @ngdoc service
 * @name csvTableApp.handleUpload
 * @description
 * # handleUpload
 * Service in the csvTableApp.
 * Handles file upload.
 */
angular.module('csvTableApp')
	.service('handleUpload', function () {
		// upload function returns a jquery get object 
		this.upload = (file) => {
			// Generate url from File object
			let url = URL.createObjectURL(file);
			return $.get(url);
		}

		// Getfileinfor extracts file information from File object
		this.getFileInfo = (file) => {
			return {
				name: file.name,
				type: file.type,
				size: file.size + ' bytes',
			};
		}
	});
