/**
 * @namespace hotplace.silgeolae
 */
(function(silgeolae, $) {
	var _dvSilgeolaeInfoWin = '#dvSilgeolaeInfoWin',
		_btnSilgeolaePano = '#btnSilgeolaePano',
		_btnSilgeolaeThumbClose = '#btnSilgeolaeThumbClose',
		_address = null;;
	
	
	function _getThumb(data, cbSucc) {
		hotplace.ajax({
			url: 'silgeolae/thumb',
			method: 'GET',
			dataType: 'json',
			//loadEl: _dvGyeongmaeInfoWin,
			success: function(d, textStatus, jqXHR) {
				//hotplace.dom.createChart('canvas');
				console.log(d);
				if(d.success === false && d.errCode) {
					jqXHR.errCode = d.errCode;
				}
				else {
					d.lng = (data.location) ? data.location[0] : '';
					d.lat = (data.location) ? data.location[1] : '';
					cbSucc(d);
				}
			},
			error:function() {
				
			}
		});
	}
	/** 
	 * @memberof hotplace.silgeolae 
	 * @function markerClick 
	 * @param {object} map 맵
	 * @param {object} marker 마커
	 * @param {object} win InfoWindow
	 */
	silgeolae.markerClick = function(map, marker, win) {
		var data = marker._data;
		console.log(data);
		var tForm = hotplace.dom.getTemplate('silgeolaeForm');
		
		if(!tForm) {
			hotplace.dom.showLoginMsg();
		}
		else if(tForm == hotplace.error.DUP_LOGIN) {
			return;
		}
		else {
			_getThumb(data, function() {
				win.open(map, marker);
				win.setOptions('content', tForm(data.info || {}));
				
				$(_btnSilgeolaeThumbClose)
				.off('click')
				.on('click', function() {
					win.close();
				});
				
				_bindGeoClickHandler(data.location[1], data.location[0]);
			});
		}
	}
	
	function _bindGeoClickHandler(x, y) {
		$(_btnSilgeolaePano)
		.off('click')
		.on('click', function() {
			hotplace.dom.showMulgeonPanoramaForm(null, null, {x:x, y:y, address:_address});
		});
	}
}(
	hotplace.silgeolae = hotplace.silgeolae || {},
	jQuery
));