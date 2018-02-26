/**
 * @namespace hotplace.minimaps
 * */
(function(minimaps, $) {
	var mmaps = [];
	var panoMimimap = null;
	var streetLayer = null;
	var streetMarker = null;
	
	minimaps.create = function(map, container, coord, listener) {
		console.log(map.getZoom());
		map.controls[naver.maps.Position.BOTTOM_RIGHT].push($('#' + container).get(0));
		var minimap = new naver.maps.Map(container, { //미니맵 지도를 생성합니다.
		    bounds: map.getBounds(),
		    minZoom: 3,
		    zoom: map.getZoom(),
		    draggable: true,
		    scrollWheel: true,
		    scaleControl: false,
		    mapDataControl: false,
		    logoControl: false
		});
		
		streetLayer = new naver.maps.StreetLayer();
		streetLayer.setMap(minimap);
		panoMimimap = minimap;
		
		minimap.setCenter(coord);
		streetMarker = new naver.maps.Marker({
			position: new naver.maps.LatLng(coord.y, coord.x),
			icon: {
				url: hotplace.getContextUrl() + 'resources/img/marker/marker_search.png', //50, 68 크기의 원본 이미지
				size: new naver.maps.Size(25, 34),
				scaledSize: new naver.maps.Size(25, 34),
				origin: new naver.maps.Point(0, 0),
				anchor: new naver.maps.Point(12, 34)
			},
			draggable: true,
			map: minimap 
		});
		
		naver.maps.Event.addListener(minimap, 'click', function(e) {
			streetMarker.setPosition({lat:e.coord.y, lng:e.coord.x});
			hotplace.panomaps.setPosition(e.coord);
		});
		
		if(listener) {
			naver.maps.Event.addListener(streetMarker, 'dragend', function(e) {
				var coord = e.coord;
				listener(coord);
			});
		}
		
	}
	
	minimaps.panoClear = function(map) {
		if(panoMimimap) {
			panoMimimap = null;
		}
		
		if(streetLayer) streetLayer = null;
		if(streetMarker) streetMarker = null; 
	}
	
	minimaps.setPanoMarkerPosition = function(coord) {
		if(streetMarker) {
			streetMarker.setPosition(coord);
			panoMimimap.setCenter(coord);
		}
	}
	
}(
	hotplace.minimaps = hotplace.minimaps || {},
	jQuery	
));