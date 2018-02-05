/**
 * @namespace hotplace.spot
 */
(function(spot, $) {
	var _dom = hotplace.dom;
	var _upload = hotplace.upload;
	var _maemulSelectedFiles = {};
	var _btnGwansimReg = '#btnGwansimReg';
	var _pnu;
	var _address;
	
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
	
	function _spotAddrPnu(el) {
		var $el = $(el).closest('.munuType');
		_pnu = $el.data('pnu');
		_address = $el.data('address');
	}
	
	/*
	 * 매물등록
	 * */
	function _hasFileInMaemul() {
        for(var k in _maemulSelectedFiles) {
            if(_maemulSelectedFiles[k]) return true;
        }

        return false;
    }
	
	function _getMaemulRegParams() {
		return {
			pnu: ''
		};
	}
	
	function _viewMaemulReg(el) {
		_spotAddrPnu(el);
		_dom.showSpotMaemulRegForm(null, {address: _address, pnu:_pnu});
		
		$(_btnGwansimReg).on('click', function() {
			_saveMaemulReg(_getMaemulRegParams());
		});
		
		_upload.init('#maemulFileUp', {
			url: hotplace.getContextUrl() + 'upload/maemul',
			dragdropWidth: '300px',
			previewHeight: '100px',
			statusBarWidth: '200px',
			allowedTypes: 'jpg,png,gif',
			dynamicFormData: function() {
	            var data = {
	                pnu: _pnu,
	                address:  _address,
	                content: $('#txtMaemulContent').val(),
	                reqName: $('#txtMaemulReqName').val(),
	                reqPhone: $('#txtMaemulReqPhone').val()
	            };
	            
	            return data;   
	        },
			maxFileCount: 3,
			onSuccess: function(files, data, xhr) {
				if(data.success) {
					
				}
				else {
					hotplace.processAjaxError(hotplace.error.UPLOAD);
				}
			},
			onError: function(files, status, errMsg, pd) {
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
	
	function _saveMaemulReg(data) {
		
		if( _hasFileInMaemul()) {
			_upload.getFileupEl('#maemulFileUp').startUpload();
	    }
        else {
        	hotplace.ajax({
        		url: '',
        		contentType: 'application/json',
                data: JSON.stringify(_getParam()),
                success: function(data) {
                    console.log(data)
                    
               },
               error: function() {

               }
        	});
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