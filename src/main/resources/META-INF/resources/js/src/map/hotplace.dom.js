/**
 * @namespace hotplace.dom
 * */
(function(dom, $) {
	
	var _loadEl,
		_loadTxt = '',//'로딩 중입니다';
		_loadEndCount = 0,
		_yearRangeMode = 'manual', //타임뷰 모드  manual(수동) auto(자동)
		_modalPopup = '#modalPopup',
		_$yearRange = $('#dvYearRange'),
		_$btnAutoYear = $('#btnAutoYear'),
		_$modalPopup = $(_modalPopup),
		_$momPopup = $('#momPopup'), //모달 위 모달
		_$alrtPopup = $('#alrtPopup'),
		_$imagePopup = $('#imagePopup'), //이미지 팝업
		_$gnbLogin = $('#gnbLogin'),
		_$gnbLogout = $('#gnbLogout'),
		_btnAlrt = '#btnAlrt',//alert 창버튼
		_dvContextMenu = '#dvContextMenu',
		_infoWinCoordAddr = null, //context address infowin
		_markerCoord = null,
		_$btnCalcArea = $('#btnCalcArea'), //면적재기 버튼
		_$btnCalcDistance = $('#btnCalcDistance'), //거리재기 버튼
		_$btnStreetView = $('#btnStreetView'),
		_dvCommonPano = '#dvCommonPano', //물건보기에서 파노라마 컨테이너
		_dvCommonPanoInfo = '#dvCommonPanoInfo', //물건보기에서 파노라마 정보 컨테이너
		_dvHeatMapCapture = '#dvHeatMapCapture',
		_$mapArea = $('#mapArea'), 
		_sliderGrp = {}; //slider 관리객체
	
	dom.getModalPopId = function() {
		return _modalPopup;
	}
	
	dom.isActiveCalcArea = function() {
		return _$btnCalcArea.hasClass('active');
	}
	
	dom.isActiveCalcDistance = function() {
		return _$btnCalcDistance.hasClass('active');
	}
	
	dom.isActiveStreetview = function() {
		return _$btnStreetView.hasClass('active');
	}
	
	dom.triggerStreetview = function() {
		_$btnStreetView.trigger('click', true);
	}
	
	dom.toggleFullScreen = function() {
		if(!document.fullscreenElement &&    // alternative standard method
		    !document.mozFullScreenElement &&
		    !document.webkitFullscreenElement) {  // current working methods
		        if(document.documentElement.requestFullscreen) {
		            document.documentElement.requestFullscreen();
		        } 
		        else if(document.documentElement.mozRequestFullScreen) {
		            document.documentElement.mozRequestFullScreen();
		        }
		        else if(document.documentElement.webkitRequestFullscreen) {
		            document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
		        }
		}
		else {
			if(document.cancelFullScreen) {
				document.cancelFullScreen();
		    }
			else if(document.mozCancelFullScreen) {
				document.mozCancelFullScreen();
		    }
			else if(document.webkitCancelFullScreen) {
				document.webkitCancelFullScreen();
		    }
		}
	}
	
	/**
	 * @private
	 * @typedef {object} loadEffects
	 * @desc load mask type
	 * {@link https://github.com/vadimsva/waitMe/blob/gh-pages/index.html waitMe}
	 */
	var _loadEffects = {
		bounce: 'bounce',
		rotateplane: 'rotateplane',
		stretch: 'stretch',
		orbit: 'orbit',
		roundBounce: 'roundBounce',
		win8: 'win8',
		win8_linear: 'win8_linear',
		ios: 'ios',
		facebook: 'facebook',
		rotation: 'rotation',
		timer: 'timer',
		pulse: 'pulse',
		progressBar: 'progressBar',
		bouncePulse: 'bouncePulse'
	};
	
	/**
	 * @private
	 * @type {object}
	 * @desc javascript template engine handlebar를 통해 서버에서 가져온 html을 저장
	 */
	var _templates = {};
	function _hasTemplates(name) {
		return !(_templates[name] === undefined);
	}
	
	/**
	 * @private
	 * @type {object}
	 * @desc cell layer의 한 cell을 클릭했을때 나타나는 infoWindow
	 */
	var _infoWindowForCell = null;
	
	/**
	 * @private
	 * @desc cell layer에 기본적으로 표시할 데이터 연도 
	 */
	var _showCellYear = $('body').data('year');
	
	var _timeViewSliderMin = _showCellYear - 5;
	var _timeViewSliderMax = _showCellYear;
	
	/**
	 * @private
	 * @type {function}
	 * @desc 모달창이 닫힌후 실행되는 함수 
	 */
	var _modalCloseAfterFn = function() {};
	
	/**
	 * @private
	 * @type {function}
	 * @desc alert창이 닫힌후 실행되는 함수 
	 */
	var _alertCloseAfterFn = function() {};
	
	/**
	 * @private
	 * @type {function}
	 * @desc 모달창이 열린후 실행되는 함수 
	 */
	var _modalOpenAfterFn = function() {};
	
	/**
	 * @private
	 * @function _runWaitMe
	 * @param {object} loadEl loadmask를 적용할 jquery 객체
	 * @param {number} num loadmask style 선택(1|2|3)
	 * @param {loadEffects} effect loadmask effect type
	 * @param {string} msg 로딩 메시지
	 * @desc open source waitMe 설정
	 * {@link https://github.com/vadimsva/waitMe/blob/gh-pages/index.html waitMe}
	 */
	function _runWaitMe(loadEl, num, effect, msg){
		
		var fontSize = '';
		var maxSize = '';
		var loadTxt = msg || '';//'로딩 중입니다';
		var textPos = '';
		
		switch (num) {
			case 1:
			maxSize = '';
			textPos = 'vertical';
			fontSize = '25px';
			break;
			case 2:
			loadTxt = '';
			maxSize = 30;
			textPos = 'vertical';
			break;
			case 3:
			maxSize = 30;
			textPos = 'horizontal';
			fontSize = '18px';
			break;
		}
		
		_loadEl = loadEl;
		_loadEl.waitMe({
			effect: effect,
			text: loadTxt,
			bg: 'rgba(255,255,255,0.4)',//'rgba(255,255,255,0.4)',
			color: '#000',
			maxSize: maxSize,
			source: 'img.svg',
			textPos: textPos,
			fontSize: fontSize,
			onClose: function() {}
		});
	}
	
	/**
	 * @private
	 * @function _makeInfoWindowForCell
	 * @param {object} vender 맵 벤더객체
	 * @param {object} venderEvent 맵 벤더이벤트객체
	 * @param {*} data handlebars를 통해 template에 전달할 데이터
	 * @param {object} listeners 리스너 객체
	 * @param {function} listeners.eventName 리스너
	 * @returns {object} infoWindow
	 * @desc cell layer의 한 cell을 클릭했을때 나타나는 infoWindow를 생성함
	 *       생성후 전역변수 _infoWindowForCell에 저장
	 */
	function _makeInfoWindowForCell(vender, venderEvent, data, listeners) {
		var template = dom.getTemplate('cellForm');
		
		_infoWindowForCell = new vender.InfoWindow({
	        content: template(data),
	        borderWidth: 1
	        //zIndex: 1000
	    });
		
		_infoWindowForCell.setOptions('zIndex', 1000);
		
		if(listeners) {
			for(var eventName in listeners) {
				venderEvent.addListener(_infoWindowForCell, eventName, function($$eventName, $$infoWindowForCell) {
					return function(obj) {
						
						listeners[$$eventName]($$infoWindowForCell, obj);
					}
				}(eventName, _infoWindowForCell));
			}
		}
		
		
		
		return _infoWindowForCell;
	}
	
	/**
	 * @private
	 * @function _bindModalCloseEvent
	 * @param {function} closeFn close event handler
	 * @desc modal창이 닫힐때 실행될 함수를 저장
	 */
	function _bindModalCloseEvent(closeFn) {
		_modalCloseAfterFn = closeFn;
	}
	
	
	function _bindAlertCloseEvent(closeFn) {
		_alertCloseAfterFn = closeFn;
	}
	
	/**
	 * @private
	 * @function _bindModalOpenEvent
	 * @param {function} openFn close event handler
	 * @desc modal창이 열린직후 실행될 함수를 저장
	 */
	function _bindModalOpenEvent(openFn) {
		_modalOpenAfterFn = openFn;
		console.log(_modalOpenAfterFn)
	}
	
	/**
	 * @memberof hotplace.dom
	 * @function getCurrentFnAfterModalClose
	 * @returns {function}
	 * @desc modal창이 닫힐때 실행될 함수를 반환
	 */
	dom.getCurrentFnAfterModalClose = function() {
		return _modalCloseAfterFn;
	}
	
	
	
	/**
	 * @memberof hotplace.dom
	 * @function openInfoWindowForCell
	 * @param {object} 
	 * @param {object} location 맵벤더 LatLng 객체
	 * @param {object} vender 맵벤더 객체(naver.maps, daum.maps)
	 * @param {object} venderEvent 맵벤더 이벤트객체
	 * @param {*} data handlebars를 통해 template에 전달할 데이터
	 * @param {object} listeners 리스너 객체
	 * @param {function} listeners.eventName 리스너
	 * @desc cell 정보를 보여줄 infoWindow를 생성하고 open한다
	 */
	dom.openInfoWindowForCell = function(map, location, vender, venderEvent, data, listeners) {
		_infoWindowForCell = _makeInfoWindowForCell(vender, venderEvent, data, listeners);
		_infoWindowForCell.open(map, location);
		
		//event handler가 걸려있는지 확인
		var ev = $._data(document.getElementById('btnCellClose'), 'events');
		if(!ev || !ev.click) {
			$('#btnCellClose').on('click', function(e) {
				dom.closeInfoWindowForCell();
			});
		}
	}
	
	/**
	 * @memberof hotplace.dom
	 * @function closeInfoWindowForCell
	 * @desc cell 정보를 나타내는 infoWindow를 닫은후 제거한다.
	 */
	dom.closeInfoWindowForCell = function() {
		if(_infoWindowForCell) {
			_infoWindowForCell.close();
			_infoWindowForCell = null;
		}
	}
	
	/**
	 * @memberof hotplace.dom
	 * @function openModal
	 * @param {string} title  modal창 헤더부분에 표시할 title
	 * @param {string} modalSize modal창 사이즈('bigsize'|'fullsize') 
	 * @param {function} closeFn modal창 close handler
	 * @desc 모달창 open
	 */
	dom.openModal = function(title, modalSize, closeFn, openFn) {
		_bindModalCloseEvent(closeFn  || function() {});
		_bindModalOpenEvent(openFn || function() {});
		
		_commonModal(_$modalPopup, modalSize);
	}
	
	dom.openModalOnModal = function(title, modalSize, closeFn, openFn) {
		_commonModal(_$momPopup, modalSize);
	}
	
	dom.openImageModalOnModal = function(modalSize, closeFn, openFn) {
		_commonModal(_$imagePopup, modalSize);
	}
	
	dom.openAlrtModal = function(modalSize, closeFn) {
		_bindAlertCloseEvent(closeFn  || function() {});
		_commonModal(_$alrtPopup, modalSize);
	} 
	
	function _commonModal($element, modalSize) {
		$element.removeClass('in').data('bs.modal', null);
		$element
		.modal({
			backdrop: 'static', 
			keyboard: false
		})
		.find('.modal-dialog')
		.css({
			width: modalSize ? modalSize.width : '96%'
		});
	}
	
	/**
	 * @memberof hotplace.dom
	 * @function createChart
	 * @desc chart 생성
	 */
	dom.createChart = function() {
		hotplace.chart.showEchartBar();
		hotplace.chart.showEchartScatter();
		hotplace.chart.showEchartPie();
		hotplace.chart.showEchartLine();  
	}
	
	/**
	 * @memberof hotplace.dom
	 * @function showMask
	 * @param {string} loadEl loadmask element selector  
	 * @param {string} msg 마스크 로딩시 보여질 메시지
	 * @desc waitMe mask show
	 */
	dom.showMask = function(loadEl, msg) {
		if(loadEl) {
			loadEl = $(loadEl);
		}
		else {
			loadEl = $('body');
		}
		_runWaitMe(loadEl, 1, _loadEffects.ios, msg);
	};
	
	/**
	 * @memberof hotplace.dom
	 * @function showMaskTransaction
	 * @param {number} count 하나의 마스크로 처리할 ajax 처리갯수  
	 * @param {string} loadEl loadmask element selector
	 * @param {string} msg 마스크 로딩시 보여질 메시지  
	 * @desc waitMe mask show
	 */
	dom.showMaskTransaction = function(count, loadEl, msg) {
		_loadEndCount = count || 0;
		dom.showMask(loadEl, msg);
	}
	
	/**
	 * @memberof hotplace.dom
	 * @function hideMaskTransaction
	 * @desc waitMe mask hide
	 */
	dom.hideMaskTransaction = function() {
		--_loadEndCount;
		if(_loadEndCount == 0) {
			dom.hideMask();
		}
	}
	
	/**
	 * @memberof hotplace.dom
	 * @function hideMask
	 * @desc waitMe mask hide
	 */
	dom.hideMask = function() {
		_loadEl.waitMe('hide');
	};
	
	/**
	 * @memberof hotplace.dom
	 * @function getTemplate
	 * @param {string} name 저장할 template의 키값
	 * @returns {object} - Handlebars.compile() 결과값
	 */
	dom.getTemplate = function(name, notUseCache, fn) {
		if(_templates[name] === undefined || notUseCache) {
			if(fn) {
				//fn은 반드시 동기로 처리
				try {
					_templates[name] = fn();
				}
				catch(e) {}
			}
			else {
				var url = 'resources/templates/';
				
				hotplace.ajax({
					url : url + name + '.handlebars',
					async : false,
					dataType : 'html',
					method : 'GET',
					activeMask : false,
					success : function(data, textStatus, jqXHR) {
						_templates[name] = Handlebars.compile(data);
					},
					error: function() {
						throw new Error('html template error')
					}
				});
			}
		}
		
		return _templates[name];
	}
	
	
	dom.checkSession = function(cb) {
		hotplace.ajax({
			url: 'checkSession',
			method: 'GET',
			dataType: 'text',
			activeMask: false,
			success: function(data, textStatus, jqXHR) {
				var jo = $.parseJSON(data);
				cb(jo.success);
			}
		});
	}
	
	
	/**
	 * @memberof hotplace.dom
	 * @function enableYearRangeDiv
	 * @param {boolean} enabled 타임시리얼 DIV 활성화 여부
	 * @desc 타임시리얼 DIV 활성화 여부
	 */
	dom.enableYearRangeDiv = function(enabled) {
		_$yearRange.rangeSlider({enabled:enabled});
		
		if(enabled) {
			_$btnAutoYear.removeAttr('disabled');
		}
		else {
			_$btnAutoYear.prop('disabled', true);
		}
	}
	
	/** 
	 * @memberof hotplace.dom
	 * @name captureImage 
	 * @type {function}
	 * @param {object} $element - 캡쳐할 요소
	 * @param {object} $target - 캡쳐한 이미지를 넣을 요소 혹은 캡쳐한 이미지를 저장한 배열
	 * @param {function} completeFn - 캡쳐이후 실행할 함수
	 * @desc  히트맵을 이미지로 캡쳐해서 보여준다 (ie 지원안됨)
	 * {@link https://github.com/tsayen/dom-to-image dom-to-image}
	 */
	dom.captureImage = function($element, $target, completeFn, errFn) {
		//completeFn();
		domtoimage.toPng($element[0])
	    .then(function(dataUrl) {
	        var img = new Image();
	        
	        img.src = dataUrl;
	        img.style.width = '100%';
	        img.style.height = '400px';
	        
	        if($.isArray($target)) {
	        	$target.push(img);
	        }
	        else {
	        	$target.append(img);
	        }
	        
	        if(completeFn) completeFn();
	    })
	    .catch(function (error) {
	    	if(errFn) errFn();
	        //throw error;
	    });
	}
	
	
	dom.showHeatmapCapturedImages = function(arr) {
		var currYear = $('body').data('year');
		_appendModalPopup('mapCaptureForm', null, {title: hotplace.maps.getActiveCellTypeName(), year:currYear});
		var len = arr.length;
		for(var i = 0; i < len; i++) {
			$('#' + (currYear - 4 + i) + 'Map').append(arr[i]);
		}
		
		arr.length = 0;
		
		$(_dvHeatMapCapture + ' img')
		.off('click')
		.on('click', function() {
			var $td = $(this).parent();
			var captureYear = $td.data('captureYear');
			
			dom.showHeatMapCaptureImagePop({width:1000}, {title:captureYear, src:$(this).prop('src')});
			
		});
		
		dom.openModal('', {width: 1000}, null);
	}
	
	dom.showNoticeList = function() {
		_appendModalPopup('noticeListForm');
		hotplace.notice.showPage();
		
		dom.openModal('', {width: 1000}, function() {
			hotplace.notice.clear();
		});
	}
	
	dom.showSite = function() {
		_appendModalPopup('introSiteForm');
		dom.openModal('', {width: 1000});
	}
	
	dom.showSujiTojiUseLimitHistory = function() {
		_appendModalPopup('spotSujibunseogTojiHistoryForm', _$momPopup);
		dom.openModalOnModal('', {width: 1000});
	}
	
	dom.showTutorial = function() {
		_appendModalPopup('tutorialForm');
		dom.openModal('', {width: 1000}, null, function() {
			//$("#s1").attr("src", 'http://hotplace.ddns.net/resources/video/use1.mp4');
			//동영상을 다시 load 함
			//$("#tutoV").load();
			//load한 동영상을 재생
			//document.getElementById("tutoV").play();
			$('#tuto1').attr('src', 'https://www.youtube.com/embed/qZAkIpkPbmc?modestbranding=1&rel=0&showinfo=0');
			$('#tuto2').attr('src', 'https://www.youtube.com/embed/qZAkIpkPbmc');
			$('#tuto3').attr('src', 'https://www.youtube.com/embed/qZAkIpkPbmc');
		});
	}
	
	dom.showGyeongmaeDetail = function(fn, param) {
		_appendModalPopup('gyeongmaeDetailForm', null ,param);
		dom.openModal('', null, null, fn);
	}
	
	dom.showGyeongmaeImage = function(modalSize, param) {
		_appendModalPopup('gyeongmaeImageForm', _$imagePopup, param);
		dom.openImageModalOnModal(modalSize);
	}
	
	dom.showHeatMapCaptureImagePop = function(modalSize, param) {
		_appendModalPopup('mapCaptureImageForm', _$imagePopup, param);
		
		dom.openImageModalOnModal(modalSize);
	}
	
	dom.showGongmaeDetail = function(fn, param) {
		_appendModalPopup('gongmaeDetailForm', null ,param);
		dom.openModal('', null, null, fn);
	}
	
	/**
	 * @memberof hotplace.dom
	 * @function showYearRangeDiv
	 * @param {number} mx 보여줄 최근연도
	 * @param {number} mn 보여줄 지난연도
	 * @desc 타임시리얼 bar DIV
	 * {@link http://ghusse.github.io/jQRangeSlider/documentation.html jQRangeSlider} 
	 */
	dom.showYearRangeDiv = function(mx, mn) {
		var max = _timeViewSliderMax, min = _timeViewSliderMin, i = 0, step = 1;
		var range = max - min;
		var capturedImgs = [];
		/*
		 * Auto
		 * */
		var runFn = hotplace.maps.showCellLayer;
		var callback = function() {
			i++;
			if(i<=range) {
				try {
					//ms 브라우저는 캡쳐하지 않는다.
					if(hotplace.browser.msie || hotplace.browser.msedge) {
						setTimeout(function() {
							_$yearRange.rangeSlider('scrollRight', step);
							
							if(i == range) {
								i = 0;
								_triggerAutoYearRangeDiv();
								dom.removeBodyAllMask();
								hotplace.dom.showAlertMsg(null, '크롬브라우저를 사용하시면 캡쳐된 이미지를 제공합니다.', {width:550});
							}
						}, 2000);
					}
					else {
						dom.captureImage($('body'), capturedImgs, function() {
							_$yearRange.rangeSlider('scrollRight', step);
							if(i == range) {
								i = 0;
								_triggerAutoYearRangeDiv();
								dom.showHeatmapCapturedImages(capturedImgs);
								dom.removeBodyAllMask();
							}
						});
					}
				}
				catch(e) {
					console.log(e);
					dom.initYearRangeDiv();
					hotplace.processAjaxError(hotplace.error.HEATMAP_CAPTURE);
					dom.removeBodyAllMask();
					throw e;
				}
			}
		};
		
		_$yearRange.rangeSlider({
			arrows: false,
			enabled: false,
			bounds: {min: min, max: max},
			defaultValues: {min: max-1, max: max},
			step: 1,
			range:{min:1, max:1},
			formatter: function(val) {
				if(val == max) {
					val = '오늘'; 
				}
				else {
					val = (max - val) + '년전';
				}
				return val;
			}
		});
		
		/********************************************************
		* valuesChange 이벤트를 사용하면 안됨
		* 중간에 오류가 났을경우 dom.initYearRangeDiv 메소드를 호출하는데
		* range 초기값을 다시 설정할때 valuesChange는 호출이 되지만 
		* userValuesChanged 이벤트는 호출되지 않는다.
		*********************************************************/
		_$yearRange.on('userValuesChanged', function(e, data){
			//auto mode에서 slider가 처음위치에 있었을때 trigger로 들어왔을 경우
			_showCellYear = (data == undefined) ? _timeViewSliderMin + (_$yearRange.rangeSlider('option', 'step')) : data.values.max;
			
			dom.addBodyAllMask();
			setTimeout(function() {
				if(_yearRangeMode == 'auto') {
					runFn(callback);
				}
				else {
					runFn();
					dom.removeBodyAllMask();
				}
			}, 100);
		});
	}
	
	/**
	 * @memberof hotplace.dom
	 * @function showAutoYearRangeDiv
	 * @param {number} mx 보여줄 최근연도
	 * @param {number} mn 보여줄 지난연도
	 * @desc 타임시리얼 자동재생 button DIV
	 */
	dom.showAutoYearRangeDiv = function() {
		_$btnAutoYear.on('change', function(e, p) {
			if(p) {
				var b = $(this).prop('checked');
				$(this).prop('checked', !b);
			}
			
			if($(this).prop('checked')) {
				_yearRangeMode = 'auto';
				
				//현재 slider의 위치가 처음부분에 있으면  userValuesChanged 이벤트가 발생하지 않는다. 
				if(_$yearRange.rangeSlider('min') == _timeViewSliderMin) {
					//이벤트 강제발생
					_$yearRange.trigger('userValuesChanged');
				}
				else {
					_$yearRange.rangeSlider('scrollLeft', 100);
				}
			}
			else {
				_yearRangeMode = 'manual';
			}
		});
	}
	
	function _triggerAutoYearRangeDiv() {
		_$btnAutoYear.trigger('change', ['refresh']);
	}
	
	dom.initYearRangeDiv = function() {
		if(_yearRangeMode == 'auto') {
			_triggerAutoYearRangeDiv();
		}
		
		dom.initYearRangeValue();
	}
	
	dom.initYearRangeValue = function() {
		_showCellYear = $('body').data('year');
		_$yearRange.rangeSlider('values', _showCellYear - 1, _showCellYear);
	}
	
	/**
	 * @memberof hotplace.dom
	 * @function getShowCellYear
	 * @returns {number} 보이는 cell의 데이터 연도
	 * @desc 보이는 cell의 데이터 연도를 가져온다
	 */
	dom.getShowCellYear = function() {
		return _showCellYear;
	}
	
	/**
	 * @memberof hotplace.dom
	 * @function hideYearRangeDiv
	 * @desc 타임시리얼 bar DIV 를 감춘다.
	 */
	dom.hideYearRangeDiv = function() {
		_$yearRange.hide();
		_$yearRange.rangeSlider('destroy');
	}
	
	/**
	 * @memberof hotplace.dom
	 * @function addBodyAllMask
	 * @desc body위에 사용자의 action을 차단할 목적으로 mask를 씌운다
	 */
	dom.addBodyAllMask = function() {
		$('#dimScreen').show();
	}
	
	/**
	 * @memberof hotplace.dom
	 * @function removeBodyAllMask
	 * @desc body위에 사용자의 action을 차단할 목적의 mask를 제거한다
	 */
	dom.removeBodyAllMask = function() {
		$('#dimScreen').hide();
	}
	
	/**
	 * @memberof hotplace.dom
	 * @function loadScript
	 * @param {string} url - script 경로
	 * @param {function} loadFn - script onload handler
	 * @desc 스크립트를 동적으로 로딩한다
	 */
	dom.loadScript = function(url, loadFn) {
		var script = document.createElement('script');
		
		if(loadFn) 	script.onload = loadFn;
		script.src = hotplace.getContextUrl() + url;
		document.body.appendChild(script);
	}
	
	dom.showAlertMsg = function(fn, msg, modalSize, btnText) {
		_appendModalPopup('alertForm', _$alrtPopup);
		_$alrtPopup.find('p.alertText').html(msg || '');
		
		if(btnText) $(btnAlrt).text(btnText);
		dom.openAlrtModal(modalSize, fn);
	}
	
	function _appendModalPopup(formName, $element, param) {
		var tForm = dom.getTemplate(formName);
		($element || _$modalPopup).html(tForm(param));
	}
	
	dom.showLoginForm = function(fn) {
		_appendModalPopup('loginForm');
		dom.openModal('', {width: '410'}, fn);
	}
	
	dom.showSpotSujibunseogForm = function(fn, param) {
		_appendModalPopup('spotSujibunseogForm', null, param);
		dom.openModal('', null, null, fn);
	}
	
	dom.showSpotGwansimRegForm = function(fn) {
		_appendModalPopup('spotGwansimRegForm');
		dom.openModal('', {width: '500'}, fn);
	}
	
	dom.showSpotMaemulRegForm = function(fn, param) {
		_appendModalPopup('spotMaemulRegForm', null, param);
		dom.openModal('', {width: '500'}, fn);
	}
	
	dom.showSpotConsultingForm = function(closeFn, openFn, param) {
		_appendModalPopup('spotConsultingForm', null, param);
		dom.openModal('', {width: '500'}, closeFn, openFn);
	}
	
	dom.showSpotTojiUseLimitForm = function(closeFn, openFn, param) {
		_appendModalPopup('spotTojiUseLimitForm', null, param);
		dom.openModal('', {width: '1000'}, closeFn, openFn);
	}
	
	dom.showMulgeonPanoramaForm = function(closeFn, openFn, param) {
		_appendModalPopup('mulgeonPanoForm', null, {address:param.address});
		
		hotplace.panomaps.createPanomaps(hotplace.panomaps.MULGEON_MODE, _dvCommonPano.substring(1), param.x, param.y, true, function(location, msg, pano) {
			pano.zoomIn();
			$(_dvCommonPanoInfo).html(msg);
		});
		
		dom.openModal('', {width:'500'});
	}
	
	dom.showLogoutForm = function(fn) {
		hotplace.dom.showAlertMsg(function() {
			dom.logout(fn);
		},'로그아웃 하시겠습니까?', {width: '410'}, '확인');
	}
	
	dom.toggleLogin = function() {
		if(_$gnbLogin.is(':visible')) {
			_$gnbLogin.hide();
			_$gnbLogout.show();
		}
		else {
			_$gnbLogout.hide();
			_$gnbLogin.show();
		}
	}
	
	dom.showJoinForm = function(modalSize, fn) {
		if(_templates['joinForm'] == undefined) {
			hotplace.ajax({
				async: false,
				url: 'handlebar/join',
				dataType : 'html',
				method : 'GET',
				activeMask : false,
				success : function(data, textStatus, jqXHR) {
					_templates['joinForm'] = Handlebars.compile(data);
				},
				error: function() {
					throw new Error('html template error')
				}
			});
		}
		
		_appendModalPopup('joinForm');
		
		//이메일 && 연락처 dom 생성
		$('#joinUserPhoneF').html(hotplace.util.getPhoneOptions());
		$('#joinUserEmail2').html(hotplace.util.getEmailOptions());
		dom.openModal('', modalSize, fn);
	}
		
	dom.logout = function(fn) {
		hotplace.ajax({
			url: 'logout',
			method: 'POST',
			dataType: 'text',
			success: function(data, textStatus, jqXHR) {
				console.log(data);
				var jo = $.parseJSON(data);
				if(jo.success) {
					if(fn) fn();
				}
			},
			error: function() {
				
			}
		});
	}
	
	dom.closeModal = function() {
		_$modalPopup.modal('hide');
	}
	
	
	
		
	function _setModalMaxHeight($element) {
		$content = $element.find('.modal-content');
		var borderWidth   = $content.outerHeight() - $content.innerHeight();
	    var dialogMargin  = $(window).width() < 768 ? 20 : 60;
	    var contentHeight = $(window).height() - (dialogMargin + borderWidth);
	    var headerHeight  = $element.find('.modal-header').outerHeight() || 0;
	    var footerHeight  = $element.find('.modal-footer').outerHeight() || 0;
	    var maxHeight     = contentHeight - (headerHeight + footerHeight);

		$content.css({'overflow':'hidden'});
	  
		$element
		.find('.modal-body')
		.css({'max-height': maxHeight, 'overflow-y': 'auto'});
	}
	
	function _setModalMarginTop($element) {
		var $dialog      = $element.find('.modal-dialog');
		var dialogHeight  = $dialog.height();
		
		$dialog.css({
			'margin-top' : -dialogHeight/2
		});
	}

	function _initModalSize($modal) {
		_setModalMaxHeight($modal);
		_setModalMarginTop($modal);
	}
	
	dom.initModalPosition = _initModalSize;
	
	/*************************************************************
	 * 모달창 열린후 발생하는 이벤트 핸들러
	 ************************************************************/
	_$modalPopup.on('shown.bs.modal', function(e) {
		_initModalSize($(this));
		$('.modal-backdrop').remove();
		_modalOpenAfterFn();
	});
	
	/*************************************************************
	 * 이미지 모달창 열린후 발생하는 이벤트 핸들러
	 ************************************************************/
	_$imagePopup.on('shown.bs.modal', function(e) {
		_initModalSize($(this));
		$('.modal-backdrop').remove();
	});
	
	/*************************************************************
	 * 모달의 모달창 열린후 발생하는 이벤트 핸들러
	 ************************************************************/
	_$momPopup.on('shown.bs.modal', function(e) {
		_initModalSize($(this));
		$('.modal-backdrop').remove();
	});
	
	/*************************************************************
	 * 모달창 닫힌후 발생하는 이벤트 핸들러
	 ************************************************************/
	_$modalPopup.on('hidden.bs.modal', function(e) {
		_modalCloseAfterFn();
	});
	
	/*************************************************************
	 * alert창 열린후 발생하는 이벤트 핸들러
	 ************************************************************/
	_$alrtPopup.on('shown.bs.modal', function(e) {
		_initModalSize($(this));
		$('.modal-backdrop').remove();
	});
	
	/*************************************************************
	 * alert창 닫힌후 발생하는 이벤트 핸들러
	 ************************************************************/
	_$alrtPopup.on('hidden.bs.modal', function(e) {
		_alertCloseAfterFn();
	});
	

	
	//로그인 메시지에서 로그인 화면으로 전환
	$(document).on('click', '#btnDirectLogin', function() {
		//이전에 설정된 동작은 마무리한다.
		_modalCloseAfterFn();
		
		_modalCloseAfterFn = function() {
			$('#rmenu_user').trigger('click', {
				callbackOn: dom.rightMenuUserCallback
			});
		};
		
		dom.closeModal();
	});

	dom.showLnbContent = function($element) {
		var $parent   = $element.parent('li');		
		var data      = $element.data('name');
		var isNewDom  = $element.data('new');
		//메인화면 로드시 미리 같이 로드되어야 하는지 여부
		var isFirstLoad = $element.data('firstLoad');
		
		
		_bindLnbMenu(data, isNewDom);
		
		var showAfterFn = hotplace.menu.initMenuDom(data);
		
		if(isFirstLoad) {
			$element.data('firstLoad', false);
			return;
		}
		
		$parent.addClass('active');
		$parent.siblings('li').removeClass('active');

		$('#lnbCont > .lnbContWrap').hide();
		$('#lnbCont > #' + data).show();
		
		//map area position
		var contWidth  = $('#lnbCont > #' + data).outerWidth();
		var lnbWidth   = $('#lnbArea').outerWidth();
		var totalWidth = lnbWidth + contWidth

		$('.mapArea').animate({
			'left': totalWidth - 1
		},100);

		var minWidth = 964 - contWidth
		$('.mapArea').css({'min-width':minWidth});
		
		if(showAfterFn) showAfterFn();
	}
	
	// 좌메뉴 컨텐츠 하단 footerEtcText 있을시 해당 bodyArea의 bottom재설정
	dom.setLnbContentBodyArea = function() {
		if ($('.footerEtcText').length != 0){
			$('.footerEtcText').each(function() {
				var thisBody = $(this).parents('.lnbContWrap').find('.bodyArea');
				var footerH = $(this).parents('.lnbContWrap').find('.footArea').outerHeight();;
				var thisH = $(this).outerHeight();

				thisBody.css({'bottom': thisH + footerH});
			});
		}
	}
	
	function _bindLnbMenu(menuName, isNew) {
		var dir = 'menu/';
		var menus = hotplace.config.menus;
		var param = {
			menuName: menuName	
		}
		//기존폼(dom에서 detach을 안하고 재사용)
		if(!isNew) {
			//로딩된 폼이 있는지 검사
			if(_hasTemplates(dir + menuName)) return;
		}
		
		var tForm = dom.getTemplate(dir + menuName);
		
		switch(menuName) {
		case menus.TOOJA_SEARCH:
		case menus.GYEONGGONG_SEARCH:
			param.codes = hotplace.config.codes;
			break;
		}
		
		$('#' + menuName).html(tForm(param));
	}
	
	dom.hideLnbContent = function($obj) {
		var $menu = $obj.parent().parent();
		$menu.hide();
		$('#memuList > li').removeClass('active');

		
		var lnbWidth   = $('#lnbArea').outerWidth();
		$('.mapArea').animate({
			'left': lnbWidth 
		},100);
		$('.mapArea').css({'min-width':'964px'});
	}
	
	/**
	 * @memberof hotplace.dom
	 * @function activeButton
	 * @param {string} onOff - 버튼 active or inactive 여부('on'|'off')
	 * @param {object} $btn - 버튼객체
	 * @desc 버튼
	 */
	dom.activeButton = function(onOff, $btn) {
		if(onOff == 'on') {
			$btn.data('switch', 'off');
			$btn.removeClass('active');
		}
		else {
			$btn.data('switch', 'on');
			$btn.addClass('active');
		}
	}
	
	dom.listExpandCollapse = function(parentId) {
		$(parentId + ' button[data-role="slideShow"], a[data-role="slideShow"]')
		.off('click')
		.on('click', function() {
			var $this = $(this);
			var $target = $($this.attr('href'));
			
			if($this.hasClass('stateOn')){
				$this.removeClass('stateOn');
				$target.slideUp(100);
			} 
			else {
				$this.addClass('stateOn');
				$target.slideDown(100);

				_rangeSliderResize($target); // rangeSlider Resize 스크립트
			}
		});
	}
	
	
	dom.getSliderValues = function(gName, targetId) {
		if(_sliderGrp[gName]) {
			var len = _sliderGrp[gName].length;
			if(len>0) {
				for(var i=0; i<len; i++) {
					if(_sliderGrp[gName][i].attr('id') == targetId) {
						return _sliderGrp[gName][i].rangeSlider("values");
					}
				}
			}
		}
		
		throw new Error('slider가 존재하지 않습니다.');
	}
	
	dom.initSlider = function(gName, isNew, obj) {
		if(!isNew && _sliderGrp[gName]) return;
		_sliderGrp[gName] = [];
		var len = obj.length;
		
		for(var i=0; i<len; i++) {
			_sliderGrp[gName].push($(obj[i].targetId));
			
			var t = $(obj[i].targetId);
			
			_sliderGrp[gName][_sliderGrp[gName].length - 1].rangeSlider({
				  bounds: obj[i].bounds || {min: -10, max: -1},
				  step: 1,
				  defaultValues: obj[i].defaultValues || {min:-4, max:-1},
				  formatter: function(val) {
					  //console.log(val)
					  return Math.abs(val) + '등급';
				  }
			});
			
			_sliderGrp[gName][_sliderGrp[gName].length - 1].bind('valuesChanged', function(e, data) {
				var id = e.currentTarget.id;
				var values = data.values;
				
				/*_hpGradeParam[id].min = Math.abs(values.max);
				_hpGradeParam[id].max = Math.abs(values.min);*/
			});
		}
	}
	
	dom.resizeSliderGrp = function(gName) {
		if(_sliderGrp[gName]) {
			
			for(var i=_sliderGrp[gName].length-1; i>=0; i--) {
				_sliderGrp[gName][i].rangeSlider('resize');
			}
		}
	}
	
	dom.hideContextMenu = function() {
		$(_dvContextMenu).hide();
	}
	
	dom.createTabulatorNoEdit = function(cell) {
		 var data = cell.getRow().getData();
		 return data.pseudo !== undefined; 
	}
	
	dom.createTabulator = function(tableId, param, tbData) {
		var $table = $(tableId);
		param = param || {};
		
		$table.tabulator($.extend({
		    height:'100%',//826, // set height of table
		    fitColumns:true, //fit columns to width of table (optional)
		    autoResize:true,
		    rowClick:function(e, row){ //trigger an alert message when the row is clicked
		       var data = row.getData();
		       hotplace.dom.showAlertMsg();
		       
		       /*var formName, icon = '', callbak = null;
		       
		       if(data.gubun == 'G') {
		    	   formName = 'gyeongmaeForm';
		    	   icon = hotplace.maps.MarkerTypes.GYEONGMAE;
		    	   callback = function(map, marker, win) {
			    	   marker._data = {info:{unu:data.unu}};
			    	   hotplace.gyeongmae.markerClick(map, marker, win);
			       }
		       }
		       else {
		    	   formName = 'gongmaeForm';
		    	   icon = hotplace.maps.MarkerTypes.GONGMAE;
		       }
		       
		       _moveMulgeon(data.lng, data.lat, data.address, formName, callback, icon);
		       */
		    },
		}, param));
		
		$table.tabulator('setData', tbData);
	}
	
	dom.getTabulatorSelectFilter = function(arr) {
		return function(cell, onRendered, success, cancel, editorParams) {
			
			var len = arr.length;
			
			var htmlStr = '';
				
			for(var i=0; i<len; i++) {
				htmlStr += '<option value="' + arr[i].value + '">' + arr[i].name + '</option>';
				//console.log(htmlStr);
			}
				
			var editor = $('<select><option value=""></option>' + htmlStr + '</select>');
			editor.css({
				'padding':'3px',
		        'width':'100%',
		        'box-sizing':'border-box',
		    });
			 
			//Set value of editor to the current value of the cell
			editor.val(cell.getValue());
			  
			//set focus on the select box when the editor is selected (timeout allows for editor to be added to DOM)
			onRendered(function(){
				editor.focus();
				editor.css('height','100%');
			});
			 
			//when the value has been set, trigger the cell to update
			editor.on('change blur', function(e){
				success(editor.val());
			});
			
			editor.on('focus', function(e) {
//				console.log(e);
//				e.preventDefault();
//				$(e.currentTarget).blur();
			});
			
	
			//return the editor element
			return editor;
		}
	};
	
	function _rangeSliderResize($target) {
		var length = $target.find('.rangeSlider').length;
	   
		if (!length == '0')	{
			//alert(length + tId);
			$target.find('.rangeSlider').each(function(index) {
				var id = $(this).attr('id');
				$('#' + id).rangeSlider().resize();
			});
		}
	}
	
	dom.closeCoordWindow = function() {
		if(_infoWinCoordAddr) _infoWinCoordAddr.close();
	}
	

	dom.searchCoordToAddress = function(coord, tm128) {
		/*if(!_markerCoord) {
			_markerCoord = new naver.maps.Marker({
			    position: coord,
			    map: hotplace.maps.getMap()
			});
			
			var content = '<img src="'+ hotplace.getContextUrl() +'resources/img/marker/' + options.icon + '" alt="" ' +
	 			  		  'style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none; ' +
	 			  		  '-webkit-user-select: none; position: absolute; width: ' + x + 'px; height: ' + y + 'px; left: 0px; top: 0px;">';
		}*/
		
		if(!_infoWinCoordAddr) {
			_infoWinCoordAddr = new naver.maps.InfoWindow({
				backgroundColor: 'transparent',
				borderColor: '#666',
				borderWidth: 0,
				anchorSize: new naver.maps.Size(0, 0),
				anchorSkew: false,  
				pixelOffset: new naver.maps.Point(0, -12)
			})
		}
		
		naver.maps.Service.reverseGeocode({
	        location: tm128,
	        coordType: naver.maps.Service.CoordType.TM128
	    }, function(status, response) {
	        if (status === naver.maps.Service.Status.ERROR) {
	            return hotplace.processAjaxError(hotplace.error.COORD);
	        }

	        var items = response.result.items,
	            htmlAddresses = [];

	        for (var i=0, ii=items.length, item, addrType; i<ii; i++) {
	            item = items[i];
	            addrType = item.isRoadAddress ? '[도로명 주소]' : '[지번 주소]';

	            if(item.isRoadAddress) continue;
	            
	            htmlAddresses.push(/*(i+1) +'. '+ */addrType +' '+ item.address);
	        }

	        _infoWinCoordAddr.setContent([
	            '<div class="mapInnerBox onlyText">',
	            '   <div class="mibBody">',
	            		htmlAddresses[0],
	            ' 		<button class="closeBtn" onclick="hotplace.dom.closeCoordWindow()"><span class="hidden">닫기</span></button>',
	            '   </div>',
	            '</div>'
	            ].join(''));

	        _infoWinCoordAddr.open(hotplace.maps.getMap(), coord);
	    });
	}
	
	dom.adjustMapZindex = function(z) {
		_$mapArea.css('z-index', z || '0');
	}
	
	dom.initTooltip = function(containerId) {
		$(containerId + ' .TOOLTIP').tooltip({
			html:true
		});
	}
	
	dom.changeTooltipText = function($el, tooltipStr) {
		$el
		.tooltip('hide')
	    .attr('data-original-title', tooltipStr);
	}
	
	/*************************************************************
	 * 브라우저창 사이즈가 변할때 발생하는 이벤트 핸들러
	 * hotplace.streetview.resize : 거리뷰의 파노라마 사이즈를 변경함
	 ************************************************************/
	$(window).resize(function() {
		if ($('.modal.in').length != 0) {
			_initModalSize($('.modal.in'));
		}
		
		hotplace.streetview.resize();
	});
	
	$(window).contextmenu(function(e) {
		return false;
	});
	
}(
	hotplace.dom = hotplace.dom || {},
	jQuery
));