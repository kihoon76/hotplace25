/**
 * @namespace hotplace.search
 * */
(function(search, $) {
	
	search.initMenuDom = function(menuId) {
		var m = hotplace.config.menus;
		switch(menuId) {
		case m.ADDRESS_SEARCH: 
			break;
		case m.TOOJA_SEARCH:
			break;
		case m.GYEONGGONG_SEARCH:
			break;
		case m.MULGEON_SEARCH:
			break;
		case m.HEATMAP_SEARCH:
			break;
		}
	}
	
	function _initAddressDom() {
		
		$(document).on('change', )
		$('#txtAddressSearch').on('keydown', function(e) {
			if (e.which == 13) {
				var txt = e.target.value;
				$('#btnAddressSearch').trigger('click', $.trim(txt)); 
		    }
		});
		
		$('#btnAddressSearch').on('click', function(e, arg) {
			if(arg == undefined) {
				arg = $.trim($('#txtAddressSearch').val());
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
					var output = $('#addrSearchMenu .adressSAreaResult');
					var dataForm = {
						'addresses': data,
						'rdoId': 'addr'
					}
					
					if(data.length > 1) {
						var result = (hotplace.dom.getTemplate('addrSearchResult'))(dataForm);
						output.html(result);
					}
					else {
						if(data.length == 1) {
							console.log(data);
							$('#btnMoveAddressToMap').trigger('click', {
								pnu: data[0][0],
								address: data[0][1],
								lng: data[0][3],
								lat: data[0][2],
							});
						}
					}
					
				}, true, '#dvMulgeon');
			}
			else {
				console.log('b');
			}
		});
		
		$('#btnMoveAddressToMap').on('click', function(e, arg) {
			//이미 열려있는 물건검색 마커  윈도우 삭제
			hotplace.maps.destroyMarkerType(hotplace.maps.MarkerTypes.MULGEON_SEARCH);
			hotplace.maps.destroyMarkerWindow(hotplace.maps.MarkerTypes.MULGEON_SEARCH);
			
			var $sel = $('input:radio[name="' + /*addrObj.rdoId*/'addr' + '"]:checked');
			var lng = arg ? arg.lng : $sel.data('lng');
			var lat = arg ? arg.lat : $sel.data('lat');
			var address = arg ? arg.address : $sel.data('address');
			var pnu = arg ? arg.pnu : $sel.data('pnu');
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
			
			hotplace.maps.destroyMarkerType(hotplace.maps.MarkerTypes.MULGEON_SEARCH);
			hotplace.maps.destroyMarkerWindow(hotplace.maps.MarkerTypes.MULGEON_SEARCH);
			
			hotplace.maps.panToBounds(lat, lng, function() {
				hotplace.maps.getMarker(hotplace.maps.MarkerTypes.MULGEON_SEARCH, {location:[lng, lat]}, {
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
					infoWinFormName: 'mulgeonInfosForm',
					radius: 0,
					datas: {
						params : {address:address}
					},
					icon: hotplace.maps.getMarkerIcon(hotplace.maps.MarkerTypes.MULGEON_SEARCH),
					size: {
						x: 26,
						y: 36
					}
				});
			});
		});
	}
}(
	hotplace.search = hotplace.search || {},
	jQuery
));