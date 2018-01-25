$(document).ready(function() {
	
	var _dom     = hotplace.dom;
	
	/*****************************************************************************************************/
	
	var _prevLevel = 3;
	var _currLevel = 3;
	
	var _isLevelChanged = function() {
		return _prevLevel != _currLevel;
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
	$('#btnStreetView').on('click', function(e) {
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
		hotplace.dom.showLnbContents($(this)); 
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
				//_enableMenu(level, 'li_menu_mulgeon');
			},500);
			
			if(_currLevel == 3) {
				hotplace.dom.showMinimaps();
			}
			else {
				hotplace.dom.hideMinimaps();
			}
		},
		'zoom_start' : function(map, level) {
			////hotplace.test.initMarker(level);
			_prevLevel = level;
			
			hotplace.maps.destroyMarkers(true);
			//hotplace.maps.destroyMarkerWindow(hotplace.maps.MarkerTypes.RADIUS_SEARCH);
			hotplace.maps.destroyAllMarkerWindow();
			hotplace.database.initLevel(level);
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
		hotplace.maps.showCellLayer();
		hotplace.dom.showYearRangeDiv();
		//hotplace.dom.showAutoYearRangeDiv();
		hotplace.dom.enableYearRangeDiv(false);
	});
});