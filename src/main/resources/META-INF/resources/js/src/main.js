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
	});
	
	/***************** 지도일반 버튼 ************************/
	$('#btnMapNormal').on('click', function() {
		hotplace.maps.showMapType('NORMAL');
	});
	
	/***************** 지도위성 버튼 ************************/
	$('#btnMapSatellite').on('click', function() {
		hotplace.maps.showMapType('HYBRID');
	});
	
	
	hotplace.maps.init('naver', {
		X: hotplace.config.mapDefaultX,
		Y: hotplace.config.mapDefaultY, 
		level: hotplace.config.minZoomLevel
	}, {
		'zoom_changed' : function(map, level) {
			_currLevel = level;
			/*hotplace.dom.addBodyAllMask();
			
			setTimeout(function() {
				hotplace.maps.showMarkers();
				hotplace.maps.showCellLayer();
				hotplace.dom.removeBodyAllMask();
				_enableMenu(level, 'li_menu_mulgeon');
			},500);
			
			if(_currLevel == 3) {
				hotplace.dom.showMinimaps();
			}
			else {
				hotplace.dom.hideMinimaps();
			}*/
		},
		'zoom_start' : function(map, level) {
			////hotplace.test.initMarker(level);
			/*_prevLevel = level;
			
			hotplace.maps.destroyMarkers(true);
			//hotplace.maps.destroyMarkerWindow(hotplace.maps.MarkerTypes.RADIUS_SEARCH);
			hotplace.maps.destroyAllMarkerWindow();
			hotplace.database.initLevel(level);*/
		},
		'dragend' : function(map, bnds) {
			//cell과 marker가 동시에 켜져있을 경우 
			/*if(!hotplace.maps.isOffCell()) {
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
			}*/
		},
		'click' : function(map, latlng) {
			console.log(latlng)
			//hotplace.maps.getClickedCell(latlng);
		},
		'panning' : function() {
			console.log('panning');
			//
			//hotplace.maps.destroyMarkerWindow(hotplace.maps.MarkerTypes.MULGEON_SEARCH);
		}
	}, function(map) {
		
	});
});