/**
 * @namespace hotplace.spot
 */
(function(spot, $) {
	var _maemulSelectedFiles = {};
	var _btnGwansimReg = '#btnGwansimReg';
	var _pnu, _address, _lng, _lat;
	
	//주소검색후 해당지점에 대한 정보선택
	spot.selectCategory = function(el) {
		var category = $(el).data('category');
		switch(category) {
		case 'SUJI_BOONSEOK':
			break;
		case 'GWANSIM_MULGEON' :
			hotplace.dom.showSpotGwansimRegForm();
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
	
	function _spotInfo(el) {
		var $el = $(el).closest('.munuType');
		_pnu = $el.data('pnu');
		_address = $el.data('address');
		_lng = $el.data('lng');
		_lat = $el.data('lat');
	}
	
	/*************************************************************
	 * 매물등록
	 ************************************************************/
	function _hasFileInMaemul() {
        for(var k in _maemulSelectedFiles) {
            if(_maemulSelectedFiles[k]) return true;
        }

        return false;
    }
	
	function _getMaemulRegParams() {
		return {
			pnu: _pnu,
			addressJibeon: _address,
			description: $('#txtMaemulContent').val(),
			phone: $('#txtMaemulReqPhone').val(),
			register: $('#txtMaemulReqName').val(),
			lng: _lng,
			lat: _lat
		};
	}
	
	function _viewMaemulReg(el) {
		_maemulSelectedFiles = {};
		_spotInfo(el);
		hotplace.dom.showSpotMaemulRegForm(null, {address: _address, pnu:_pnu});
		
		$(_btnGwansimReg).on('click', function() {
			_saveMaemulReg(_getMaemulRegParams());
		});
		
		hotplace.upload.init('#maemulFileUp', {
			url: hotplace.getContextUrl() + 'spot/reg/maemul',
			dragdropWidth: '300px',
			previewHeight: '100px',
			previewWidth: '100px',
			statusBarWidth: '300px',
			allowedTypes: 'jpg,png,gif',
			dynamicFormData: function() {
	            return _getMaemulRegParams();
	        },
			maxFileCount: 3,
			onSuccess: function(files, data, xhr) {
				console.log(data)
				if(data.success) {
					_saveMaemulSuccess();
				}
				else {
					var errCode = '';
					if(data.errCode == 'DUP') {
						errCode = hotplace.error.MAEMUL_DUP;
                	}
                	else {
                		errCode = hotplace.error.MAEMUL_REG;
                	}
					
					//이미지
					hotplace.upload.getFileupEl('#maemulFileUp').reset();
					_maemulSelectedFiles = {};
					hotplace.processAjaxError(errCode);
				}
			},
			onError: function(files, status, errMsg, pd) {
				hotplace.upload.getFileupEl('#maemulFileUp').reset();
				_maemulSelectedFiles = {};
				 hotplace.dom.showAlertMsg(null, errMsg, {width:'40%'});
			},
			onSelect: function(files) {
				if(_maemulSelectedFiles[files[0].name]) {
		            hotplace.dom.showAlertMsg(null, '같은 이름의 파일이 있습니다.', {width:'200px'});
		            return false;
		        }
				
				_maemulSelectedFiles[files[0].name] = files[0];
				return true;
			},
			onCancel: function(files) {
				 delete _maemulSelectedFiles[files[0].name];
			}
		});
		
	}
	
	function _saveMaemulSuccess() {
		hotplace.dom.showAlertMsg(function() {
    		hotplace.dom.closeModal();
    	}, '매물이 성공적으로 등록되었습니다.', {width:'40%'});
	}
	
	function _saveMaemulReg(data) {
		if(!_validateMaemul()) return;
		
		if( _hasFileInMaemul()) {
			hotplace.upload.getFileupEl('#maemulFileUp').startUpload();
	    }
        else {
        	hotplace.ajax({
        		url: 'spot/reg/maemulNoPic',
        		contentType: 'application/json',
                data: JSON.stringify(_getMaemulRegParams()),
                success: function(data, textStatus, jqXHR) {
                    if(!data.success) {
                    	if(data.errCode == 'DUP') {
                    		jqXHR.errCode = hotplace.error.MAEMUL_DUP;
                    	}
                    	else {
                    		jqXHR.errCode = hotplace.error.MAEMUL_REG;
                    	}
                    }
                    else {
                    	_saveMaemulSuccess();
                    }
                    
                }
        	});
        }
	}
	
	function _validateMaemul() {
		if($.trim($('#txtMaemulContent').val()) == '') {
			hotplace.dom.showAlertMsg(function() {
				$('#txtMaemulContent').focus();
			}, '물건특징을 입력해 주세요', {width:'300px'});
			
			return false;
		}
		
		if($.trim($('#txtMaemulReqName').val()) == '') {
			hotplace.dom.showAlertMsg(function() {
				$('#txtMaemulReqName').focus();
			}, '소속/성명을 입력해 주세요', {width:'300px'});
			
			return false;
		}
		
		if($.trim($('#txtMaemulReqPhone').val()) == '') {
			hotplace.dom.showAlertMsg(function() {
				$('#txtMaemulReqPhone').focus();
			}, '연락처를 입력해 주세요', {width:'300px'});
			
			return false;
		}
		
		return true;
	}
	
	
	/*************************************************************
	 * 컨설팅 요청
	 ************************************************************/
	function _viewConsulting(el) {
		var $el = $(el).closest('.munuType');
		hotplace.dom.showSpotConsultingForm(null, {address: $el.data('address'), pnu:$el.data('pnu')});
	}
	
	//매물등록 연락처
	hotplace.validation.phone('#txtMaemulReqPhone');
	
}(
	hotplace.spot = hotplace.spot || {},
	jQuery
));