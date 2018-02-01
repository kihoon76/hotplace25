/**
 * @namespace hotplace.dom
 * */
(function(dom, $) {
	
	var _loadEl,
		_loadTxt = '',//'로딩 중입니다';
		_loadEndCount = 0,
		_yearRangeMode = 'manual', //타임뷰 모드  manual(수동) auto(자동)
		_$yearRange = $('#dvYearRange'),
		_$btnAutoYear = $('#btnAutoYear'),
		_$modalPopup = $('#modalPopup'),
		_$momPopup = $('#momPopup'), //모달 위 모달
		_$alrtPopup = $('#alrtPopup');
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
	 * @desc 맵 메인화면의 메뉴버튼을 모아놓은 DIV
	 */
	var _btnMapDiv = $('#mapButtons');
	
	var _lisMapUl = $('#menu > ul');
	
	var _rightMenu = $('#rightMenu');
	
	/**
	 * @private
	 * @type {object}
	 * @desc javascript template engine handlebar를 통해 서버에서 가져온 html을 저장
	 */
	var _templates = {};
	
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
	var _showCellYear = 2017;
	
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
	 * @type {function}
	 * @desc 메인화면 버튼메뉴 id값 설정 
	 */
	var _menuBtnIdCfg = function() {
		return {
			'USER_LOGIN' : /*'btnUserLogin'*/'li_menu_login',
			'HEAT_MAP': 'btnLayerView',
			'CELL': 'li_menu_cell'
		};
	};
	
	var _layer = {};
	
	/**
	 * @memberof hotplace.dom
	 * @function getMenuBtn
	 * @returns {object} 
	 * @desc 메인화면 메뉴버튼 아이디값
	 */
	dom.getMenuBtn = _menuBtnIdCfg;
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
	 * @function openLayer
	 * @param {string} targetId 해당레이어를 나오게 할 버튼 id값
	 * @param {object} options 맵 벤더이벤트객체
	 * @param {number} options.top 레이어의 top위치
	 * @desc 맵의 메뉴버튼을 눌렀을때 보여질 레이어를 생성함
	 *       생성후 전역변수 _infoWindowForCell에 저장
	 */
	dom.openLayer = function(targetId, options) {
		
		if(!_layer[targetId]) _layer[targetId] = $('#'+targetId);
		
		//var $close = $layer.find('.close');
		var width = _layer[targetId].outerWidth();
		var ypos = options.top;
		var xpos = options.left;
		var marginLeft = 0;
		
		if(xpos==undefined){
			xpos = '50%';
			marginLeft = -(width/2);
		}
		
		if(!_layer[targetId].is(':visible')){
			_layer[targetId].css({'top':ypos+'px','left':xpos,'margin-left':marginLeft})
		    	  .show();
		}
		
		/*$close.bind('click',function(){
			if($layer.is(':visible')){
				$layer.hide();
			}
			
			return false;
		});*/
	}
	
	/**
	 * @memberof hotplace.dom
	 * @function closeLayer
	 * @param {string} targetId 해당레이어를 사라지게 할 버튼 id값
	 * @desc 맵의 메뉴버튼을 눌렀을때 보이고 있는 레이어를 감춤
	 */
	dom.closeLayer = function(targetId) {
		if(_layer[targetId].is(':visible')){
			_layer[targetId].hide();
		}
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
	dom.getTemplate = function(name) {
		if(_templates[name] === undefined) {
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
		
		return _templates[name];
	}
	
	/**
	 * @memberof hotplace.dom
	 * @function insertFormInmodal
	 * @param {string} name 서버에서 가져올 handlebars 파일명, 태그(<)로 시작하면 jquery로 dom에 붙인다 
	 * @returns {object} - Handlebars.compile() 결과값
	 * @desc 모달창 body부분에 html을 삽입한다
	 */
	dom.insertFormInmodal = function(name) {
		
		var elContent = $('#dvModalContent');
		if(($.trim(name)).indexOf('<') == 0) {/*html 직접입력*/
			elContent.html(name);
		}
		else {
			var tForm = dom.getTemplate(name);
			elContent.html(tForm());
		}
	}
	
	
	
	/**
	 * @memberof hotplace.dom
	 * @function getSelectOptions
	 * @param {Array.<string[]>} data htnl select option value,text 
	 * @param {string} title 서버에서 가져올 handlebars 파일명, 태그(<)로 시작하면 jquery로 dom에 붙인다 
	 * @returns {string} - html select option string
	 * @desc select box의 option string을 구한다
	 */
	dom.getSelectOptions = function(data, title) {
		var len = data.length;
		var html = '<option value="">- ' + title + '  -</option>';
		for(var i=0; i < len; i++) {
			html += '<option value="' + data[i][0] + '">' + data[i][1] + '</option>'; 
		}
		
		return html;
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
	
	dom.captureToCanvas = function() {
	    var nodesToRecover = [];
	    var nodesToRemove = [];
	    var targetElem = $('#map');
	    //var els =  document.getElementsByTagName('svg')[0]
		//var elsLen = els.length;
	    var svgElem = targetElem.find('svg\\:svg');

	    svgElem.each(function(index, node) {
	        var parentNode = node.parentNode;
	        var svg = parentNode.innerHTML;

	        var canvas = document.createElement('canvas');

	        canvg(canvas, svg);

	        nodesToRecover.push({
	            parent: parentNode,
	            child: node
	        });
	        parentNode.removeChild(node);

	        nodesToRemove.push({
	            parent: parentNode,
	            child: canvas
	        });

	        parentNode.appendChild(canvas);
	    });
	    
	    hotplace.ajax({
	    	url: 'sample/naverForm',
	    	method: 'GET',
	    	dataType: 'html',
	    	success: function(data) {
	    		console.log(data);
	    		var d = $('#test2');
	    		d.html(data)
	    		console.log(d);
	    		html2canvas(d, {
	    			allowTaint: true,
	    			taintTest: false,
	    			useCORS: true,
	    			profile: true,
	    			onrendered: function(canvas) {
	    				//$('body').append(canvas);
	    				console.log(canvas)
	    				var img = canvas.toDataURL('image/png');
	    				d.html('');
	    				$('#ii').attr('src', img)
	    			}
	    		});
	    	}
	    });
	    
		/*html2canvas(targetElem, {
			allowTaint: true,
			taintTest: false,
			useCORS: true,
			profile: true,
			onrendered: function(canvas) {
				$('body').append(canvas);
			}
		});*/
		
	}
	
	
	
	/**
	 * @memberof hotplace.dom
	 * @function viewProfit
	 * @param {string} addr 주소
	 * @desc 수지분석 폼 보기
	 * {@link https://github.com/simeydotme/jQuery-ui-Slider-Pips jQuery-ui-slider-pips} 
	 */
	dom.viewProfit = function(params) {
		var tForm = dom.getTemplate('profitForm');
		
		console.log(params)
		$('#dvModalContent').html(tForm(params));
		
		//txt tooltip 
		hotplace.dom.initTooltip('txtProfitTooltip',{trigger: 'hover'});
		hotplace.sujibunseog.init();
		hotplace.calc.profit.initCalc(params);
		
		dom.openModal('수지 분석(소재지: ' + params.address + ')', 'fullsize', function() {
			try {
				//닫힐때 토지 이용규제 tooltip이 열려있으면 tooltip을 닫는다.
				dom.closeTooltip('.profitTooltip');
			}
			catch(e) {} //툴팁을 한번도 open 하지 않은 상태에서 close하면 error 발생
		});
	}
	
	dom.viewHpGrade = function(params) {
		var tForm = dom.getTemplate('cate_fn/hpgradeForm');
		
		console.log(params)
		$('#dvModalContent').html(tForm(params));
		
		dom.openModal('HP등급보기 (소재지: ' + params.address + ')', 'fullsize', function() {
			
		}, function() {
			hotplace.chart.drawLineChart('dvHpGradeDefault', [
			    //["2000-06-05",116],["2000-06-06",129],["2000-06-07",135],["2000-06-08",86],["2000-06-09",73],["2000-06-10",85],["2000-06-11",73],["2000-06-12",68],["2000-06-13",92],["2000-06-14",130],["2000-06-15",245],["2000-06-16",139],["2000-06-17",115],["2000-06-18",111],["2000-06-19",309],["2000-06-20",206],["2000-06-21",137],["2000-06-22",128],["2000-06-23",85],["2000-06-24",94],["2000-06-25",71],["2000-06-26",106],["2000-06-27",84],["2000-06-28",93],["2000-06-29",85],["2000-06-30",73],["2000-07-01",83],["2000-07-02",125],["2000-07-03",107],["2000-07-04",82],["2000-07-05",44],["2000-07-06",72],["2000-07-07",106],["2000-07-08",107],["2000-07-09",66],["2000-07-10",91],["2000-07-11",92],["2000-07-12",113],["2000-07-13",107],["2000-07-14",131],["2000-07-15",111],["2000-07-16",64],["2000-07-17",69],["2000-07-18",88],["2000-07-19",77],["2000-07-20",83],["2000-07-21",111],["2000-07-22",57],["2000-07-23",55],["2000-07-24",60]
			    ["5년전",2],["4년전",3],["3년전",6],["2년전",8],["1년전",9],["오늘",10]
			]);
		});
		
	}
	
	dom.viewLimitLandUse = function(params) {
		var tForm = dom.getTemplate('cate_fn/lluForm');
		
		console.log(params)
		$('#dvCenterModalContent').html(tForm(params));
		
		dom.openCenterModal('토지이용규제현황보기 (소재지: ' + params.address + ')', {width: '1000px', height: '800px'}, function() {
			
		});
	}
	
	dom.viewRegGwansim = function(params) {
		var tForm = dom.getTemplate('cate_fn/gwansimForm');
		
		console.log(params)
		$('#dvCenterModalContent').html(tForm(params));
		
		dom.openCenterModal('관심물건등록 (소재지: ' + params.address + ')', {width: '450px', height: '450px'}, function() {
			
		});
		
		hotplace.location.viewGwansim.init();
	}
	
	dom.viewRegMaemul = function(params) {
		var tForm = dom.getTemplate('cate_fn/maemulForm');
		
		console.log(params)
		$('#dvCenterModalContent').html(tForm(params));
		
		dom.openCenterModal('매물등록 (소재지: ' + params.address + ')', {width: '450px', height: '500px'}, function() {
			
		}, function() {
			hotplace.location.viewMaemul.init();
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
	dom.captureImage = function($element, $target, completeFn) {
		domtoimage.toPng($element[0])
	    .then(function(dataUrl) {
	        var img = new Image();
	        var _$ = null;
	        
	        img.src = dataUrl;
	        img.style.width = '100%';
	        img.style.height = '100%';
	        
	        if($.isArray($target)) {
	        	$target.push(img);
	        }
	        else {
	        	$target.append(img);
	        }
	        
	        if(completeFn) completeFn();
	    })
	    .catch(function (error) {
	        throw error;
	    });
	}
	
	
	dom.showHeatmapCapturedImages = function(arr) {
		_appendModalPopup('mapcaptureForm');
		var len = arr.length;
		
		dom.openModal('', {width: 800}, null, function() {
			for(var i = 0; i < len; i++) {
				$('#' + (2014+i) + 'Map').append(arr[i]);
			}
			
			arr.length = 0;
		});
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
		var max = 2017, min = 2011, i = 0, step = 1;
		var range = max - min - 1;
		var capturedImgs = [];
		/*
		 * Auto
		 * */
		var runFn = hotplace.maps.showCellLayer;
		var callback = function() {
			i++;
			if(i<=range) {
				//ms 브라우저는 캡쳐하지 않는다.
				if(hotplace.browser.msie || hotplace.browser.msedge) {
					setTimeout(function() {
						_$yearRange.rangeSlider('scrollRight', step);
					}, 2000);
				}
				else {
					dom.captureImage($('body'), capturedImgs, function() {
						_$yearRange.rangeSlider('scrollRight', step);
					});
				}
			}
			else {
				i = 0;
				_triggerAutoYearRangeDiv();
				if(hotplace.browser.msie || hotplace.browser.msedge) {
					alert('크롬브라우저를 사용하시면 캡쳐된 이미지를 제공합니다.')
				}
				else {
					dom.showHeatmapCapturedImages(capturedImgs);
				}
				
				dom.removeBodyAllMask();
			}
		};
		
		_$yearRange.rangeSlider({
			arrows: false,
			//enabled: false,
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
		
		_$yearRange.on('userValuesChanged', function(e, data){
			_showCellYear = data.values.max;
			
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
				_$yearRange.rangeSlider('scrollLeft', 100);
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
		
		_$yearRange.rangeSlider('values', 2016, 2017);
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
	
	dom.showAlertMsg = function(fn, msg, modalSize) {
		_appendModalPopup('alertForm', _$alrtPopup);
		_$alrtPopup.find('p.alertText').html(msg || '');
		dom.openAlrtModal(modalSize, fn);
	}
	
	function _appendModalPopup(formName, $element) {
		var tForm = dom.getTemplate(formName);
		($element || _$modalPopup).html(tForm());
	}
	
	dom.showNotice = function() {
		var tForm = dom.getTemplate('noticeForm');
		$('#dvCenterModalContent').html(tForm());
		hotplace.notice.showPage();
		dom.openCenterModal('공지사항', {width: '80%', height:'70%'});
	}
	
	dom.showLoginForm = function(gubun, fn) {
		var tForm = ''; //(gubun == 'IN') ? dom.getTemplate('loginForm') : dom.getTemplate('logoutForm');
		
		if(gubun == 'IN') {
			_appendModalPopup('loginForm');
		}
		else {
			_appendModalPopup('logoutForm');
		}
		
		dom.openModal('', {width: '410'}, fn);
	}
	
	dom.showJoinForm = function(modalSize, fn) {
		var tForm = '';
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
		/*$('#containerModal').modal('hide');
		$('#centerModal').modal('hide');*/
		_$modalPopup.modal('hide');
	}
	
	dom.uncheckAll = function(dv) {
		//view 변경
		$('#' + dv + ' .checkbox input[type=checkbox]').each(function() {
			$(this).prop('checked', false);
		});
		
		//상태변경
		hotplace.maps.setAllOffMarkers();
	};
	
	dom.hideMinimaps = function() {
		_toggleMinimap('off');
	}
	
	dom.showMinimaps = function() {
		_toggleMinimap('on');
	}
	
	/*dom.initTimeline = function() {
		$('.btnTimeview').click(function(){
			var $this = $(this);
			
			var sw = $this.data('switch');
			
			if(sw == 'off'){
				
				$this.css('backgroundColor','rgb(42, 124, 221)')
				     .css('color','#fff');
				$('#dvTimeview').css('width','360px');
				$this.data('switch', 'on');
				
				$('#dvYearRange').show();
				$('#dvAutoYearRange').show();
				$('#dvYearRange').rangeSlider('resize');
			}
			else{
				$this.css('backgroundColor','#fff')
					 .css('color','#333');
				$('#dvTimeview').css('width','60px');
				$this.data('switch', 'off');
				$('#dvYearRange').hide();
				$('#dvAutoYearRange').hide();
			}
		});
	}*/
	

	
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
	
	/*************************************************************
	 * 모달창 열린후 발생하는 이벤트 핸들러
	 ************************************************************/
	_$modalPopup.on('shown.bs.modal', function(e) {
		_setModalMaxHeight($('#modalPopup'));
		$('.modal-backdrop').remove();
		_modalOpenAfterFn();
	});
	
	/*************************************************************
	 * 모달창 닫힌후 발생하는 이벤트 핸들러
	 ************************************************************/
	_$modalPopup.on('hidden.bs.modal', function(e) {
		_modalCloseAfterFn();
	});
	
	/*************************************************************
	 * alert창 닫힌후 발생하는 이벤트 핸들러
	 ************************************************************/
	_$alrtPopup.on('hidden.bs.modal', function(e) {
		_alertCloseAfterFn();
	});
	
	//user menu tab
	$(document).on('click', '.btn-pref .btn', function() {
		 $('.btn-pref .btn').removeClass('btn-primary').addClass('btn-default');
		 $(this).removeClass('btn-default').addClass('btn-primary');
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

	dom.rightMenuUserCallback = function($this) {
		dom.checkSession(function(hasSession) {
			dom.showLoginForm((hasSession) ? 'OUT' : 'IN', function() {
				$this.trigger('click');
			});
		});
	}
	
	dom.showEventAlarm = function() {
		var tForm = dom.getTemplate('alarmForm');
		$('#dvCenterModalContent').html(tForm({path: hotplace.getContextUrl()}));
		
		dom.openCenterModal('', {width: '580px', height: '750px'});
	}
	
	dom.showContactUs = function(closeFn) {
		var tForm = dom.getTemplate('contactusForm');
		$('#dvCenterModalContent').html(tForm({path: hotplace.getContextUrl()}));
		
		dom.openCenterModal('', {width: '800px', height: '800px'}, closeFn);
	}
	
	dom.showLnbContent = function($element) {
		_bindLnbMenu($element.data('name'));
		
		var $parent   = $element.parent('li');		
		var data      = $element.data('name');

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
	}
	
	function _bindLnbMenu(menuName) {
		var tForm = dom.getTemplate(menuName);
		$('#' + menuName).html(tForm());
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
	
	/*************************************************************
	 * 브라우저창 사이즈가 변할때 발생하는 이벤트 핸들러
	 * hotplace.streetview.resize : 거리뷰의 파노라마 사이즈를 변경함
	 ************************************************************/
	$(window).resize(function() {
		/*if ($('.modal.in').length != 0) {
			setModalMaxHeight($('.modal.in'));
		}*/
		hotplace.streetview.resize();
	});
	
}(
	hotplace.dom = hotplace.dom || {},
	jQuery
));