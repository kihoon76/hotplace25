/**
 * @namespace hotplace.gongmae
 */
(function(gongmae, $) {
	var _dvGongmaeInfoWin = '#dvGongmaeInfoWin',
		_btnGongmaePano = '#btnGongmaePano',
		_btnGongmaeDetail = '#btnGongmaeDetail',
		_btnGongmaeThumbClose = '#btnGongmaeThumbClose',
		_address = null;
	
	function _getThumb(data, cbSucc) {
		hotplace.ajax({
			url: 'gongmae/thumb',
			method: 'GET',
			dataType: 'json',
			data: {unu: data.info.unu},
			//loadEl: _dvGongmaeInfoWin,
			success: function(data, textStatus, jqXHR) {
				console.log(data);
				cbSucc(data);
			},
			error:function() {
				
			}
		});
	}
	
	function _bindDetailClickHandler(d) {
		
		$(_btnGongmaeDetail)
		.off('click')
		.on('click', function() {
			var param = {
				goyubeonho: d.goyubeonho,
				pnu: d.pnu
			}
			
			hotplace.ajax({
				url: 'gongmae/detail',
				method: 'GET',
				dataType: 'json',
				data: param,
				//loadEl: hotplace.dom.getModalPopId(),
				success: function(data, textStatus, jqXHR) {
					console.log(data);
					hotplace.dom.showGongmaeDetail(null, data);
				},
				error:function() {
					
				}
			});
		});
	}
	
	function _bindGeoClickHandler(x, y) {
		$(_btnGongmaePano)
		.off('click')
		.on('click', function() {
			hotplace.dom.showMulgeonPanoramaForm(null, null, {x:x, y:y, address:_address});
		});
	}
	
	/** 
	 * @memberof hotplace.gyeongmae 
	 * @function markerClick 
	 * @param {object} map 맵
	 * @param {object} marker 마커
	 * @param {object} win InfoWindow
	 */
	gongmae.markerClick = function(map, marker, win) {
		var data = marker._data;
		
		var tForm = hotplace.dom.getTemplate('gongmaeForm');
		_getThumb(data, function(d) {
			_address = d.mulgeonAddress;
			
			win.open(map, marker);
			win.setOptions('content', tForm(d));
			
			$(_btnGongmaeThumbClose)
			.off('click')
			.on('click', function() {
				win.close();
			});
			
			
			_bindDetailClickHandler(d);
			_bindGeoClickHandler(data.location[1], data.location[0]);
		});
	}
}(
	hotplace.gongmae = hotplace.gongmae || {},
	jQuery
));