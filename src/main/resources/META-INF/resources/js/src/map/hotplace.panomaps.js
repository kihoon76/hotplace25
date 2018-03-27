/**
 * @namespace hotplace.panomaps
 * */
(function(panomaps, $) {
	var pano = null;
	var _marker = null;
	var _mode = null;
	var _streetMode = 'S';
	var _mulgeonMode = 'M';
	
	panomaps.STREET_MODE = _streetMode;    //streetview에서 사용할 시
	panomaps.MULGEON_MODE = _mulgeonMode;
	
	
	panomaps.createPanomaps = function(mode, container, x, y, hasMarker, callback, pano_changed, pov_changed) {
		_mode = mode || _streetMode;
		
		if(hasMarker) {
			_marker = new naver.maps.Marker({
			    position: new naver.maps.LatLng(x, y)
			});
		}
		
		pano = new naver.maps.Panorama(container, {
	        position: new naver.maps.LatLng(x, y),
	        pov: {
	            pan: -135,
	            tilt: -20, //상하
	            fov: 100
	        },
	        zoomControl: true,
	        zoomControlOptions: {
	            position: naver.maps.Position.TOP_RIGHT,
	            style: naver.maps.ZoomControlStyle.SMALL
	        }
	    });
		
		pano.zoomIn();
		//pano.setVisible(false);
		
		naver.maps.Event.addListener(pano, 'init', function() {
	        if(hasMarker) {
	        	_marker.setMap(pano);
	        	 var proj = pano.getProjection();
	 	        var lookAtPov = proj.fromCoordToPov(_marker.getPosition());
	 	        if (lookAtPov) {
	 	            pano.setPov(lookAtPov);
	 	        }
	        }
	        
	        if(callback) {
	        	var location = pano.getLocation();
	        	var msg = '<div>[출처: naver]</div><div>사진촬영일은  ' + location.photodate.substring(0,10) + ' 입니다.</div>';
	        	callback(location, msg, pano);
	        }
	    });
		
		if(pano_changed) {
			naver.maps.Event.addListener(pano, 'pano_changed', function() {
				pano_changed(pano);
			});
		}
		
	}
	
	panomaps.setPosition = function(coord) {
		if(pano) {
			pano.setPosition({lat:coord.y, lng:coord.x});
		}
	}
	
	panomaps.clear = function() {
		if(pano) {
			naver.maps.Event.clearInstanceListeners(pano);
			pano = null;
		}
	}
	
	panomaps.resize = function($element) {
		if(pano  && _mode == _streetMode) {
			var winW = $(window).width();
			var winH = $(window).height();
			$element.width(winW);
			$element.height(winH);
			
			pano.setSize({width: winW, height: winH});
		}
	}
}(
	hotplace.panomaps = hotplace.panomaps || {},
	jQuery
));