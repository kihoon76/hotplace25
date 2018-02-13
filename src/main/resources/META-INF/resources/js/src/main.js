$(document).ready(function() {
	var _currLevel = hotplace.config.minZoomLevel,
		_menusThreshold = {},//menu 특정레벨에서 비활성화
		_contextCoord = null, //마우스 우클릭시 coord
		$_lnbMulgeon = $('#lnbArea .MULGEON');   
	
	function _enableMenu(level, standardLevel, $targetLi, $btnClose) {
		var key = $targetLi.data('key');
		
		if(level >= standardLevel) {
			if(_menusThreshold[key]) return;
			$targetLi.removeClass('disabled');
			_menusThreshold[key] = true;
		}
		else {
			if(_menusThreshold[key] && !$targetLi.hasClass('disabled')) {
				$targetLi.addClass('disabled');
				_menusThreshold[key] = false;
				
				//메뉴가 열려있으면 닫는다.
				hotplace.dom.hideLnbContent($btnClose);
			}
		}
	}
	
	/***************** 지적도 버튼 ************************/
	$('#btnJijeok').on('click', function() {
		var onOff = $(this).data('switch');
		hotplace.maps.showJijeokLayer(onOff, $(this));
		
		//document.documentElement.webkitRequestFullscreen();
	});
	
	/***************** 지도일반 버튼 ************************/
	$('#btnMapNormal').on('click', function() {
		$(this).addClass('active');
		$('#btnMapSatellite').removeClass('active');
		hotplace.maps.showMapType('NORMAL');
	});
	
	/***************** 지도위성 버튼 ************************/
	$('#btnMapSatellite').on('click', function() {
		$(this).addClass('active');
		$('#btnMapNormal').removeClass('active');
		hotplace.maps.showMapType('HYBRID');
	});
	
	/***************** 타임뷰 버튼 ************************/
	/*$('#btnTimeView').on('click', function() {
		hotplace.maps.createTimeView();
	});*/
	
	/***************** 거리뷰 버튼 ************************/
	$('#btnStreetView').on('click', function(e, t) {
		console.log(t)
		//heatmap이 켜져있으면 동작 안함
		if(!t) {
			if(!hotplace.maps.isOffCell()) {
				hotplace.dom.showAlertMsg(null, '히트맵을 끄신후에 이용하세요', {width:'50%'});
				return;
			}
		}
		
		var onOff = $(this).data('switch');
		if(onOff == 'on') {
			hotplace.streetview.stop();
		}
		
		hotplace.dom.activeButton(onOff, $(this));
		hotplace.maps.showStreetLayer(onOff, $(this));
	});
	
	/***************** 타임뷰 버튼 ************************/
	$('#btnTimeview').on('click', function(){
		var $this = $(this);
		var onOff = $this.data('switch');
		
		hotplace.dom.activeButton(onOff, $this);
		
		if(onOff == 'on') {
			$('#dvTimeview').hide();
		}
		else {
			$('#dvTimeview').show();
			$('#dvYearRange').rangeSlider('resize');
		}
	});
	
	/***************** 왼쪽메뉴 ************************/
	$('#memuList > li > a').on('click', function() {
		hotplace.dom.showLnbContent($(this)); 
	});
	
	/***************** 왼쪽메뉴 닫기버튼 ************************/
	$(document).on('click', '#lnbCont .close', function() {
		hotplace.dom.hideLnbContent($(this));
	});
	
	/***************** 로그인 버튼 ************************/
	$('#gnbLogin').on('click', function(e) {	
		hotplace.dom.showLoginForm();
	});
	
	/***************** 로그아웃 버튼 ************************/
	$('#gnbLogout').on('click', function(e) {	
		hotplace.dom.showLogoutForm(function() {
			window.location.reload();
		});
	});
	
	/***************** context 버튼 (위치 주소보기) ************************/
	$('#btnContextLocAddress').on('click', function() {
		var tm128 = naver.maps.TransCoord.fromLatLngToTM128(_contextCoord);
		hotplace.dom.searchCoordToAddress(_contextCoord, tm128);
		hotplace.dom.hideContextMenu();
	});
	
	hotplace.maps.init('naver', {
		X: hotplace.config.mapDefaultX,
		Y: hotplace.config.mapDefaultY, 
		level: hotplace.config.minZoomLevel
	}, {
		'zoom_changed' : function(map, level) {
			_currLevel = level;
			hotplace.dom.addBodyAllMask();
			
			setTimeout(function() {
				hotplace.maps.showMarkers();
				hotplace.maps.showCellLayer();
				hotplace.dom.removeBodyAllMask();
				_enableMenu(level, hotplace.config.mulgeonViewLevel, $_lnbMulgeon, $('#' + hotplace.config.menus.MULGEON_SEARCH + ' .close'));
			},500);
		},
		'zoom_start' : function(map, level) {
			hotplace.maps.destroyMarkers(true);
			//hotplace.maps.destroyMarkerWindow(hotplace.maps.MarkerTypes.RADIUS_SEARCH);
			hotplace.maps.destroyAllMarkerWindow();
			hotplace.database.initLevel(level);
			hotplace.dom.hideContextMenu();
		},
		'dragend' : function(map, bnds) {
			//cell과 marker가 동시에 켜져있을 경우 
			if(!hotplace.maps.isOffCell()) {
				if(hotplace.maps.isInLocationBounds(bnds)) {
					hotplace.maps.appendCell();
					hotplace.maps.appendMarker();
				}
				else {
					hotplace.dom.showMaskTransaction((hotplace.maps.isActiveSalesView()) ? (1 + hotplace.maps.getActiveMarkers().length) : 1);
					hotplace.maps.showCellLayer(null, true);
					hotplace.maps.showMarkers(null, true);
				}
			}
			else {//marker만 켜져 있을 경우
				if(hotplace.maps.isInLocationBounds(bnds)) {
					hotplace.maps.appendMarker();
				}
				else {
					hotplace.maps.showMarkers();
				}
			}
			
		},
		'click' : function(map, latlng) {
			console.log(latlng)
			//hotplace.maps.getClickedCell(latlng);
			if($('#btnStreetView').data('switch') == 'on') {
				hotplace.streetview.startPanorama(map, latlng);
			}
			
			
		},
		'mousedown': function() {
			hotplace.dom.hideContextMenu();
		},
		'rightclick': function(map, pe) {
			//거리재기, 면적재기가 활성화되어 있으면 context 동작안함
			if(hotplace.dom.isActiveCalcArea() || hotplace.dom.isActiveCalcDistance()) return;
			
			_contextCoord = pe.coord;
			map.getPanes().overlayLayer.appendChild($('#dvContextMenu')[0]);
			
			$('#dvContextMenu')
			.css('left', pe.offset.x)
			.css('top', pe.offset.y)
			.show();
		},
		'panning' : function() {
			console.log('panning');
			//
			//hotplace.maps.destroyMarkerWindow(hotplace.maps.MarkerTypes.MULGEON_SEARCH);
		},
		'mouseover' : function(map, pe) {
			if($('#btnStreetView').data('switch') == 'on') {
				hotplace.streetview.start(map, pe.coord);
			}
		},
		'mousemove' : function(map, pe) {
			if($('#btnStreetView').data('switch') == 'on') {
				hotplace.streetview.moveMarker(pe.coord);
			}
		}
	}, function(map) {
		//hotplace.maps.showCellLayer();
		hotplace.dom.showYearRangeDiv();
		hotplace.dom.showAutoYearRangeDiv();
		hotplace.dom.enableYearRangeDiv(false);
	});
});