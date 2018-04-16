/**
 * @namespace hotplace.menu
 * */
(function(menu, $) {
	var _menus = hotplace.config.menus;
	var _addrSearchMenu = '#' + _menus.ADDRESS_SEARCH,
		_toojaRegionSearchMenu = '#' + _menus.TOOJA_SEARCH,
		_gyeonggongSearchMenu = '#' + _menus.GYEONGGONG_SEARCH,
		_mulgeonViewMenu = '#' + _menus.MULGEON_VIEW,
		_heatmapViewMenu = '#' + _menus.HEATMAP_VIEW;
		
	var _selectedAddressObj = null;
	
	var _tabulatorColumns = {
		jangmi:[
		    //{title:'연번', field:'num', align:'center', width:70},
		    {title:'pnu', field:'pnu', visible:false},
		    {title:'지목', field:'jimokCode', align:'center', width:70, headerFilter:true, 
		    	editor:_makeTabulatorFilterFromCode(hotplace.config.codes.jimok), editable:hotplace.dom.createTabulatorNoEdit,
		    	formatter:function(cell) {
			    	
			    	return hotplace.util.getJimokStr(cell.getValue());
			    }
		    },
		    {title:'면적', field:'area', align:'center', width:100},
		    {title:'공시지가', field:'gongsi', align:'center', width:100},
		    {title:'주소', field:'detail', align:'left', width:370, headerFilter:'input'},
			//{title:'위도', field:'lat', visible:false},
			//{title:'경도', field:'lng', visible: false}
		],
		tojiuselimitcancel:[
		    {title:'연번', field:'num', align:'center', width:70},
		    {title:'지번주소', field:'jibeon', align:'left', width:170, headerFilter:'input', headerFilterPlaceholder:'주소검색'},
		    {title:'도시계획시설', field:'cityPlan', align:'center', width:100, headerFilter:true,
		    	editor:_makeTabulatorFilterFromCode(hotplace.config.codes.cityPlan)
		    },
			{title:'용도지역', field:'yongdoJiyeog', align:'center', width:80, headerFilter:true,
		    	editor:_makeTabulatorFilterFromCode(hotplace.config.codes.yongdoJiyeog)
			},
			{title:'HP등급', field:'hpGrade', align:'center', width:80},
//			{title:'경공매 진행 여부', field:'gong', align:'center', width:120},
			{title:'보상편입여부', field:'bosangPyeonib', align:'center', width:100, headerFilter:true,
				editor:_makeTabulatorFilterFromCode(hotplace.config.codes.bosangPyeonib)
			},
//			{title:'등기사건', field:'deunggi', align:'center', width:80},
			{title:'위도', field:'lat', visible:false},
			{title:'경도', field:'lng', visible: false}
		],
		devpilji:[
		    {title:'연번', field:'num', align:'center', width:70},
		    {title:'지번주소', field:'jibeon', align:'left', width:170, headerFilter:'input', headerFilterPlaceholder:'주소검색'},
		    {title:'도시계획시설', field:'cityPlan', align:'center', width:100, headerFilter:true,
		    	editor:_makeTabulatorFilterFromCode(hotplace.config.codes.cityPlan)
		    },
			{title:'용도지역', field:'yongdoJiyeog', align:'center', width:80, headerFilter:true,
		    	editor:_makeTabulatorFilterFromCode(hotplace.config.codes.yongdoJiyeog)
			},
			{title:'HP등급', field:'hpGrade', align:'center', width:80},
//		        			{title:'경공매 진행 여부', field:'gong', align:'center', width:120},
			{title:'보상편입여부', field:'bosangPyeonib', align:'center', width:100, headerFilter:true,
				editor:_makeTabulatorFilterFromCode(hotplace.config.codes.bosangPyeonib)
			},
//			{title:'등기사건', field:'deunggi', align:'center', width:80},
			{title:'위도', field:'lat', visible:false},
			{title:'경도', field:'lng', visible: false}
		],
		gyeonggong:[
		    { title:'고유번호', field:'unu', width:100 },
			{ title:'구분', field:'gubun', width:100, headerFilter:true, 
		    	editor:_makeTabulatorFilterFromCode({'gongmae': {name:'공매', value: 'G'}, 'gyeongmae':{name:'경매', value: 'K'}}) 
		    },
			{ title:'물건유형', field:'type', width:150,  headerFilter:true, editor:_makeTabulatorFilterFromCode(hotplace.config.codes.jimok)},
			{ title:'감정평가액', field:'gamjeongga', width:150, formatter:'money', formatterParams: {thousand: ',', decimal: ''}},
			{ title:'주소', field:'address',   headerFilter:'input', headerFilterPlaceholder:'주소검색' },
			{ title:'위도', field:'lat', visible: false },
			{ title:'경도', field:'lng', visible: false },
		],
	}
	
	function _makeTabulatorFilterFromCode(code) {
		if(code) {
			var a = [];
			for(var k in code) {
				a.push(code[k]);
			}
			
			return hotplace.dom.getTabulatorSelectFilter(a);
		}
		
		return null;
	}
	
	function _getMinMax(item) {
		var minmax = [];
		var dataArr = _getCheckboxesData(item);
		var len = dataArr.length;
		for(var i=0; i<len; i++) {
			if(dataArr[i].startsWith('m')) {
				minmax.push({min:0, max:parseInt(dataArr[i].substring(1), 10)});
			}
			else if(dataArr[i].startsWith('M')) {
				minmax.push({min:parseInt(dataArr[i].substring(1), 10), max:0});
			}
			else if(dataArr[i].indexOf('|')) {
				var sp = dataArr[i].split('|');
				minmax.push({min:parseInt(sp[0], 10), max:parseInt(sp[1], 10)});
			}
		}
		
		return minmax;
	}
	
	menu.initMenuDom = function(menuId) {
		var showAfterFn;
		
		switch(menuId) {
		case _menus.ADDRESS_SEARCH: 
			showAfterFn = _initAddressDom();
			break;
		case _menus.TOOJA_SEARCH:
			showAfterFn = _initToojaDom();
			break;
		case _menus.GYEONGGONG_SEARCH:
			showAfterFn = _initGyeonggongDom();
			break;
		case _menus.MULGEON_VIEW:
			showAfterFn = _initMulgeonDom();
			break;
		case _menus.HEATMAP_VIEW:
			showAfterFn = _initHeatmapDom();
			break;
		}
		
		//메뉴창 닫기버튼(bottom)
		$('.MENU_CLOSE')
		.off('click')
		.on('click', function() {
			var menuName = $(this).data('menu');
			_closeMenu(menuName);
		});
		
		return showAfterFn;
	}
	
	function _closeMenu(menuName) {
		hotplace.dom.hideLnbContent($('#' + menuName + ' .close'));
	}
	
	function _convertToYN(arr) {
		if(arr && arr.length > 0) {
			var len = arr.length;
			var result;
			var digit = arr[0].length;
			
			for(var i=0; i<len; i++) {
				if(i == 0) {
					result = parseInt(arr[i], 2);
				}
				else {
					result = result | parseInt(arr[i], 2);
				}
			}
			
			result = result.toString(2);
			var resultLen = result.length;
			
			if(digit > resultLen) {
				for(var p=0, pLen = digit-resultLen; p < pLen; p++) {
					result = '0' + result;
				}
				
				resultLen = result.length;
			}
			
			arr.length = 0;
			for(var r=0; r<resultLen; r++) {
				if(result.substr(r, 1) == '1') {
					arr.push('Y');
				}
				else {
					arr.push('N');
				}
			}
		}
		
		return arr;
	}
	
	function _getToojaParam(cate) {
		var param = null;
		
		switch(cate) {
		case _toojaTab.JangmiCityPlan :
			param = {
				'cityPlan':_getCheckboxesData('itemCityPlanTab01'),
				'cityPlanState':_convertToYN(_getCheckboxesData('itemCityPlanStateTab01')),
				'bosangPyeonib':_convertToYN(_getCheckboxesData('itemBosangPyeonibTab01')),
				'jiyeog':_getCheckboxesData('itemJiyeogTab01'),
				'jimok':_getCheckboxesData('itemJimokTab01'),
				'gongsi':_getCheckboxesData('itemGongsiTab01'),
				'yongdoJiyeog':_getCheckboxesData('itemYongdoJiyeogTab01'),
				'yongdoJigu':_getCheckboxesData('itemYongdoJiguTab01'),
				'yongdoGuyeog':_getCheckboxesData('itemYongdoGuyeogTab01'),
				'etcLawLimit':_getCheckboxesData('itemEtcLawLimitTab01'),
				'etcChamgo':_getCheckboxesData('itemEtcChamgoTab01'),
				'hpGrade':hotplace.dom.getSliderValues(_toojaRegionSearchMenu, _jangmiHpGrade.substring(1)),
				'gyeongsado': _getCheckboxesData('itemGyeongsadoTab01'),
				'jyeobdoState': _getCheckboxesData('itemJyeobdoTab01'),
				'envGrade':hotplace.dom.getSliderValues(_toojaRegionSearchMenu, _jangmiEnvGrade.substring(1)),
				'tojiUseLimitCancel':_getCheckboxesData('itemTojiUseLimitCancelTab01'),
			};
			break;
		case _toojaTab.TojiUseLimitCancel :
			param = {
				'yongdoJiyeog':_getCheckboxesData('itemYongdoJiyeogTab02'),
				'yongdoJigu':_getCheckboxesData('itemYongdoJiguTab02'),
				'yongdoGuyeog':_getCheckboxesData('itemYongdoGuyeogTab02'),
				'etcLawLimit':_getCheckboxesData('itemEtcLawLimitTab02'),
				'cityPlan': _getCheckboxesData('itemCityPlanTab02'),
				'jiyeog':_getCheckboxesData('itemJiyeogTab02'),
				'jimok':_getCheckboxesData('itemJimokTab02'),
				'gongsi':_getCheckboxesData('itemGongsiTab02'),
				'hpGrade':hotplace.dom.getSliderValues(_toojaRegionSearchMenu, _tojiUseLimitHpGrade.substring(1)),
				'gyeongsado': _getCheckboxesData('itemGyeongsadoTab02'),
				'jyeobdoState': _getCheckboxesData('itemJyeobdoTab02'),
				'envGrade':hotplace.dom.getSliderValues(_toojaRegionSearchMenu, _tojiUseLimitEnvGrade.substring(1)),
				'tojiUseLimitCancel':_getCheckboxesData('itemTojiUseLimitCancelTab02'),
			};
			break;
		case _toojaTab.DevPilji :
			param = {
				'hpGrade':hotplace.dom.getSliderValues(_toojaRegionSearchMenu, _devPiljiHpGrade.substring(1)),
				'gyeongsado':_getCheckboxesData('itemGyeongsadoTab03'),
				'jyeobdoState':_getCheckboxesData('itemJyeobdoTab03'),
				'envGrade':hotplace.dom.getSliderValues(_toojaRegionSearchMenu, _devPiljiEnvGrade.substring(1)),
				'tojiUseLimitCancel':_getCheckboxesData('itemTojiUseLimitCancelTab03'),
				'cityPlan':_getCheckboxesData('itemCityPlanTab03'),
				'cityPlanState':_getCheckboxesData('itemCityPlanStateTab03'),
				'bosangPyeonib':_getCheckboxesData('itemBosangPyeonibTab03'),
				'jiyeog':_getCheckboxesData('itemJiyeogTab03'),
				'jimok':_getCheckboxesData('itemJimokTab03'),
				'gongsi':_getCheckboxesData('itemGongsiTab03'),
				'yongdoJiyeog':_getCheckboxesData('itemYongdoJiyeogTab03'),
				'yongdoJigu':_getCheckboxesData('itemYongdoJiguTab03'),
				'yongdoGuyeog':_getCheckboxesData('itemYongdoGuyeogTab03'),
				'etcLawLimit':_getCheckboxesData('itemEtcLawLimitTab03'),
				'etcChamgo':_getCheckboxesData('itemEtcChamgoTab03'),
			};
			break;
		}
		
		return param;
	}
	
	function _getCheckboxesData(tr) {
		var r = [];
		$('#' + tr + ' input[type="checkbox"]:not(:disabled)').each(function() {
			var $this = $(this);
			if($this.is(':checked')) {
				r.push($this.val());
			}
			
		});
		
		return r;
	}
	
	/*****************************************************************************
	 * 주소검색
	 ****************************************************************************/
	var _btnMoveAddressToMap = '#btnMoveAddressToMap',
		_txtAddressSearch = '#txtAddressSearch',
		_btnAddressSearch = '#btnAddressSearch',
		_rdoAddressType = 'addressType',
		_addressType = 'N';
	
	//주소검색 후 라디오버튼 선택
	function _eventHandlerAddrRdo() {
		_selectedAddressObj.pnu = $(this).data('pnu');
		_selectedAddressObj.address = $(this).data('address');
		_selectedAddressObj.lng =  $(this).data('lng');
		_selectedAddressObj.lat =  $(this).data('lat');
	}
	
	//주소검색후 결과가 없는 메시지를 뿌림
	function _emptyAddressSearchResultForm(r) {
		var emptyHtml = [];
		emptyHtml.push('<table class="tableStyle left">');
		emptyHtml.push('<colgroup>');
		emptyHtml.push('	<col style="width:100%;">');
		emptyHtml.push('</colgroup>');
		emptyHtml.push('<tbody>');
		emptyHtml.push('	<tr>');
		emptyHtml.push('		<td class="">' + ((r == 'L') ? '로그인후 사용하세요' : '검색결과가 없습니다.') + '</td>');
		emptyHtml.push('	</tr>');
		emptyHtml.push('</tbody>');
		emptyHtml.push('</table>');
		
		return emptyHtml.join('');
	}
	
	function _bindAddressSearchResult(html) {
		var output = $(_addrSearchMenu + ' .adressSAreaResult');
		output.html(html);
	}
	
	function _ctrlMoveMapInAddressSearch(show) {
		if(show) {
			$(_btnMoveAddressToMap).removeAttr('disabled');
		}
		else {
			$(_btnMoveAddressToMap).prop('disabled', true);
		}
	}
	
	function _initAddressDom() {
		_selectedAddressObj = {};
		_addressType = 'N';
		
		$(document)
		.off('change', '.ADDR_RDO', _eventHandlerAddrRdo)
		.on('change', '.ADDR_RDO', _eventHandlerAddrRdo);
		
		$(_addrSearchMenu + ' input[name="addressType"]')
		.off('change')
		.on('change', function() {
			_addressType = $(this).val();
			console.log(_addressType)
		});
		
		$(_txtAddressSearch)
		.off('keydown')
		.on('keydown', function(e) {
			if (e.which == 13) {
				var txt = e.target.value;
				$(_btnAddressSearch).trigger('click', $.trim(txt)); 
		    }
		});
		
		$(_btnAddressSearch)
		.off('click')
		.on('click', function(e, arg) {
			if(arg == undefined) {
				arg = $.trim($(_txtAddressSearch).val());
			}
			
			if(arg) {
//				var param = {san:'1'};
//				var beonji, beonjiF, beonjiS, beonjiArr, beonjiArrLen;
//				
//				var token = arg.split(' ');
//				var tokenLen = token.length;
//				var t;
//				var arr = [];
//				
//				for(var i=0; i<tokenLen; i++) {
//					t = token[i];
//					if(t == ' ') continue;
//					arr.push(t);
//				}
//				
//				var arrLen = arr.length;
//				for(var k=0; k<arrLen; k++) {
//					if(arr[k] == '산') {
//						param.san = '2';
//					}
//					else if(beonji = arr[k].match(/[0-9]+\-?[0-9]*/g)){
//						if(beonji) {
//							beonjiArr = beonji.toString().split('-');
//							beonjiArrLen = beonjiArr.length;
//							
//							if(beonjiArrLen == 1) {
//								param.beonjiF = $.trim(beonjiArr[0]);
//								param.beonjiS = '0';
//							}
//							else {
//								param.beonjiF = $.trim(beonjiArr[0]);
//								param.beonjiS = $.trim(beonjiArr[1]);
//							}
//						}
//					}
//					else {
//						param.detail = arr[k];
//					}
//				}
				
				hotplace.getPlainTextFromJson('mulgeon/search', JSON.stringify({detail:arg, type:_addressType}), function(data) {
					var dataForm = {
						'addresses': data,
						'rdoId': 'addr'
					}
					
					if(data.length > 1) {
						var result = (hotplace.dom.getTemplate('addrSearchResult'))(dataForm);
						_bindAddressSearchResult(result);
						_ctrlMoveMapInAddressSearch(true);
					}
					else {
						if(data.length == 1) {
							_bindAddressSearchResult('');
							_ctrlMoveMapInAddressSearch(false);
							
							$(_btnMoveAddressToMap).trigger('click', {
								pnu: data[0][0],
								address: data[0][1],
								lng: data[0][3],
								lat: data[0][2],
							});
						}
						else {
							//검색 결과가 없을때 
							console.log(data.length)
							var r = data.length;
							_bindAddressSearchResult(_emptyAddressSearchResultForm((r == undefined)? 'L':'R'));
							_ctrlMoveMapInAddressSearch(false);
						}
					}
					
				}, true);
			}
		});
		
		$(_btnMoveAddressToMap)
		.off('click')
		.on('click', function(e, arg) {
			
			if(!arg && !_selectedAddressObj.pnu) return;
			
			//이미 열려있는 주소검색 마커  윈도우 삭제
			hotplace.maps.destroyMarkerType(hotplace.maps.MarkerTypes.ADDRESS_SEARCH);
			hotplace.maps.destroyMarkerWindow(hotplace.maps.MarkerTypes.ADDRESS_SEARCH);
			
			var lng = arg ? arg.lng : _selectedAddressObj.lng;
			var lat = arg ? arg.lat : _selectedAddressObj.lat;
			var address = arg ? arg.address : _selectedAddressObj.address;
			var pnu = arg ? arg.pnu : _selectedAddressObj.pnu;
			var datas = {
				params : $.extend({address:address, pnu:pnu}, {defaultValue:hotplace.calc.sujibunseog.defaultValue}, {
					jimok: '전',
					valPerPyeung:21000000,
					area: 132,
					gongsi: 4040000,
					limitChange:'Y'
				})
			};
			
			if(lng == undefined || lat == undefined) return;
			//$('#btnNews').trigger('click');
			
			hotplace.maps.destroyMarkerType(hotplace.maps.MarkerTypes.ADDRESS_SEARCH);
			hotplace.maps.destroyMarkerWindow(hotplace.maps.MarkerTypes.ADDRESS_SEARCH);
			
			
			hotplace.maps.panToLikeAddressSearch(lat, lng, _menus.ADDRESS_SEARCH, {address:address, pnu:pnu, lng:lng, lat:lat});
		});
	}
	
	/*****************************************************************************
	 * 투자유망지역 검색
	 ****************************************************************************/
	var _jangmiHpGrade = '#jangmiHpGrade',
		_jangmiEnvGrade = '#jangmiEnvGrade',
		_tojiUseLimitHpGrade = '#tojiUseLimitHpGrade',
		_tojiUseLimitEnvGrade = '#tojiUseLimitEnvGrade',
		_devPiljiHpGrade = '#devPiljiHpGrade',
		_devPiljiEnvGrade = '#devPiljiEnvGrade',
		_btnToojaSearch = '#btnToojaSearch',
		_btnToojaSearchPrev = '#btnToojaSearchPrev',
		_dvToojaTab01Result = '#dvToojaTab01Result', //tabulator로 결과 테이블 영역 div
		_dvToojaTab02Result = '#dvToojaTab02Result', //tabulator로 결과 테이블 영역 div
		_dvToojaTab03Result = '#dvToojaTab03Result', //tabulator로 결과 테이블 영역 div
		_dvToojaLuris = '#dvToojaLuris',
		_toojaTab = {
			JangmiCityPlan: '#tabJangmiCityPlan',
			TojiUseLimitCancel: '#tabTojiUseLimitCancel',
			DevPilji: '#tabDevPilji'
		},
		_activeToojaTab = _toojaTab.JangmiCityPlan,
		_toojaBtnStateObj = {
			'#tabJangmiCityPlan':true,
			'#tabTojiUseLimitCancel':true,
			'#tabDevPilji':true
		}; //검색버튼이 활성화되면 true 아니면 false
	
	//함수리턴 
	function _initToojaDom() {
		hotplace.dom.listExpandCollapse(_toojaRegionSearchMenu);
		hotplace.dom.initSlider(_toojaRegionSearchMenu, false, [{
			targetId:_jangmiHpGrade
		},{
			targetId:_jangmiEnvGrade,
			bounds:{min: -5, max: -1},
			defaultValues:{min: -2, max: -1}
		},{
			targetId:_tojiUseLimitHpGrade
		}, {
			targetId:_tojiUseLimitEnvGrade,
			bounds:{min: -5, max: -1},
			defaultValues:{min: -2, max: -1}
		},{
			targetId:_devPiljiHpGrade
		},{
			targetId:_devPiljiEnvGrade,
			bounds:{min: -5, max: -1},
			defaultValues:{min: -2, max: -1}
		}]);
		
		/************************************
		 * 탭 클릭 이벤트
		 * 다른매뉴로 갔다왔을때 jQuery range slider 사라지는것 방지
		 * [재연]
		 * 0. 브라우저 새로고침
		 * 1. 투자유망 지역 검색메뉴 open
		 * 2. 개발적성필지 조건을 펼침
		 * 3. 토지이용규제 해소물건탭 활성화
		 * 4. 주소검색 메뉴 오픈
		 * 5. 다시 투자유망 지역검색 메뉴 오픈
		 * 6. 장기 미집행 도시계획시설 탭 활성화
		 * [결과] jQuery range slider 사라짐
		 ***********************************/
		$(_toojaRegionSearchMenu + ' button[data-toggle="tab"]')
		.off('shown.bs.tab')
		.on('shown.bs.tab', function (e) {
			hotplace.dom.resizeSliderGrp(_toojaRegionSearchMenu);
			
			var tabStr = $(this).attr('href');
			var k = tabStr.substring(4);
			_activeToojaTab = _toojaTab[k];
			
			//버튼정보 복원
			_restoreBtn();
		});
		
		$(_btnToojaSearch)
		.off('click')
		.on('click', function() {
			switch(_activeToojaTab) {
			case _toojaTab.JangmiCityPlan:
				_searchTooja(_dvToojaTab01Result, {
					url:'search/jangmi',
					data:_getToojaParam(_toojaTab.JangmiCityPlan),
					columns:_tabulatorColumns.jangmi
				});
				break;
			case _toojaTab.TojiUseLimitCancel:
				_searchTooja(_dvToojaTab02Result, {
					url:'search/tojiuselimitcancel',
					data:_getToojaParam(_toojaTab.TojiUseLimitCancel),
					columns:_tabulatorColumns.tojiuselimitcancel
				});
				break;
			case _toojaTab.DevPilji:
				_searchTooja(_dvToojaTab03Result, {
					url:'search/devpilji',
					data:_getToojaParam(_toojaTab.DevPilji),
					columns:_tabulatorColumns.devpilji
				});
				break;
			}
		});
		
		$(_btnToojaSearchPrev)
		.off('click')
		.on('click', function() {
			_toojaDvToogle();
			_saveBtnInfo(true);
			hotplace.dom.resizeSliderGrp(_toojaRegionSearchMenu);
		});
		
		$(_dvToojaLuris + ' button.close')
		.off('click')
		.on('click', function(e) {
			//반드시 있어야 함, 이벤트가 전달되면서 dvToojaLurisBox에 영향을 줌
			e.stopPropagation();
			_closeLurisDv();
		});
		
		return function() {
			//반드시 메뉴 content가 show된후에 호출되어져야 함
			hotplace.dom.resizeSliderGrp(_toojaRegionSearchMenu);
		}
	}
	
	function _closeLurisDv() {
		$(_dvToojaLuris).hide();
	}
	
	function _openLurisDv() {
		$(_dvToojaLuris).fadeIn();
	}
	
	function _toojaDvToogle() {
		var $searchArea = $(_activeToojaTab  + ' .searchArea'),
			$searchResultArea = $(_activeToojaTab  + ' .searchResultArea'),
			$btnToojaSearch = $(_btnToojaSearch),
			$btnToojaSearchPrev = $(_btnToojaSearchPrev);
		
		if($btnToojaSearch.is(':visible')) {
			$btnToojaSearch.hide();
			$btnToojaSearchPrev.show();
		}
		else {
			$btnToojaSearch.show();
			$btnToojaSearchPrev.hide();
		}
		
		if($searchArea.is(':visible')) {
			$searchArea.hide();
			$searchResultArea.show();
		}
		else {
			$searchArea.show();
			$searchResultArea.hide();
		}
	}
	
	//각탭의 검색,이전버튼 상태저장
	function _saveBtnInfo(isVisibleSearch) {
		_toojaBtnStateObj[_activeToojaTab] = isVisibleSearch;
	}
	
	//메뉴가 다시 열릴때 각탭의 검색,이전버튼 복원
	function _restoreBtn() {
		var isVisibleSearch = _toojaBtnStateObj[_activeToojaTab];
		if(isVisibleSearch) {
			$(_btnToojaSearch).show();
			$(_btnToojaSearchPrev).hide();
		}
		else {
			$(_btnToojaSearch).hide();
			$(_btnToojaSearchPrev).show();
		}
	}
	
	function _searchTooja(tableId, param, fn) {
		hotplace.ajax({
			url: param.url, //'search/jangmi',
			data: JSON.stringify(param.data/*_getToojaParam(_toojaTab.JangmiCityPlan)*/),
			contentType: 'application/json; charset=UTF-8',
			success: function(data, textStatus, jqXHR) {
				console.log(data);
				
				if(data.errCode == hotplace.error.LOGIN) {
					hotplace.dom.showAlertMsg(hotplace.dom.showLoginForm, '로그인후 사용하세요.');
					return;
				}
				
				_toojaDvToogle();
				_saveBtnInfo(false);
				
				hotplace.dom.createTabulator(tableId, {
				    //height:700, // set height of table
				    fitColumns:false, //fit columns to width of table (optional)
				    columns:param.columns,/*_tabulatorColumns.jangmi,*/
				    movableColumns:true,
				    resizableRows:true,
				    rowClick:function(e, row){ //trigger an alert message when the row is clicked
				       var data = row.getData();
				      console.log('=======================================rowClick====================================');
				       
				       if(data.lng == 0) {
				    	   hotplace.processAjaxError(hotplace.error.MISS_LATLNG);
				    	   return;
				       }
				       
				       
				       hotplace.maps.panToLikeAddressSearch(
				    		   data.lat,
				    		   data.lng,
				    		   null/*_menus.TOOJA_SEARCH*/,
				    		   {address:data.detail},
				    		   function() {
				    			   //마커가 닫힐때 Luris 도면도 닫힌다.
				    			   _closeLurisDv();
				    		   });
				       _openLurisDv();
				    },
				}, data);
				if($.isFunction(fn)) fn();
			}
		});
	}
	
	
	/*****************************************************************************
	 * 경공매 검색
	 ****************************************************************************/
	var _gyeonggongHpGrade = '#gyeonggongHpGrade',
		_gyeonggongEnvGrade = '#gyeonggongEnvGrade',
		_btnGyeonggongSearch = '#btnGyeonggongSearch',
		_btnGyeonggongSearchPrev = '#btnGyeonggongSearchPrev',
		_dvGyeonggongResult = '#dvGyeonggongResult';
	
	function _gyeonggongDvToogle() {
		var $searchArea = $(_gyeonggongSearchMenu  + ' .searchArea'),
			$searchResultArea = $(_gyeonggongSearchMenu  + ' .searchResultArea'),
			$btnGyeonggongSearch = $(_btnGyeonggongSearch),
			$btnGyeonggongSearchPrev = $(_btnGyeonggongSearchPrev);
		
		if($btnGyeonggongSearch.is(':visible')) {
			$btnGyeonggongSearch.hide();
			$btnGyeonggongSearchPrev.show();
		}
		else {
			$btnGyeonggongSearch.show();
			$btnGyeonggongSearchPrev.hide();
		}
		
		if($searchArea.is(':visible')) {
			$searchArea.hide();
			$searchResultArea.show();
		}
		else {
			$searchArea.show();
			$searchResultArea.hide();
		}
	}
	
	function _initGyeonggongDom() {
		hotplace.dom.listExpandCollapse(_gyeonggongSearchMenu);
		hotplace.dom.initSlider(_gyeonggongSearchMenu, false, [{
			targetId:_gyeonggongHpGrade
		},{
			targetId:_gyeonggongEnvGrade,
			bounds:{min: -5, max: -1},
			defaultValues:{min: -2, max: -1}
		}]);
		
		$(_btnGyeonggongSearch)
		.off('click')
		.on('click', function() {
			_searchGyeonggong()
		});
		
		$(_btnGyeonggongSearchPrev)
		.off('click')
		.on('click', function() {
			_gyeonggongDvToogle();
		});
	}
	
	function _getReverseMinMax(obj) {
		if(obj) {
			var originMax = obj.max;
			var originMin = obj.min;
			
			obj.max = Math.abs(originMin);
			obj.min = Math.abs(originMax);
		}
		
		return obj;
	}
	
	function _searchGyeonggong() {
		/*console.log({
			'jiyeog':_getCheckboxesData('itemGyeonggongJiyeog'),
			'mulgeonKind':_getCheckboxesData('itemGyeonggongMulgeonKind'),
			'jimok':_getCheckboxesData('itemGyeonggongJimok'),
			'jiboon':_getCheckboxesData('itemGyeonggongJiboon'),
			'gamjeongga':_getMinMax('itemGyeonggongGamjeongga'),
			'minIbchalga':_getMinMax('itemGyeonggongMinIbchalga'),
			'gongsi':_getMinMax('itemGyeonggongGongsiStandard'),
			'minIbchalgaR':_getMinMax('itemGyeonggongMinIbchalgaR'),
			'yongdoJiyeog':_getCheckboxesData('itemGyeonggongYongdoJiyeog'),
			'yongdoJigu':_getCheckboxesData('itemGyeonggongYongdoJigu'),
			'yongdoGuyeog':_getCheckboxesData('itemGyeonggongYongdoGuyeog'),
			'etcLawLimit':_getCheckboxesData('itemGyeonggongEtcLawLimit'),
			'etcChamgo':_getCheckboxesData('itemGyeonggongEtcChamgo'),
			'cityPlan':_getCheckboxesData('itemGyeonggongCityPlan'),
			'cityPlanState':_getCheckboxesData('itemGyeonggongCityPlanState'),
			'bosangPyeonib':_getCheckboxesData('itemGyeonggongBosangPyeonib'),
			'hpGrade':hotplace.dom.getSliderValues(_gyeonggongSearchMenu, _gyeonggongHpGrade.substring(1)),
			'envGrade':hotplace.dom.getSliderValues(_gyeonggongSearchMenu, _gyeonggongEnvGrade.substring(1))
		});
		
		return;*/
		
		//min max 값을 교환해야 한다
		var hpGrade = hotplace.dom.getSliderValues(_gyeonggongSearchMenu, _gyeonggongHpGrade.substring(1));
		
		hotplace.ajax({
			url: 'search/gyeonggong',
			data: JSON.stringify({
				'jiyeog':_getCheckboxesData('itemGyeonggongJiyeog'),
				'mulgeonKind':_getCheckboxesData('itemGyeonggongMulgeonKind'),
				'jimok':_getCheckboxesData('itemGyeonggongJimok'),
				'jiboon':_getCheckboxesData('itemGyeonggongJiboon'),
				'gamjeongga':_getMinMax('itemGyeonggongGamjeongga'),
				'minIbchalga':_getMinMax('itemGyeonggongMinIbchalga'),
				'gongsi':_getMinMax('itemGyeonggongGongsiStandard'),
				'minIbchalgaR':_getMinMax('itemGyeonggongMinIbchalgaR'),
				'yongdoJiyeog':_getCheckboxesData('itemGyeonggongYongdoJiyeog'),
				'yongdoJigu':_getCheckboxesData('itemGyeonggongYongdoJigu'),
				'yongdoGuyeog':_getCheckboxesData('itemGyeonggongYongdoGuyeog'),
				'etcLawLimit':_getCheckboxesData('itemGyeonggongEtcLawLimit'),
				'etcChamgo':_getCheckboxesData('itemGyeonggongEtcChamgo'),
				'cityPlan':_getCheckboxesData('itemGyeonggongCityPlan'),
				'cityPlanState':_getCheckboxesData('itemGyeonggongCityPlanState'),
				'bosangPyeonib':_getCheckboxesData('itemGyeonggongBosangPyeonib'),
				'hpGrade':_getReverseMinMax(hotplace.dom.getSliderValues(_gyeonggongSearchMenu, _gyeonggongHpGrade.substring(1))),
				'envGrade':_getReverseMinMax(hotplace.dom.getSliderValues(_gyeonggongSearchMenu, _gyeonggongEnvGrade.substring(1))),
				'tojiUseLimitCancel':_getCheckboxesData('itemGyeonggongTojiUseLimitCancel')
			}),
			contentType: 'application/json; charset=UTF-8',
			success: function(data, textStatus, jqXHR) {
				console.log(data);
				
				if(data.errCode == hotplace.error.LOGIN) {
					hotplace.dom.showAlertMsg(hotplace.dom.showLoginForm, '로그인후 사용하세요.');
					return;
				}
				
				if(data.success) {
					_gyeonggongDvToogle();
					
					hotplace.dom.createTabulator(_dvGyeonggongResult, {
					    height:700, // set height of table
					    fitColumns:true, //fit columns to width of table (optional)
					    columns:_tabulatorColumns.gyeonggong,
					    movableColumns:true,
					    rowClick:function(e, row){ //trigger an alert message when the row is clicked
					       var data = row.getData();
					       console.log(data)
					       
					       if(data.lng == 0) {
					    	   hotplace.processAjaxError(hotplace.error.MISS_LATLNG);
					    	   return;
					       }
					       
					       
					       hotplace.maps.panToLikeAddressSearch(data.lat, data.lng, _menus.GYEONGGONG_SEARCH, {address:data.jibeon});
					       
					    },
					}, data.datas);
				}
			}
		});
	}
	
	/*****************************************************************************
	 * 물건보기 검색
	 ****************************************************************************/
	var _btnViewMulgeon = '#btnViewMulgeon';
	
	function _initMulgeonDom() {
		$(_btnViewMulgeon)
		.off('click')
		.on('click', function() {
			var obj = {}
			$(_mulgeonViewMenu + ' input[type="checkbox"]:not(:disabled)').each(function() {
				var type = $(this).data('value');
				obj[type] = $(this).prop('checked') ? 1 : 0;
			})
			.promise()
			.done(function() {
				hotplace.maps.setMarkers(obj);
				
				//선택해지된 마커를 지운다.
				for(var m in obj) {
					if(obj[m] == 0) {
						hotplace.maps.destroyMarkerType(m);
					}
				}
				
				var activeMarkers = hotplace.maps.getActiveMarkers(),
			        activeMarkerCnt = activeMarkers.length;
				
				if(activeMarkerCnt > 0)	hotplace.dom.showMaskTransaction(activeMarkerCnt);
				hotplace.maps.showMarkers(null, true);
				
				_closeMenu(_menus.MULGEON_VIEW);
			});
		});
		
		//건축허가면적 enable 설정 여부 검토
		return {
			after:function() {
				hotplace.maps.checkMarkerLevelLimit();
			},
			before:function() {
				hotplace.maps.initMulgeonCheckMarker();
			}
		}
	}
	
	menu.eachMulgeonViewChk = function(fn, excludeDisabled) {
		var obj;
		if(fn && $.isFunction(fn)) {
			var chk = ' input[type="checkbox"]';
			if(excludeDisabled) chk += ':not(:disabled)';
			
			obj = $(_mulgeonViewMenu + chk).each(function() {
				var $this = $(this);
				fn($this, $this.prop('checked'), $this.data('value'));
			});
		}
	
		return obj;
	}
	
	menu.hasMulgeonView = function() {
		var r = false;
		$(_mulgeonViewMenu + ' input[type="checkbox"]').each(function(){
			if($(this).is(':checked')) {
				r = true;
				return;
			}
		});
		
		return r;
	}
	
	menu.initMulgeonView = function() {
		menu.eachMulgeonViewChk(function($chk) {
			$chk.prop('checked', false);
		});
		
		//상태변경
		hotplace.maps.setAllOffMarkers();
		
		//메뉴닫기
		if($(_mulgeonViewMenu).is(':visible')) {
			_closeMenu(_menus.MULGEON_VIEW);
		}
	};
	
	/*****************************************************************************
	 * 히트맵
	 ****************************************************************************/
	var _btnHeatmapShow = '#btnHeatmapShow',
		_btnHeatmapHide = '#btnHeatmapHide';
	
	function _heatmapOn(b_on) {
		
		$(_heatmapViewMenu + ' input[name=hitmap]').each(function() {
			var $this = $(this);
			var valid = $this.data('valid');
			if(valid) {
				if(b_on) {
					$this.removeAttr('disabled');
				}
				else {
					$this.prop('disabled', true);
					this.checked = false;
				}
			}
		})
		
	}
	
	function _startHeatmap(type) {
		type = type || 'OFF';
		hotplace.maps.setActiveCell(type);
		hotplace.maps.cellStart();
	}
	
	function _initHeatmapDom() {
		//히트맵보기
		$(_btnHeatmapShow)
		.off('click')
		.on('click', function() {
			
			//권한 체크
			hotplace.ajax({
				url: 'auth/heatmap', 
				async:false,
				method:'GET',
				success: function(data, textStatus, jqXHR) {
					if(data.success) {
						_heatmapOn(true);
						$(this).hide();
						$(_btnHeatmapHide).show();
					}
					else {
						jqXHR.errCode = hotplace.error.LOGIN;
					}
				
				},
				error: function(jqXHR, textStatus, e) {
					console.log(jqXHR);
				}
			});
			
			
		});
		
		//히트맵끄기
		$(_btnHeatmapHide)
		.off('click')
		.on('click', function() {
			_heatmapOn(false);
			_startHeatmap('OFF');
			$(this).hide();
			$(_btnHeatmapShow).show();
			_closeMenu(hotplace.config.menus.HEATMAP_VIEW);
		});
		
		$(_heatmapViewMenu + ' input[name=hitmap]')
		.off('change')
		.on('change', function(e, isTrigger) {
			//var cellType = 'OFF';
			_closeMenu(hotplace.config.menus.HEATMAP_VIEW);
			//setTimeout(function() {}, 500);
			if(isTrigger) {
				//$('#heatmapOff').prop('checked', true);
				//hotplace.maps.setActiveCell(cellType);
			}
			else {
				_startHeatmap($(this).data('value'));
			}
		});
	}
	

}(
	hotplace.menu = hotplace.menu || {},
	jQuery
));