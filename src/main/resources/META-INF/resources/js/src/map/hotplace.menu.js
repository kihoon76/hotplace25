/**
 * @namespace hotplace.menu
 * */
(function(menu, $) {
	
	var _addrSearchMenu = '#addrSearchMenu',
		_toojaRegionSearchMenu = '#toojaRegionSearchMenu',
		_heatmapViewMenu = '#heatmapViewMenu',
		_btnMoveAddressToMap = '#btnMoveAddressToMap',
		_txtAddressSearch = '#txtAddressSearch',
		_btnAddressSearch = '#btnAddressSearch',
		_btnHeatmapShow = '#btnHeatmapShow',
		_btnHeatmapHide = '#btnHeatmapHide';
		
		
	var _selectedAddressObj = null;
	
	menu.initMenuDom = function(menuId) {
		var m = hotplace.config.menus;
		var showAfterFn;
		
		switch(menuId) {
		case m.ADDRESS_SEARCH: 
			showAfterFn = _initAddressDom();
			break;
		case m.TOOJA_SEARCH:
			showAfterFn = _initToojaDom();
			break;
		case m.GYEONGGONG_SEARCH:
			break;
		case m.MULGEON_SEARCH:
			break;
		case m.HEATMAP_SEARCH:
			showAfterFn = _initHeatmapDom();
			break;
		}
		
		return showAfterFn;
	}
	
	//메뉴창 닫기
	function _closeMenu(menuName) {
		hotplace.dom.hideLnbContent($('#' + menuName + ' .close'));
	}
	
	/*****************************************************************************
	 * 주소검색
	 ****************************************************************************/
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
		
		$(document).off('change', '.ADDR_RDO', _eventHandlerAddrRdo)
				   .on('change', '.ADDR_RDO', _eventHandlerAddrRdo);
		
		$(_txtAddressSearch).on('keydown', function(e) {
			if (e.which == 13) {
				var txt = e.target.value;
				$(_btnAddressSearch).trigger('click', $.trim(txt)); 
		    }
		});
		
		$(_btnAddressSearch).on('click', function(e, arg) {
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
		
		$(_btnMoveAddressToMap).on('click', function(e, arg) {
			
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
			
			hotplace.maps.panToBounds(lat, lng, function() {
				
				//menu를 닫는다.
				//hotplace.dom.hideLnbContent($('#' + hotplace.config.menus.ADDRESS_SEARCH + ' .close'));
				_closeMenu(hotplace.config.menus.ADDRESS_SEARCH);
				hotplace.maps.getMarker(hotplace.maps.MarkerTypes.ADDRESS_SEARCH, {location:[lng, lat]}, {
					'click' : function(map, newMarker, newInfoWindow) {
						 if(newInfoWindow.getMap()) {
							 newInfoWindow.close();
					     }
						 else {
							 newInfoWindow.open(map, newMarker);
							 hotplace.chart.infoCate('chartInfoCate', datas.params);
					     }
					}
				}, {
					hasInfoWindow: true,
					infoWinFormName: 'win/addrSearchWin',
					winContent: {
						backgroundColor: 'transparent',
						borderColor: '#666',
						borderWidth: 0,
						anchorSize: new naver.maps.Size(0, 0),
						anchorSkew: false,  
						pixelOffset: new naver.maps.Point(0, -12)
					},
					radius: 0,
					datas: {
						params : {address:address, pnu:pnu, lng:lng, lat:lat}
					},
					icon: hotplace.maps.getMarkerIcon(hotplace.maps.MarkerTypes.ADDRESS_SEARCH),
					size: {
						x: 26,
						y: 36
					}
				});
			});
		});
	}
	
	/*****************************************************************************
	 * 투자유망지역 검색
	 ****************************************************************************/
	//_sliderInit('gyeonggong', ['hopefulToojaHpGrade', 'environmentPyeonggaGrade']);
	var _jangmiToojaHpGrade = '#jangmiToojaHpGrade';
	
	//함수리턴 
	function _initToojaDom() {
		hotplace.dom.listExpandCollapse(_toojaRegionSearchMenu);
		hotplace.dom.initSlider(_toojaRegionSearchMenu, false, [_jangmiToojaHpGrade]);
		return function() {
			//반드시 메뉴 content가 show된후에 호출되어 져야 함
			hotplace.dom.resizeSliderGrp(_toojaRegionSearchMenu);
		}
	}
	
	
	/*****************************************************************************
	 * 히트맵
	 ****************************************************************************/
	
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
		$(_btnHeatmapShow).on('click', function() {
			_heatmapOn(true);
			$(this).hide();
			$(_btnHeatmapHide).show();
		});
		
		//히트맵끄기
		$(_btnHeatmapHide).on('click', function() {
			_heatmapOn(false);
			_startHeatmap('OFF');
			$(this).hide();
			$(_btnHeatmapShow).show();
		});
		
		$(_heatmapViewMenu + ' input[name=hitmap]').on('change', function(e, isTrigger) {
			//var cellType = 'OFF';
			_closeMenu(hotplace.config.menus.HEATMAP_SEARCH);
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