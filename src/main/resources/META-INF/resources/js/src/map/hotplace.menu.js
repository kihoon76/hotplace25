/**
 * @namespace hotplace.menu
 * */
(function(menu, $) {
	var _menus = hotplace.config.menus;
	var _addrSearchMenu = '#' + _menus.ADDRESS_SEARCH,
		_toojaRegionSearchMenu = '#' + _menus.TOOJA_SEARCH,
		_mulgeonViewMenu = '#' + _menus.MULGEON_VIEW,
		_heatmapViewMenu = '#' + _menus.HEATMAP_VIEW;
		
	var _selectedAddressObj = null;
	var _tabulatorColumns = {
		jangmi:[
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
		]
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
	
	function _getToojaParam(cate) {
		var param = null;
		
		switch(cate) {
		case _toojaTab.JangmiCityPlan :
			param = {
				'cityPlan': _getCheckboxesData('itemCityPlanTab01'),
				'cityPlanState' : _getCheckboxesData('itemCityPlanStateTab01'),
				'bosangPyeonib': _getCheckboxesData('itemBosangPyeonibTab01'),
				'jiyeog':_getCheckboxesData('itemJiyeogTab01'),
				'jimok':_getCheckboxesData('itemJimokTab01'),
				'gongsi':_getCheckboxesData('itemGongsiTab01'),
				'yongdojiyeog':_getCheckboxesData('itemYongdoJiyeogTab01'),
				'yongdojigu':_getCheckboxesData('itemYongdoJiguTab01'),
				'yongdoguyeog':_getCheckboxesData('itemYongdoGuyeogTab01'),
				'etclawlimit':_getCheckboxesData('itemEtcLawLimitTab01'),
				'etcchamgo':_getCheckboxesData('itemEtcChamgoTab01'),
				'hpgrade':hotplace.dom.getSliderValues(_toojaRegionSearchMenu, _jangmiHpGrade.substring(1)),
				'gyeongsado': _getCheckboxesData('itemGyeongsadoTab01'),
				'jyeobdostate': _getCheckboxesData('itemJyeobdoTab01'),
				'envgrade':hotplace.dom.getSliderValues(_toojaRegionSearchMenu, _jangmiEnvGrade.substring(1)),
			};
			break;
		case _toojaTab.TojiUseLimitCancel :
			param = {};
			break;
		case _toojaTab.DevPilji :
			param = {};
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
		_btnAddressSearch = '#btnAddressSearch';
	
	//주소검색 후 라디오버튼 선택
	function _eventHandlerAddrRdo() {
		_selectedAddressObj.pnu = $(this).data('pnu');
		_selectedAddressObj.address = $(this).data('address');
		_selectedAddressObj.lng =  $(this).data('lng');
		_selectedAddressObj.lat =  $(this).data('lat');
	}
	
	//주소검색후 결과가 없는 메시지를 뿌림
	function _emptyAddressSearchResultForm() {
		var emptyHtml = [];
		emptyHtml.push('<table class="tableStyle left">');
		emptyHtml.push('<colgroup>');
		emptyHtml.push('	<col style="width:100%;">');
		emptyHtml.push('</colgroup>');
		emptyHtml.push('<tbody>');
		emptyHtml.push('	<tr>');
		emptyHtml.push('		<td class="">검색결과가 없습니다</td>');
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
		
		$(document)
		.off('change', '.ADDR_RDO', _eventHandlerAddrRdo)
		.on('change', '.ADDR_RDO', _eventHandlerAddrRdo);
		
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
				var param = {san:'1'};
				var beonji, beonjiF, beonjiS, beonjiArr, beonjiArrLen;
				
				var token = arg.split(' ');
				var tokenLen = token.length;
				var t;
				var arr = [];
				
				for(var i=0; i<tokenLen; i++) {
					t = token[i];
					if(t == ' ') continue;
					arr.push(t);
				}
				
				var arrLen = arr.length;
				for(var k=0; k<arrLen; k++) {
					if(arr[k] == '산') {
						param.san = '2';
					}
					else if(beonji = arr[k].match(/[0-9]+\-?[0-9]*/g)){
						if(beonji) {
							beonjiArr = beonji.toString().split('-');
							beonjiArrLen = beonjiArr.length;
							
							if(beonjiArrLen == 1) {
								param.beonjiF = $.trim(beonjiArr[0]);
								param.beonjiS = '0';
							}
							else {
								param.beonjiF = $.trim(beonjiArr[0]);
								param.beonjiS = $.trim(beonjiArr[1]);
							}
						}
					}
					else {
						param.detail = arr[k];
					}
				}
				
				hotplace.getPlainTextFromJson('mulgeon/search', JSON.stringify(param), function(data) {
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
							_bindAddressSearchResult(_emptyAddressSearchResultForm());
							_ctrlMoveMapInAddressSearch(false);
						}
					}
					
				}, true);
			}
			else {
				console.log('b');
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
				params : $.extend({address:address, pnu:pnu}, {defaultValue:hotplace.calc.profit.defaultValue}, {
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
		_btnToojaSearch = '#btnToojaSearch',
		_btnToojaSearchPrev = '#btnToojaSearchPrev',
		_dvToojaTab01Result = '#dvToojaTab01Result',
		_toojaTab = {
			JangmiCityPlan: 'JANGMI_CITY_PLAN',
			TojiUseLimitCancel: 'TOJI_USE_LIMIT_CANCEL',
			DevPilji: 'DEV_PILJI'
		}
	
	//함수리턴 
	function _initToojaDom() {
		hotplace.dom.listExpandCollapse(_toojaRegionSearchMenu);
		hotplace.dom.initSlider(_toojaRegionSearchMenu, false, [{
			targetId:_jangmiHpGrade
		},{
			targetId: _jangmiEnvGrade,
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
		});
		
		$(_btnToojaSearch)
		.off('click')
		.on('click', function() {
			/*$(this).hide();
			$(_btnToojaSearchPrev).show();*/
			_searchJangmiTab(_dvToojaTab01Result);
		});
		
		$(_btnToojaSearchPrev)
		.off('click')
		.on('click', function() {
			_toggleToojaTab1();
		});
		
		
		return function() {
			//반드시 메뉴 content가 show된후에 호출되어져야 함
			hotplace.dom.resizeSliderGrp(_toojaRegionSearchMenu);
		}
	}
	
	function _toojaDvToogle($elArr) {
		if($elArr && $elArr.length == 2) {
			for(var i=1; i>=0; i--) {
				$elArr[i]
				$elArr[i].is(':visible') ? $elArr[i].hide() : $elArr[i].show();
			}
		}
	}
	
	function _toggleToojaTab1() {
		_toojaDvToogle([$(_btnToojaSearch), $(_btnToojaSearchPrev)]);
		_toojaDvToogle([$('.searchArea'), $('.searchResultArea')]);
	}
	
	function _searchJangmiTab(tableId, fn) {
		hotplace.ajax({
			url: 'search/jangmi',
			data: JSON.stringify(_getToojaParam(_toojaTab.JangmiCityPlan)),
			contentType: 'application/json; charset=UTF-8',
			success: function(data, textStatus, jqXHR) {
				console.log(data);
				
				_toggleToojaTab1();
				hotplace.dom.createTabulator(tableId, {
				    height:700, // set height of table
				    fitColumns:true, //fit columns to width of table (optional)
				    columns:_tabulatorColumns.jangmi,
				    movableColumns:true,
				    rowClick:function(e, row){ //trigger an alert message when the row is clicked
				       var data = row.getData();
				       console.log(data)
				       
				       if(data.lng == 0) {
				    	   hotplace.processAjaxError(hotplace.error.MISS_LATLNG);
				    	   return;
				       }
				       
				       
				       hotplace.maps.panToLikeAddressSearch(data.lat, data.lng, _menus.TOOJA_SEARCH, {address:data.jibeon});
				       
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
				}, data);
				if($.isFunction(fn)) fn();
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
				
				hotplace.maps.showMarkers();
				
				_closeMenu(_menus.MULGEON_VIEW);
			});
		});
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
			_heatmapOn(true);
			$(this).hide();
			$(_btnHeatmapHide).show();
		});
		
		//히트맵끄기
		$(_btnHeatmapHide)
		.off('click')
		.on('click', function() {
			_heatmapOn(false);
			_startHeatmap('OFF');
			$(this).hide();
			$(_btnHeatmapShow).show();
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