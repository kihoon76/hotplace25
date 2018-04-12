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
    
    String.prototype.trimTS = function() {
    	var s = this;
    	if(s == '') return "";
    	
    	var sLen = 0;
   	  	var idx1 = -1;
   	  	sLen = s.length;
    	
   	  	for(var i=0; i<sLen; i++) {
   	  		var vch = s.substring(i, i+1);
   	  		if(vch != '\t' && vch != ' ') {
   	  			idx1 = i;
   	  			break;
   	  		}
   	  	}
    	
   	  	if(idx1 != -1) {
    	   s = s.substring(idx1);
   	  	}
    	  
    	var idx2 = -1;
    	sLen = s.length;
    	
    	for(var i=sLen; i>-1; i--) {
    	   var vch = s.substring(i, i+1);
    	   if(vch != '\t' && vch != ' ') {
    		   idx2 = i;
    		   break;
    	   }
    	}
    	
    	if(idx2 != -1) {
    		s = s.substring(0, idx2 + 1);
    	}
    	  
    	return s;
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
    	minZoomLevel: 9,
    	mapDefaultX: 126.9784147,//127.9204629,
    	mapDefaultY: 37.5666805,//36.0207091,
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
    	},
    	codes: {
    		cityPlan: {
    			'doro':{name:'도로', value:'0500'},
    			'cheoldo':{name:'철도', value:'0900'},
    			'etcTraffic':{name:'기타교통', value:'0400'},
    			'park':{name:'공원', value:'0200'},
    			'etcGonggan':{name:'기타공간시설', value:'0300'},
    			'publicMunhwa':{name:'공공문화체육시설', value:'0100'},
    			'bangjae':{name:'방재시설', value:'0600'},
    			'bogeon':{name:'보건위생시설', value:'0700'},
    			'yutong':{name:'유통공급시설', value:'0800'},
    			'environment':{name:'환경기초시설', value:'1000'}
    		},
    		cityPlanState: {
    			'jeonphil':{name:'전필', value:'100'},
    			'jeochok':{name:'저촉', value:'010'},
    			'jeobham':{name:'접함', value:'001'}
    		},
    		bosangPyeonib: {
    			'bosang':{name:'보상', value:'10'},
    			'pyeonib':{name:'편입', value:'01'},
    		},
    		jiyeok: {
    			'seoul':{name:'서울특별시', value:'11'},
    			'busan':{name:'부산광역시', value:'26'},
    			'daegu':{name:'대구광역시', value:'27'},
    			'incheon':{name:'인천광역시', value:'28'},
    			'gwangju':{name:'광주광역시', value:'29'},
    			'daejeon':{name:'대전광역시', value:'30'},
    			'ulsan':{name:'울산광역시', value:'31'},
    			'sejong':{name:'세종특별자치시', value:'36'},
    			'gyeonggido':{name:'경기도', value:'41'},
    			'gangwondo':{name:'강원도', value:'42'},
    			'chungcheongNorth':{name:'충청북도', value:'43'},
    			'chungcheongSouth':{name:'충청남도', value:'44'},
    			'jeonlaNorth':{name:'전라북도', value:'45'},
    			'jeonlaSouth':{name:'전라남도', value:'46'},
    			'gyeongsangNorth':{name:'경상북도', value:'47'},
    			'gyeongsangSouth':{name:'경상남도', value:'48'},
    			'jeju':{name:'제주도', value:'50'}
    		},
    		jimok: {
    			'jeon':{name:'전', value:'01'},
    			'dab':{name:'답', value:'02'},
    			'gwasuwon':{name:'과수원', value:'03'},
    			'mogjang':{name:'목장', value:'04'},
    			'imya':{name:'임야', value:'05'},
    			'gwangcheonji':{name:'광천지', value:'06'},
    			'yeomjeon':{name:'염전', value:'07'},
    			'dae':{name:'대', value:'08'},
    			'gongjang':{name:'공장', value:'09'},
    			'school':{name:'학교', value:'10'},
    			'juchajang':{name:'주차장', value:'11'},
    			'juyuso':{name:'주유소', value:'12'},
    			'changgo':{name:'창고', value:'13'},
    			'doro':{name:'도로', value:'14'},
    			'cheoldo':{name:'철도', value:'15'},
    			'jebang':{name:'제방', value:'16'},
    			'hacheon':{name:'하천', value:'17'},
    			'gugeo':{name:'구거', value:'18'},
    			'yuji':{name:'유지', value:'19'},
    			'yangeojang':{name:'양어장', value:'20'},
    			'sudoyongji':{name:'수도용지', value:'21'},
    			'park':{name:'공원', value:'22'},
    			'cheyugyongji':{name:'체육용지', value:'23'},
    			'yuwonji':{name:'유원지', value:'24'},
    			'jonggyoyongji':{name:'종교용지', value:'25'},
    			'sajeogji':{name:'사적지', value:'26'},
    			'myoji':{name:'묘지', value:'27'},
    			'jabjongji':{name:'잡종지', value:'28'}
    		},
    		yongdoJiyeog: {
    			'gongeob':{name:'공업지역', value:'18'},
    			'ilbanGongeob':{name:'일반공업지역', value:'16'},
    			'jeonyongGongeob':{name:'전용공업지역', value:'17'},
    			'junGongeob':{name:'준공업지역', value:'15'},
    			'gwanli':{name:'관리지역', value:'23'},
    			'gyehoegGwanli':{name:'계획관리지역', value:'19'},
    			'bojeonGwanli':{name:'보전관리지역', value:'25'},
    			'saengsanGwanli':{name:'생산관리지역', value:'21'},
    			'nogji':{name:'녹지지역', value:'24'},
    			'bojeonNogji':{name:'보전녹지지역', value:'26'},
    			'saengsanNogji':{name:'생산녹지지역', value:'22'},
    			'natureNogji':{name:'자연녹지지역', value:'20'},
    			'nonglim':{name:'농림지역', value:'27'},
    			'sangeob':{name:'상업지역', value:'05'},
    			'geunlinSangeob':{name:'근린상업지역', value:'03'},
    			'yutongSangeob':{name:'유통상업지역', value:'04'},
    			'ilbanSangeob':{name:'일반상업지역', value:'02'},
    			'jungsimSangeob':{name:'중심상업지역', value:'01'},
    			'jugeo':{name:'주거지역', value:'14'},
    			'ilbanJugeo':{name:'일반주거지역', value:'10'},
    			'jeonyongJugeo':{name:'전용주거지역', value:'13'},
    			'firstIlbanJugeo':{name:'제1종일반주거지역', value:'09'},
    			'secondIlbanJugeo':{name:'제2종일반주거지역', value:'08'},
    			'thirdIlbanJugeo':{name:'제3종일반주거지역', value:'07'},
    			'firstJeonyongJugeo':{name:'제1종전용주거지역', value:'12'},
    			'secondJeonyongJugeo':{name:'제2종전용주거지역', value:'11'},
    			'junjugeo':{name:'준주거지역', value:'06'},
    			'natureBoho':{name:'자연환경보전지역', value:'28'},
    			'mibunlyu':{name:'용도지역 미분류', value:'29'},
    		},
    		yongdoJigu: {
    			'gaebaljinheung':{name:'개발진흥지구', value:'0900'},
    			'gyeonggwan':{name:'경관지구', value:'0100'},
    			'watersideGyeonggwan':{name:'수변경관지구', value:'0102'},
    			'sigajiGyeonggwan':{name:'시가지경관지구', value:'0103'},
    			'natureGyeonggwan':{name:'자연경관지구', value:'0101'},
    			'godo':{name:'고도지구', value:'0300'},
    			'highestGodo':{name:'최고고도지구', value:'0301'},
    			'lowestGodo':{name:'최저고도지구', value:'0302'},
    			'migwan':{name:'미관지구', value:'0200'},
    			'historyMunhwaMigwan':{name:'역사문화미관지구', value:'0202'},
    			'ilbanMigwan':{name:'일반미관지구', value:'0203'},
    			'gongyongBoho':{name:'공용시설보호지구', value:'0702'},
    			'gonghangBoho':{name:'공항시설보호지구', value:'0704'},
    			'siseolBoho':{name:'시설보호지구', value:'0700'},
    			'schoolBoho':{name:'학교시설보호지구', value:'0701'},
    			'harborBoho':{name:'항만시설보호지구', value:'0703'},
    			'bangjae':{name:'방재지구', value:'0500'},
    			'banghwa':{name:'방화지구', value:'0400'},
    			'bojon':{name:'보존지구', value:'0600'},
    			'munhwaBojeon':{name:'문화자원보존지구', value:'0601'},
    			'ecosystemBojon':{name:'생태계보존지구', value:'0603'},
    			'importantSiseolBojon':{name:'중요시설물보존지구', value:'0602'},
    			'chwilag':{name:'취락지구', value:'0800'},
    			'natureChwilag':{name:'자연취락지구', value:'0801'},
    			'speciallimit':{name:'특정용도제한지구', value:'1000'}
    			//'wilag':{name:'위락지구', value:'위락지구'},
    			//'remodeling':{name:'리모델링지구', value:'리모델링지구'},
    		},
    		yongdoGuyeog: {
    			'sigahwa':{name:'시가화조정구역', value:'0400'},
    			'gaeballimit':{name:'개발제한구역', value:'0200'},
    			'citynature':{name:'도시자연공원구역', value:'0300'},
    			'susanboho':{name:'수산자원보호구역', value:'0500'},
    			'minibji':{name:'입지규제최소구역', value:'0700'},
    			'planbyjigu':{name:'지구단위계획구역', value:'0100'},
    		},
    		etcLawLimit: {
    			'bojeonsanji':{name:'보전산지', value:'01'},
    			'junbojeonsanji':{name:'준보전산지', value:'02'},
    			'gongig':{name:'공익용산지', value:'03'},
    			'imeob':{name:'임업용산지', value:'04'},
    			'nongeobboho':{name:'농업보호지역', value:'05'},
    			'nongeobjinheung':{name:'농업진흥구역', value:'06'},
    			'sangsuboho':{name:'상수원보호구역', value:'07'},
    			'baechoollimit':{name:'배출시설설치제한지역', value:'08'},
    			'sujilboho':{name:'수질보전대책지역', value:'09'},
    			'jeobdo':{name:'접도구역', value:'10'},
    			'gongjanglimit':{name:'공장설립제한지역', value:'11'},
    			'biotob':{name:'비오톱', value:'12'},
    			'acceptdevlimit':{name:'개발행위허가제한지역', value:'13'},
    			'jeongbi':{name:'정비구역', value:'14'},
    			'jaegaebal':{name:'재개발구역', value:'15'},
    			'newtown':{name:'뉴타운', value:'16'},
    			'limitboho':{name:'제한보호구역', value:'17'},
    			'munhwajae':{name:'문화재보존영향검토대상구역', value:'18'}
    		},
    		etcChamgo: {
    			'yeongnongnegative':{name:'영농여건불리농지', value:'영농여건불리농지'},
    			'accepttojigeolae':{name:'토지거래허가구역', value:'토지거래허가구역'},
    		},
    		gyeongsado: {
    			'm25':{name:'25도 미만', value:'m25'},
    			'M25':{name:'25도 이상', value:'M25'},
    		},
    		jyeobdoState: {
    			'dorojeobham':{name:'도로접함', value:'도로접함'},
    			'maengji':{name:'맹지', value:'맹지'},
    		},
    		tojiUseLimitCancel: {
    			'philji':{name:'토지이용규제 해소 필지', value:'토지이용규제 해소 필지'}
    		},
    		gongsi: {
    			'm1000':{name:'1,000원 미만', value:'1'},
    			'1001TO10000':{name:'1,000원~10,000원', value:'2'},
    			'10001TO100000':{name:'10,000원~100,000원', value:'3'},
    			'100001TO1000000':{name:'100,000원~1,000,000원', value:'4'},
    			'1000001TO10000000':{name:'1,000,000원~10,000,000원', value:'5'},
    			'M10000000':{name:'1천만원 이상', value:'6'}
    		},
    		mulgeonKind: {
    			'jugeo':{name:'주거용', value:''},
    			'eobmoo':{name:'업무 및 상업용', value:''},
    			'toji':{name:'토지(농지,임야 등)', value:''},
    			'gongchang':{name:'공장/창고', value:''},
    			'etc':{name:'기타(종교용지,구거 등)', value:''},
    		},
    		jiga: {
    			'm1000':{name:'1천만원 미만', value:'m1000'},
    			'1000TO5000':{name:'1천만원~5천만원', value:'1000|5000'},
    			'5000TO10000':{name:'5천만원~1억', value:'5000|10000'},
    			'10000TO30000':{name:'1억~3억', value:'10000|30000'},
    			'30000TO50000':{name:'3억~5억', value:'30000|50000'},
    			'50000TO100000':{name:'5억~10억', value:'50000|100000'},
    			'100000TO200000':{name:'10억~20억', value:'100000|200000'},
    			'M200000':{name:'20억 이상', value:'M200000'}
    		},
    		minibchalratio:{
    			"M100":{name:'100% 이상', value:'M100'},
    			"100TO75":{name:'100~75%', value:'75|100'},
    			"75TO50":{name:'75~50%', value:'50|75'},
    			"50TO25":{name:'50~25%', value:'25|50'},
    			"m25":{name:'25% 미만', value:'m25'}
    		}
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
    	try {
    		if (typeof(amount) === 'string') { amount = options.contexts[0].get(amount); }
    	}
    	catch(e) {}

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
    
    Handlebars.registerHelper('trimString', function(passedString, startString, endString) {
    	var theString = passedString.substring(startString, endString);
    	return Handlebars.SafeString(theString);
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
			/*statusCode: {
				404: function() {
					console.log('Page not found');
				}
			},*/
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
				
				console.log(textStatus);
				//리턴이 html인 요청에서 오류가 발생한 경우
				if(textStatus == 'timeout') {
					jqXHR.errCode = _err.TIMEOUT;
				}
				else if(e == '403' || e.toLowerCase() == 'forbidden') {
					jqXHR.errCode = _err.FORBIDDEN;
				}
				else if(e == '404' || e.toLowerCase() == 'not found') {
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
					
					hotplace.processAjaxError(jqXHR.errCode, jqXHR.errMsg);
					
				}
			},
			timeout: params.timeout || 2000000
		});
	}
	
	var _err = {
		LOGIN:'100',
		FORBIDDEN: '403',
		PAGE_NOT_FOUND: '404',
		SERVER_ERR: '500',
		DUP_LOGIN: '202', //중복 로그인
		WRONG_ACCOUNT: '102', //아이디 및 비밀번호
		JANGAE_GONGJI: '900', //장애공지
		DUP_ID: '300',//중복된 아이디
		JOIN: '600', //회원가입 오류
		UPLOAD: '601',
		MAEMUL_REG: '602', //매물등록 오류
		MAEMUL_DUP: '603', //매물중복등록 오류,
		CONSULTING_REG: '604', //컨설팅 등록오류
		CONSULTING_DUP: '605',  //컨설팅 중복오류
		GWANSIM_DUP:'606',
		GWANSIM_REG:'607',
		GWANSIM_MOD:'614',
		COORD: '608', //주소검색 오류
		MISS_LATLNG: '609', //위경도 정보 오류
		HEATMAP_CAPTURE:'610', //히트맵 캡쳐오류
		TIMEOUT:'611', //타임아웃
		GWANSIM_DEL:'612', //관심물건 삭제오류
		USER_MOD:'613', //회원계정정보 수정오류
		FORMAT: '999'   //입력폼 포멧오류
		
	};
	
	hotplace.error = _err;
	
	hotplace.processAjaxError = function(errCode, msg) {
		switch(errCode) {
		case _err.LOGIN :
			hotplace.dom.showAlertMsg(hotplace.dom.showLoginForm, msg || '로그인후 사용하세요.', {width:'50%'});
			break;
		case _err.DUP_LOGIN :
			hotplace.dom.showAlertMsg(function() {
				window.location.reload();
			},msg || '중복 로그인');
		case _err.JANGAE_GONGJI :	//장애공지걸림
			window.location.reload();
			break;
		case _err.SERVER_ERR: 
			hotplace.dom.showAlertMsg(null, msg || '서버오류가 발생했습니다.');
			break;
		case _err.WRONG_ACCOUNT :
			hotplace.dom.showAlertMsg(function() {console.log('ooooo')}, msg || '아이디 또는 비밀번호가 틀립니다.', {width:'30%'});
			break;
		case _err.DUP_ID :
			hotplace.dom.showAlertMsg(null, msg || '중복된 아이디입니다.', {width:'30%'});
			break;
		case _err.JOIN :
			hotplace.dom.showAlertMsg(null, msg || '회원가입도중 오류가 발생했습니다.', {width:'40%'});
			break;
		case _err.USER_MOD :
			hotplace.dom.showAlertMsg(null, msg || '회원정보 수정중 오류가 발생했습니다.', {width:'40%'});
			break;
		case _err.UPLOAD:
			hotplace.dom.showAlertMsg(null, msg || '파일업로드중 에러가 발생했습니다.', {width:'40%'});
			break;
		case _err.MAEMUL_REG:
			hotplace.dom.showAlertMsg(null, msg || '매물등록중 에러가 발생했습니다.', {width:'40%'});
			break;
		case _err.MAEMUL_DUP:
			hotplace.dom.showAlertMsg(function() {
				hotplace.dom.closeModal();
			}, '이미 등록된 매물입니다.', {width:'40%'});
			break;
		case _err.GWANSIM_REG:
			hotplace.dom.showAlertMsg(null, msg || '관심물건 등록중 에러가 발생했습니다.', {width:'40%'});
			break;
		case _err.GWANSIM_DUP:
			hotplace.dom.showAlertMsg(function() {
				hotplace.dom.closeModal();
			}, msg || '이미 등록된 관심물건입니다.', {width:'40%'});
			break;
		case _err.GWANSIM_DEL:
			hotplace.dom.showAlertMsg(function() {
				hotplace.dom.closeModal();
			}, msg || '관심물건이 삭제 되지 않았습니다.', {width:'40%'});
			break;
		case _err.GWANSIM_MOD:
			hotplace.dom.showAlertMsg(null, msg || '관심물건 수정중 에러가 발생했습니다.', {width:'40%'});
			break;
		case _err.CONSULTING_REG:
			hotplace.dom.showAlertMsg(null, msg || '컨설팅요청 등록중 에러가 발생했습니다.', {width:'40%'});
			break;
		case _err.CONSULTING_DUP:
			hotplace.dom.showAlertMsg(function() {
				hotplace.dom.closeModal();
			}, msg || '이미 요청된 컨설팅입니다.', {width:'40%'});
			break;
		case _err.PAGE_NOT_FOUND:
			hotplace.dom.showAlertMsg(null, msg || '해당요청이 서버에 존재하지 않습니다.', {width:'50%'});
			break;
		case _err.FORBIDDEN:
			hotplace.dom.showAlertMsg(null, msg || '이용권한이 없습니다.', {width:'50%'});
			break;
		case _err.COORD:
			hotplace.dom.showAlertMsg(null, msg || '주소찾아오는중 오류가 발생했습니다.', {width:'50%'});
			break;
		case _err.MISS_LATLNG:
			hotplace.dom.showAlertMsg(null, msg || '위경도 정보가 존재하지 않습니다.', {width:'50%'});
			break;
		case _err.HEATMAP_CAPTURE:
			hotplace.dom.showAlertMsg(null, msg || '히트맵 캡쳐도중 오류가 발생했습니다.', {width:'50%'});
			break;
		case _err.TIMEOUT:
			hotplace.dom.showAlertMsg(null, msg || '요청이 타임아웃 되었습니다.', {width:'50%'});
			break;
		case _err.FORMAT :
			hotplace.dom.showAlertMsg(null, msg || '입력폼 형식이 맞지 않습니다.', {width:'50%'});
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
	hotplace.getPlainText = function(url, param, cbSucc, cbErr, isActiveMask, isMaskTran, completeFn, loadEl, async) {
			
		hotplace.ajax({
			url: url,
			method: 'GET',
			dataType: 'text',
			async: (async == undefined) ? true : async,
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
