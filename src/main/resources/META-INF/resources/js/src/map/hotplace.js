/*
 * jsDoc 설치방법
 * npm install -g jsdoc
 * > jsdoc map-core.js -d c://out
 * http://usejsdoc.org/
 * */

/**
 * @namespace hotplace
 * */
(function(hotplace, $) {
	
	var _version = '1.0';
	var _ROOT_CONTEXT = $('body').data('url');
	
	/*$.browser = {
		msie: false,
		chrome: false,
		firefox: false,
		safari: false,
		opera: false
	}; */
	/*jQuery.browser() removed

	The jQuery.browser() method has been deprecated since jQuery 1.3 and is removed in 1.9.
	If needed, it is available as part of the jQuery Migrate plugin.
	We recommend using feature detection with a library such as Modernizr.
	*/
    //$.browser.version = 0;
    
    hotplace.browser = function() {
    	var b = {
			msie: false,
			msedge: false,
			msie_ver: '',
			chrome: false,
			firefox: false,
			safari: false,
			opera: false
    	};
    	var ua = navigator.userAgent;
    	
    	if(ua.search('Chrome') >= 0 && ua.search('Edge') < 0) {
    		b.chrome = true;
    	}
    	else if(ua.search('Firefox') >= 0) {
    		b.firefox = true;
    	}
    	else if(ua.search('Safari') >= 0 && ua.search('Chrome') < 0) {
    		b.safari = true;
    	}
    	else if(ua.search('Opera') >= 0) {
    		b.opera = true;
    	}
    	else if(ua.search('Trident') >=0) {
    		b.msie = true;
    		if(ua.search('Trident/7.0') >=0) {
    			b.msie_ver = '11';
    		}
    		else if(ua.search('Trident/6.0') >=0) {
    			b.msie_ver = '10';
    		}
    		else if(ua.search('Trident/5.0') >=0) {
    			b.msie_ver = '9';
    		}
    	}
    	else if(ua.search('Edge') >=0) {
    		b.msedge = true;
    	}
    	
    	return b;
    }();
    
    String.prototype.format = function() {
        var s = this,
            i = arguments.length;

        while (i--) {
            s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
        }
        return s;  
    };
    
    String.prototype.money = function() {
    	 var s = this;
    	 s = s.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ','); 
    	 
    	 return s;
    }
    
    String.prototype.getDecimalCount = function() {
    	var s = this;
    	var idx = s.indexOf('.');
    	
    	if(idx == -1) return -1;
    	
    	return s.length - (idx + 1);
    }
    
    /**
	 * @memberof hotplace
     * @property {object} config
     * @property {number} config.mulgeonViewLevel  	물건보기 레벨
     * @property {number} config.minZoomLevel    	지도 최소 줌레벨
     * @property {number} config.mapDefaultX     	지도 초기 경도
     * @property {number} config.mapDefaultY     	지도 초기 위도
     * @property {number} config.addrSearchPanLevel 주소검색 후 panto 이동시 레벨설정
     */
    hotplace.config = {
    	mulgeonViewLevel: 8,
    	minZoomLevel: 3,
    	mapDefaultX: 127.9204629,
    	mapDefaultY: 36.0207091,
    	addrSearchPanLevel: 10,
    	yangdoseStepPercent: 5,
    	gyeongmaeDetailImgInterval: 2000,
    	markerGrpCount: 2,
    	menus: {
    		ADDRESS_SEARCH: 'addrSearchMenu',
    		TOOJA_SEARCH: 'toojaRegionSearchMenu',
    		GYEONGGONG_SEARCH: 'gyeonggongSearchMenu',
    		MULGEON_VIEW: 'mulgeonViewMenu',
    		HEATMAP_VIEW: 'heatmapViewMenu'
    	}
    }
    
    Handlebars.registerHelper('json', function(context) {
        return JSON.stringify(context);
    });
    
    /**
     * @private
     * @desc handlebars-helper-x
     *  <p>
     *		{{#xif " name == 'Sam' && age === '12' " }}
     * 		BOOM
     *		{{else}}
     * 		BAMM
     *		{{/xif}}
   	 *	</p>
     * {@link https://gist.github.com/akhoury/9118682 handlebars-helper-x}
     */
    Handlebars.registerHelper('x', function(expression, options) {
    	
    	var result;

    	// you can change the context, or merge it with options.data, options.hash
    	var context = this;

    	// yup, i use 'with' here to expose the context's properties as block variables
    	// you don't need to do {{x 'this.age + 2'}}
    	// but you can also do {{x 'age + 2'}}
    	// HOWEVER including an UNINITIALIZED var in a expression will return undefined as the result.
    	with(context) {
    		result = (function() {
    			try {
    				return eval(expression);
    			}
    			catch (e) {
    				console.warn('•Expression: {{x \'' + expression + '\'}}\n•JS-Error: ', e, '\n•Context: ', context);
    			}
    		})
    		.call(context); // to make eval's lexical this=context
    	}
    	return result;
    });
    

    Handlebars.registerHelper('xif', function (expression, options) {
    	return Handlebars.helpers['x'].apply(this, [expression, options]) ? options.fn(this) : options.inverse(this);
    });

    
    /**
     * @desc 숫자 자리수 
     */
    Handlebars.registerHelper('currency', function(amount, options) {
    	if (typeof(amount) === 'string') { amount = options.contexts[0].get(amount); }

    	return amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    });
    
    /**
     * @desc 숫자 연산 
     * {@link https://gist.github.com/FrankFang/6603970 math.js}
     */
    Handlebars.registerHelper('math', function(lvalue, operator, rvalue, options) {
        if (arguments.length < 4) {
            // Operator omitted, assuming "+"
            options = rvalue;
            rvalue = operator;
            operator = "+";
        }
            
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
            
        return {
            '+': lvalue + rvalue,
            '-': lvalue - rvalue,
            '*': lvalue * rvalue,
            '/': lvalue / rvalue,
            '%': lvalue % rvalue
        }[operator];
    });
    
    Handlebars.registerHelper('step', function(numValue, ratio) {
    	var s = numValue.toString();
    	var sLen = s.length; 
    	var s1 = '';
    	for(var i=0; i<sLen; i++) {
    		if(i == 0) {
    			s1 += '1';
    		}
    		else {
    			s1 += '0';
    		}
    	}
    	
    	var n = parseInt(s1);
    	return Math.round(n * (ratio * 0.01));
    });

    /**
     * @private
     * @function _s4
     * @desc create UUID 
     */
	function _s4() {
		return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1);
	}
    
	/**
	 * @memberof hotplace
     * @function isSupport
     * @param {string} target 찾을요소
     * @param {string[]} array 배열
     * @returns {boolean}
     */
	hotplace.isSupport = function(target, array) {
		return $.inArray(target, array) > -1;
	}
	
	/**
	 * Callback for ajax beforeSend.
	 *
	 * @callback ajax_beforeSend
	 * @param {object} xhr - XMLHttpRequest.
	 */
	
	/**
	 * Callback for ajax success.
	 *
	 * @callback ajax_success
	 * @param {object} data - data
	 * @param {string} textStatus
	 * @param {object} jqXHR
	 */
	
	/**
	 * @memberof hotplace
     * @function ajax
     * @param {object} 	   		params 설정
     * @param {string} 	   		params.url - 전송URL (처음에 '/' 반드시 생략)
     * @param {boolean}    		params.async - 비동기 여부 (default 'true')
     * @param {boolean}    		params.activeMask - ajax 마스크 사용여부 (default 'true')
     * @param {boolean}    		params.isMaskTran - multi ajax 마스크 사용여부 (default 'false')      
     * @param {string}			params.loadEl - 마스크할 element selector( ex: #id )
     * @param {string}			params.loadMsg - 마스크시 메시지 (default '로딩중입니다')
     * @param {ajax_beforeSend} params.beforeSend - 전송전 실행할 함수
     * @param {string}	   		params.contentType - (default 'application/x-www-form-urlencoded; charset=UTF-8')
     * @param {string}	   		params.dataType - (default 'json')
     * @param {string}     		params.method - (default 'POST')
     * @param {string}	   		params.data 
     * @param {ajax_success}	params.success
     * @param {number}			params.timeout - timeout(millisecond) default 300000
     */
	hotplace.ajax = function(params) {
		var dom = hotplace.dom;
		
		$.ajax(_ROOT_CONTEXT + params.url, {
			async: (params.async == null)? true : params.async,
			beforeSend: function(xhr) {
				var activeMask = (params.activeMask == undefined) ? true : params.activeMask; //전체설정 이후 마스크 개별설정
				if(activeMask && !params.isMaskTran) dom.showMask(params.loadEl, params.loadMsg);
				
				if(params.beforeSend && typeof params.beforeSend === 'function') {
					params.beforeSend(xhr);
				} 
			},
			contentType: params.contentType || 'application/x-www-form-urlencoded; charset=UTF-8',
			dataType: params.dataType || 'json',
			method: params.method || 'POST',
			context: params.context || document.body,
			data: params.data,
			statusCode: {
				404: function() {
					console.log('Page not found');
				}  
			},
			success: function(data, textStatus, jqXHR) {
				if(!params.success || typeof params.success !== 'function') {
					throw new Error('success function not defined');
				}
				
				try {
					params.success(data, textStatus, jqXHR);
					
				} 
				finally {
					var activeMask = (params.activeMask == undefined) ? true : params.activeMask; 
					if(activeMask) {
						if(params.isMaskTran) {
							dom.hideMaskTransaction();
						}
						else {
							dom.hideMask();
						}
					} 
					
				}
			},
			error: function(jqXHR, textStatus, e) {
				//리턴이 html인 요청에서 오류가 발생한 경우
				if(params.dataType == 'html') {
					jqXHR.errCode = _err.PAGE_NOT_FOUND;
				}
				else {
					jqXHR.errCode = ($.parseJSON(jqXHR.responseText)).errCode;
				}
				
				if(!params.error || typeof params.error !== 'function') {
					//Default 동작
				}
				else {
					params.error(jqXHR, textStatus, e);
				}
				
				var activeMask = (params.activeMask == undefined) ? true : params.activeMask; 
				if(activeMask) {
					if(params.isMaskTran) {
						dom.hideMaskTransaction();
					}
					else {
						dom.hideMask();
					}
				} 
			},
			complete: function(jqXHR, textStatus) {
				if(params.complete) {
					params.complete(jqXHR);
				}
				else {
					
					//에러 처리전 실행할 함수
					if($.isFunction(params.completeBeforeFn)) {
						params.completeBeforeFn();
					}
					
					hotplace.processAjaxError(jqXHR.errCode);
					
				}
			},
			timeout: params.timeout || 300000
		});
	}
	
	var _err = {
		PAGE_NOT_FOUND: '404',
		DUP_LOGIN: '202', //중복 로그인
		WRONG_ACCOUNT: '102', //아이디 및 비밀번호
		JANGAE_GONGJI: '900', //장애공지
		DUP_ID: '300',//중복된 아이디
		JOIN: '600', //회원가입 오류
		UPLOAD: '601',
		MAEMUL_REG: '602', //매물등록 오류
		MAEMUL_DUP: '603', //매물중복등록 오류,
		CONSULTING_REG: '604', //컨설팅 등록오류
		CONSULTING_DUP: '605'  //컨설팅 중복오류
	};
	
	hotplace.error = _err;
	
	hotplace.processAjaxError = function(errCode) {
		switch(errCode) {
		case '100' :
			hotplace.dom.showAlertMsg();
			break;
		case _err.DUP_LOGIN :
			hotplace.dom.showAlertMsg(function() {
				window.location.reload();
			},'중복 로그인');
		case _err.JANGAE_GONGJI :	//장애공지걸림
			window.location.reload();
			break;
		case '500' :
			hotplace.dom.showAlertMsg();
			break;
		case _err.WRONG_ACCOUNT :
			hotplace.dom.showAlertMsg(function() {console.log('ooooo')}, '아이디 또는 비밀번호가 틀립니다.', {width:'30%'});
			break;
		case _err.DUP_ID :
			hotplace.dom.showAlertMsg(null, '중복된 아이디입니다.', {width:'30%'});
			break;
		case _err.JOIN :
			hotplace.dom.showAlertMsg(null, '회원가입도중 오류가 발생했습니다.', {width:'40%'});
			break;
		case _err.UPLOAD:
			hotplace.dom.showAlertMsg(null, '파일업로드중 에러가 발생했습니다.', {width:'40%'});
			break;
		case _err.MAEMUL_REG:
			hotplace.dom.showAlertMsg(null, '매물등록중 에러가 발생했습니다.', {width:'40%'});
			break;
		case _err.MAEMUL_DUP:
			hotplace.dom.showAlertMsg(function() {
				hotplace.dom.closeModal();
			}, '이미 등록된 매물입니다.', {width:'40%'});
			break;
		case _err.CONSULTING_REG:
			hotplace.dom.showAlertMsg(null, '컨설팅요청 등록중 에러가 발생했습니다.', {width:'40%'});
			break;
		case _err.CONSULTING_DUP:
			hotplace.dom.showAlertMsg(function() {
				hotplace.dom.closeModal();
			}, '이미 요청된 컨설팅입니다.', {width:'40%'});
			break;
		case _err.PAGE_NOT_FOUND:
			hotplace.dom.showAlertMsg(null, '해당요청이 서버에 존재하지 않습니다.', {width:'50%'});
			break;
		case '000' :
			break;
		}
	}
	
	
	/**
	 * @memberof hotplace
     * @function getPlainText
     * @param {string} 	   		url - 전송URL (처음에 '/' 반드시 생략)
     * @param {object} 	   		param - data
     * @param {ajax_success}    cbSucc	
     * @param {boolean}    		isActiveMask - ajax 마스크 사용여부 (default 'true')
     * @param {boolean}    		isMaskTran - multi ajax 마스크 사용여부 (default 'false')
     * @param {function}		completeFn - ajax 통신이 완전히 종료된 후 실행될 함수
     */
	hotplace.getPlainText = function(url, param, cbSucc, cbErr, isActiveMask, isMaskTran, completeFn, loadEl) {
			
		hotplace.ajax({
			url: url,
			method: 'GET',
			dataType: 'text',
			data: param || {},
			activeMask: (isActiveMask != undefined) ? isActiveMask : true,
			isMaskTran: isMaskTran,
			loadEl: loadEl,
			success: function(data, textStatus, jqXHR) {
				var jo = $.parseJSON(data);
				
				if(!jo.success) {
					jqXHR.errCode = jo.errCode;
				}
				else {
					cbSucc(jo);
				}
				//console.log('data count : ' + jo.datas.length);
				
			},
			error: function(jqXHR, textStatus, e) {
				if(cbErr) cbErr();
			},
			completeBeforeFn: completeFn
		});
		
	}
	
	/**
	 * @memberof hotplace
     * @function getPlainTextFromJson 
     * @param {string} 	   		url - 전송URL (처음에 '/' 반드시 생략)
     * @param {object} 	   		param - data
     * @param {ajax_success}    cbSucc	
     * @param {boolean}    		isActiveMask - ajax 마스크 사용여부 (default 'true')
     * @param {string}    		loadEl - 마스크할 element selector( ex: #id )
     */
	hotplace.getPlainTextFromJson = function(url, param, cbSucc, isActiveMask, loadEl) {
	
		hotplace.ajax({
			url: url,
			method: 'POST',
			dataType: 'text',
			contentType: 'application/json; charset=UTF-8',
			data: param || {},
			loadEl: loadEl,
			activeMask: (isActiveMask != undefined) ? isActiveMask : true,
			success: function(data, textStatus, jqXHR) {
				var jo = $.parseJSON(data);
				cbSucc(jo);
			}
		});
	}
	
	/**
     * @memberof hotplace
     * @function createUuid
     * @returns {string}
     */
	hotplace.createUuid = function() {
		 return _s4() + _s4() + '-' + _s4() + '-' + _s4() + '-' + _s4() + '-' + _s4() + _s4() + _s4();
	}
	
	/**
     * @memberof hotplace
     * @function getContextUrl
     * @returns {string}
     */
	hotplace.getContextUrl = function() {
		return _ROOT_CONTEXT;
	} 
	
	
	hotplace.isExistJqDom = function($el) {
		return ($el && $el.get(0).length > 0);
	}
}(
	window.hotplace = window.hotplace || {},
	jQuery	
));
