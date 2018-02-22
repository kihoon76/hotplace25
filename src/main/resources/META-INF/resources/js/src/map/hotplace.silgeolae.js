/**
 * @namespace hotplace.silgeolae
 */
(function(silgeolae, $) {
	var _dvSilgeolaeInfoWin = '#dvSilgeolaeInfoWin',
		_btnSilgeolaePano = '#btnSilgeolaePano',
		_btnSilgeolaeThumbClose = '#btnSilgeolaeThumbClose',
		_address = null;;
	
	
	function _getThumb(data, cbSucc) {
		console.log(data);
		$('#silYongdo').text(data.info.yongdo);
		$('#silJimok').text(data.info.jimok);
		$('#silGyeyagarea').text(data.info.gyeyagarea);
		$('#silGyeyagnyeonwol').text(data.info.gyeyagnyeonwol);
		$('#silGyeyagil').text(data.info.gyeyagil);
		$('#silGeolaegeumaeg').text(data.info.geolaegeumaeg.toString().money());
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
		var tForm = hotplace.dom.getTemplate('silgeolaeForm');
		
		win.open(map, marker);
		win.setOptions('content', tForm(data));
		
		$(_btnSilgeolaeThumbClose)
		.off('click')
		.on('click', function() {
			win.close();
		});
		
		_bindGeoClickHandler(data.location[1], data.location[0]);
		/*_getThumb(data, function(d) {
		
		});*/
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