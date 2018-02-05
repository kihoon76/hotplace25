/**
 * @namespace hotplace.upload
 * */
(function(upload, $) {
	var _fileUp = {};
	var selectedFiles = {};
	
	upload.init = function(fileId, config) {
		
		var mergeConfig = $.extend({}, {
			fileName: 'file',
			showCancel: true,
			showDone: true,
			autoSubmit: false,
			showPreview: true,
			maxFileCount: 1,
			returnType: 'json',
		}, config);
		
		_fileUp[fileId] = $(fileId).uploadFile(mergeConfig);
	}
	
	upload.getFileupEl = function(fileId) {
		return _fileUp[fileId];
	}
	
	
}(
	hotplace.upload = hotplace.upload || {},
	jQuery
));