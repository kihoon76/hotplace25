/**
 * @namespace hotplace.spot
 */
(function(spot, $) {
	var _dom = hotplace.dom;
	var _maemulFileUp = null;
	var _btnGwansimReg = '#btnGwansimReg';
	
	//주소검색후 해당지점에 대한 정보선택
	spot.selectCategory = function(el) {
		var category = $(el).data('category');
		switch(category) {
		case 'SUJI_BOONSEOK':
			break;
		case 'GWANSIM_MULGEON' :
			_dom.showSpotGwansimRegForm();
			break;
		case 'MAEMUL' :
			_viewMaemulReg(el);
			break;
		case 'CONSULTING':
			_viewConsulting(el);
			break;
		case 'LIMIT_USE_STATE' :
			break;
		}
	} 
	
	/*
	 * 매물등록
	 * */
	function _maemulOnSuccess(files, data, xhr) {
		console.log(errMsg)
	}
	
	function _maemulOnError(files, status, errMsg) {
		console.log(errMsg)
	}
	
	function _viewMaemulReg(el) {
		var $el = $(el).closest('.munuType');
		console.log($el.data('address'));
		_dom.showSpotMaemulRegForm(null, {address: $el.data('address'), pnu:$el.data('pnu')});
		
		$(_btnGwansimReg).on('click', function() {
			var formData = {
				pnu: ''
			}
			
			_saveMaemulReg(formData);
		});
		
		_maemulFileUp = $('#maemulFileUp').uploadFile({
			url: hotplace.getContextUrl() + 'upload/maemul',
			fileName: 'file',
			showCancel: true,
			showDone: true,
			autoSubmit: false,
			showPreview: true,
			dragdropWidth: '250px',
			previewWidth: '200px',
			previewHeight: '100px',
			statusBarWidth: '200px',
			allowedTypes: 'jpg,png,gif',
			returnType: 'json',
			//dragDropStr: '끌어다 놓기',
			maxFileCount: 3,
			onSuccess: function(files, data, xhr) {
				console.log(xhr);
				console.log(data);
				if(data.success) {
					
				}
				else {
					hotplace.processAjaxError(hotplace.error.UPLOAD);
				}
			},
			onError: _maemulOnError,
			onSelect: function() {
				
			}
		});
	}
	
	function _saveMaemulReg(data) {
		if(_maemulFileUp) {
			_maemulFileUp.update({
				formData: data
			});
			
			_maemulFileUp.startUpload();
		}
	}
	
	
	function _viewConsulting(el) {
		var $el = $(el).closest('.munuType');
		_dom.showSpotConsultingForm(null, {address: $el.data('address'), pnu:$el.data('pnu')});
	}
	
}(
	hotplace.spot = hotplace.spot || {},
	jQuery
));