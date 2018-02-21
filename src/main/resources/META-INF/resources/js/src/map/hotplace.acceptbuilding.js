/**
 * @namespace hotplace.acceptbuilding
 */
(function(acceptbuilding, $) {
	var _dvAcceptBuildingInfoWin = '#dvAcceptBuildingInfoWin',
		_btnAcceptBuildingThumbClose = '#btnAcceptBuildingThumbClose',
		_btnAcceptBuildingPano = '#btnAcceptBuildingPano',
		_dvAcceptbuildingPano = '#dvAcceptbuildingPano',
		_dvAcceptbuildingPanoInfo = '#dvAcceptbuildingPanoInfo',
		_tbAcceptBuildingData = '#tbAcceptBuildingData',
		_tbAcceptBuildingPano = '#tbAcceptBuildingPano';
	
	
	function _getThumb(data) {
		hotplace.ajax({
			url: 'acceptbuilding/thumb',
			method: 'GET',
			dataType: 'json',
			data: {unu: data.info.unu},
			loadEl: _dvAcceptBuildingInfoWin,
			success: function(data, textStatus, jqXHR) {
				$('#aDaejiwichi').text(data.daejiwichi);
				$('#aAcceptgubun').text(data.acceptgubun);
				$('#aAcceptsingoil').text(data.acceptsingoil);
			},
			error:function() {
				
			}
		});
	}
	
	function _bindDetailClickHandler() {
		
		$('#dvAcceptbuilding .acceptbuilding-detail').on('click', function() {
			
		});
	}
	
	function _bindThumbClickHandler() {
		$('#btnAcceptbuildingThumb').on('click', function() {
			$('#tbAcceptbuildingThumb').show();
			$('#tbAcceptbuildingPano').hide();
		});
	}
	
	function _bindGeoClickHandler(x, y) {
		$(_btnAcceptBuildingPano)
		.off('click')
		.on('click', function() {
			$(_tbAcceptBuildingData).hide();
			$(_tbAcceptBuildingPano).show();
			hotplace.panomaps.createPanomaps(_dvAcceptbuildingPano.substring(1), x, y, true, function(location, msg) {
				$(_dvAcceptbuildingPanoInfo).html(msg);
			});
		});
	}
	
	/** 
	 * @memberof hotplace.acceptbuilding
	 * @function markerClick 
	 * @param {object} map 맵
	 * @param {object} marker 마커
	 * @param {object} win InfoWindow
	 */
	acceptbuilding.markerClick = function(map, marker, win) {
		var data = marker._data;
		win.open(map, marker);
		var tForm = hotplace.dom.getTemplate('acceptbuildingForm');
		
		win.setOptions('content', tForm());
		
		$(_btnAcceptBuildingThumbClose)
		.off('click')
		.on('click', function() {
			win.close();
		});
		
		/*_bindDetailClickHandler(win);
		_bindGeoClickHandler(data.location[1], data.location[0]);
		_bindThumbClickHandler();*/
		_bindGeoClickHandler(data.location[1], data.location[0]);
		_getThumb(data);
	}
}(
	hotplace.acceptbuilding = hotplace.acceptbuilding || {},
	jQuery
));