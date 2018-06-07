/**
 * @namespace hotplace.spot
 */
(function(spot, $) {
	var _maemulSelectedFiles = {};
	var _btnGwansimReg = '#btnGwansimReg',
		_btnConsultingReg = '#btnConsultingReg',
		_selConsultingPhineF = '#selConsultingPhineF',
		_selConsultingEmail = '#selConsultingEmail',
		_txtConsultingName = '#txtConsultingName',
		_txtConsultingPhoneM = '#txtConsultingPhoneM',
		_txtConsultingPhoneL = '#txtConsultingPhoneL',
		_txtConsultingEmail = '#txtConsultingEmail',
		_txtConsultingQuestion = '#txtConsultingQuestion',
		
		_txtMaemulContent = '#txtMaemulContent',
		_txtMaemulReqName = '#txtMaemulReqName',
		_txtMaemulReqPhone = '#txtMaemulReqPhone',
		_fileMaemul = '#maemulFileUp',
		_dvSpotTojiUseLimit = '#dvSpotTojiUseLimit',
		_sujiLurisDrawing = '#sujiLurisDrawing',
		_tabTojiUseLimit01 = '#tabTojiUseLimit01';
	
	var _pnu, _address, _lng, _lat;
	
	//주소검색후 해당지점에 대한 정보선택
	spot.selectCategory = function(el) {
		_spotInfo(el);
		var category = $(el).data('category');
		switch(category) {
		case 'SUJI_BOONSEOK':
			_viewSujibunseog();
			break;
		case 'GWANSIM_MULGEON' :
			_viewGwansimReg();
			break;
		case 'MAEMUL' :
			hotplace.dom.showServiceReady();
			//_viewMaemulReg();
			break;
		case 'CONSULTING':
			hotplace.dom.showServiceReady();
			//_viewConsulting();
			break;
		case 'TOJI_USE_LIMT' :
			//hotplace.dom.showServiceReady();
			//_viewTojiUseLimit();//-원래 토지이용규제 현황보기에서 토지기본정보로 변경됨
			_viewTojiDefaultInfo();
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
	 * 수지분석
	 ************************************************************/
	function _viewSujibunseog() {
		hotplace.ajax({
    	    url: 'search/sujiboonseog/base?pnu=' + _pnu,
			method: 'GET',
			//activeMask: false,//(isActiveMask != undefined) ? isActiveMask : true,
			//isMaskTran: isMaskTran,
			//loadEl: '#',
			success: function(data, textStatus, jqXHR) {
				console.log(data)
				
				if(data.success) {
					var datas = data.datas[0];
					var param = $.extend({address:_address, pnu:_pnu, lng:_lng, lat:_lat}, {defaultValue:hotplace.calc.sujibunseog.defaultValue}, {
							jimok: datas.jimok,
							valPerPyeung:21000000,
							area: datas.area,
							gongsi: datas.gongsi,
							limitChange:'Y',
							luris: datas.luris,
							gugtolaw: datas.gugtolaw,
							etclaw: datas.etclaw,
							boochickadd: datas.boochickadd,
							tojiuse: datas.tojiuse
							
					});
					
//					if(datas.gongsi == '') {
//						hotplace.dom.showAlertMsg(null, '공시지가 정보가 없습니다', {width:400});
//						return;
//					}
					
					hotplace.dom.showSpotSujibunseogForm(function() {
						hotplace.sujibunseog.init(param);
						hotplace.calc.sujibunseog.initCalc();
					}, param);
				}
				else {
					var errCode = data.errCode;
					if(errCode)	jqXHR.errCode = errCode;
				}
			}
       });
	}
	
	/*************************************************************
	 * 관심물건 등록
	 ************************************************************/
	var _btnRegGwansimMulgeon = '#btnRegGwansimMulgeon',
		_txtGwansimMemo = '#txtGwansimMemo';
	
	function _validateGwansimMulgeon() {
		var isNotEmpty = hotplace.validation.isFormNotEmpty([_txtGwansimMemo]);
		return isNotEmpty;
	}
	
	function _viewGwansimReg() {
		hotplace.dom.showSpotGwansimRegForm({address:_address});
		
		$(_btnRegGwansimMulgeon)
		.off('click')
		.on('click', function() {
			if(_validateGwansimMulgeon()) {
				hotplace.ajax({
		    		url: 'spot/reg/gwansim',
		    		contentType: 'application/json',
		            data: JSON.stringify({
		            	pnu:_pnu,
		            	address:_address,
		            	lng: _lng,
		    			lat: _lat,
		    			memo:$(_txtGwansimMemo).val().trimTS()
		            }),
		            success: function(data, textStatus, jqXHR) {
		                if(!data.success) {
		                	if(data.errCode == 'DUP') {
		                		jqXHR.errCode = hotplace.error.GWANSIM_DUP;
		                	}
		                	else {
		                		jqXHR.errCode = hotplace.error.GWANSIM_REG;
		                	}
		                }
		                else {
		                	_saveGwansimSuccess();
		                }
		                
		            }
		    	});
			}
		});
	}
	
	function _saveGwansimSuccess() {
		hotplace.dom.showAlertMsg(function() {
    		hotplace.dom.closeModal();
    	}, '관심물건이 성공적으로 등록되었습니다.', {width:'40%'});
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
			description: $(_txtMaemulContent).val(),
			phone: $(_txtMaemulReqPhone).val(),
			register: $(_txtMaemulReqName).val(),
			lng: _lng,
			lat: _lat
		};
	}
	
	function _viewMaemulReg() {
		_maemulSelectedFiles = {};
		hotplace.dom.showSpotMaemulRegForm(null, {address: _address, pnu:_pnu});
		
		$(_btnGwansimReg).on('click', function() {
			_saveMaemulReg(_getMaemulRegParams());
		});
		
		hotplace.upload.init(_fileMaemul, {
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
					hotplace.upload.getFileupEl(_fileMaemul).reset();
					_maemulSelectedFiles = {};
					hotplace.processAjaxError(errCode);
				}
			},
			onError: function(files, status, errMsg, pd) {
				hotplace.upload.getFileupEl(_fileMaemul).reset();
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
			hotplace.upload.getFileupEl(_fileMaemul).startUpload();
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
		var isNotEmpty = hotplace.validation.isFormNotEmpty(
				[_txtMaemulContent,
				 _txtMaemulReqName,
				 _txtMaemulReqPhone]
			);
			
			return isNotEmpty;
	}
	
	
	/*************************************************************
	 * 컨설팅 요청
	 ************************************************************/
	function _validateConsulting() {
		
		var isNotEmpty = hotplace.validation.isFormNotEmpty(
			[_txtConsultingName,
			 _txtConsultingPhoneM,
			 _txtConsultingPhoneL,
			 _txtConsultingEmail,
			 _selConsultingEmail,
			 _txtConsultingQuestion]
		);
		
		if(isNotEmpty) {
			if(hotplace.validation.isValidPhoneM($(_txtConsultingPhoneM))) {
				if(hotplace.validation.isValidPhoneL($(_txtConsultingPhoneL))) {
					if(hotplace.validation.isValidEmail($(_txtConsultingEmail), $(_selConsultingEmail).val())) {
						return true;
					}
				}
			}
		}
		
		return false;
	}
	
	function _viewConsulting() {
		hotplace.dom.showSpotConsultingForm(null, function() {
			$(_selConsultingPhineF).html(hotplace.util.getPhoneOptions());
			$(_selConsultingEmail).html(hotplace.util.getEmailOptions());
		}, {address: _address, pnu:_pnu});
		
		$(_btnConsultingReg).on('click', function() {
			_saveConsultingReg();
		});
	}
	
	function _getConsultingRegParams() {
		return {
			pnu: _pnu,
			name:$(_txtConsultingName).val(),
			phone:$(_selConsultingPhineF).val() + '-' + $(_txtConsultingPhoneM).val() + '-' + $(_txtConsultingPhoneL).val(),
			email:hotplace.util.getEmail($(_txtConsultingEmail), $(_selConsultingEmail)),
			question:$(_txtConsultingQuestion).val(),
			lat:_lat,
			lng:_lng,
			address:_address
		}
	}
	
	function _saveConsultingReg() {
		if(!_validateConsulting()) return;
		
		hotplace.ajax({
    		url: 'spot/reg/consulting',
    		contentType: 'application/json',
            data: JSON.stringify(_getConsultingRegParams()),
            success: function(data, textStatus, jqXHR) {
                if(!data.success) {
                	if(data.errCode == 'DUP') {
                		jqXHR.errCode = hotplace.error.CONSULTING_DUP;
                	}
                	else {
                		jqXHR.errCode = hotplace.error.CONSULTING_REG;
                	}
                }
                else {
            		hotplace.dom.showAlertMsg(function() {
                		hotplace.dom.closeModal();
                	}, '컨설팅 요청이 등록되었습니다.', {width:'40%'});
                }
            }
    	});
	}
	
	/*************************************************************
	 * 토지이용 규제 현황보기
	 ************************************************************/
	function _viewTojiUseLimit() {
		hotplace.dom.showSpotTojiUseLimitForm(null, function() {
			_getTojiUseLimitTabHtml($(_tabTojiUseLimit01), 1);
		}, {address: _address, pnu:_pnu});
		
		//tab click event handler
		$(_dvSpotTojiUseLimit + ' .nav-tabs button').on('click', function() {
			var $tabContentDv = $($(this).attr('href'));
			
			if($tabContentDv.hasClass('active')) return;
			
			_getTojiUseLimitTabHtml($tabContentDv, $(this).data('tabNum'));
		});
		
		
	}
	
	function _viewTojiDefaultInfo() {
		
		hotplace.ajax({
			url: 'spot/tojiDefaultInfo',
			method: 'GET',
			dataType: 'json',
			data: {pnu: _pnu},
			success: function(data, textStatus, jqXHR) {
				console.log(data)
				
				var param = {address: _address, pnu:_pnu};
				var datas = data.datas;
				
				if(datas && datas.length > 0) {
					datas = datas[0];
					param.area = (datas.area != null) ? datas.area : '-';
					param.gongsi = (datas.gongsi != null) ? datas.gongsi.toString().money() : '-';
					param.gongsiYm = (datas.gongsiYm != null) ? datas.gongsiYm : '-';
					param.jimok = (datas.jimok != null) ? datas.jimok : '-';
				}
				
				hotplace.dom.showSpotTojiDefaultForm(null, function() {
					
				}, param);
			}
		});
		
		
	}
	
	function _getTojiUseLimitTabHtml($target, tabNum) {
		var cate;
		switch(tabNum) {
		case 1:
			cate = 'default';
			break;
		case 2:
			cate = 'tojidaejang';
			break;
		case 3:
			cate = 'geonchugdaejang';
			break;
		case 4:
			cate = 'tojiuseplan';
			break;
		case 5:
			cate = 'privategongsi';
			break;
		default:
			throw new Error('올바른 탭정보를 입력하세요..');
		}
		
		var tForm = hotplace.dom.getTemplate('tojiuselimit_tab_' + cate, false, function() {
			var resultForm = '';
			
			hotplace.ajax({
				url : 'handlebar/tab/tojiuselimit/' + cate,
				dataType : 'html',
				async: false,
				method : 'GET',
				success : function(data, textStatus, jqXHR) {
					resultForm = data;
				},
				error: function() {
					throw new Error('html template error')
				}
			});
			
			return resultForm;
		});
		
		$($target).html(tForm);
	}
	
	//매물등록 연락처
	hotplace.validation.phone(_txtMaemulReqPhone);
	
	//컨설팅 연락처
	hotplace.validation.phone(_txtConsultingPhoneM);
	hotplace.validation.phone(_txtConsultingPhoneL);
	
}(
	hotplace.spot = hotplace.spot || {},
	jQuery
));