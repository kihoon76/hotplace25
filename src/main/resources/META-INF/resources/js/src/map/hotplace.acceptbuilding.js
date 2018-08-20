/**
 * @namespace hotplace.acceptbuilding
 */
(function(acceptbuilding, $) {
	var _dvAcceptBuildingInfoWin = '#dvAcceptBuildingInfoWin',
		_btnAcceptBuildingThumbClose = '#btnAcceptBuildingThumbClose',
		_btnAcceptBuildingPano = '#btnAcceptBuildingPano',
		_btnAcceptBuildingDetail = '#btnAcceptBuildingDetail',
		_address = null;
		
	function _getThumb(data) {
		hotplace.ajax({
			url: 'acceptbuilding/thumb',
			method: 'GET',
			dataType: 'json',
			data: {unu: data.info.unu},
			loadEl: _dvAcceptBuildingInfoWin,
			success: function(data, textStatus, jqXHR) {
				if(data.success === false && data.errCode) {
					jqXHR.errCode = data.errCode;
				}
				else {
					$('#aDaejiwichi').text(_address = data.daejiwichi);
					$('#aAcceptgubun').text(data.acceptgubun);
					$('#aAcceptsingoil').text(hotplace.util.dateYmdFormat(data.acceptsingoil));
					$('#aBuildingGubun').text(data.buildinggubun);
					$('#aDaejiArea').text(data.daejiarea);
					$('#aGrossFloorArea').text(data.grossfloorarea); 
					$('#aYongjeoglyul').text(data.yongjeoglyul);
					$('#aMainYongdo').text(data.mainyongdo);
					
					_bindDetailClickHandler(data);
				}
			},
			error:function() {
				
			}
		});
	}
	
	function _bindDetailClickHandler(data) {
		
		$(_btnAcceptBuildingDetail)
		.off('click')
		.on('click', function() {
				
			var hasForm = hotplace.dom.showAcceptBuildingDetail(null, data);
			
			if(hasForm) {
				hotplace.ajax({
					url: 'acceptbuilding/detail',
					method: 'GET',
					success: function(data, textStatus, jqXHR) {
						console.log(data)
						if(data.success === false && data.errCode) {
							jqXHR.errCode = data.errCode;
						}
						else {
							

						}
					},
					error:function() {
						
					}
				});
			}
			else {
				hotplace.dom.showAlertMsg(null, '경매상세정보를 보실수 있는 권한이 없습니다.', {width:'40%'});
			}
		});
	}
	
	
	function _bindGeoClickHandler(x, y) {
		$(_btnAcceptBuildingPano)
		.off('click')
		.on('click', function() {
			hotplace.dom.showMulgeonPanoramaForm(null, null, {x:x, y:y, address:_address});
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
		
		if(!tForm) {
			//security로 인해 권한 없음
			//hotplace.dom.showAlertMsg(null, '건축허가정보를 보실수 있는 권한이 없습니다.', {width:'40%'});
			hotplace.dom.showLoginMsg();
		}
		else if(tForm == hotplace.error.DUP_LOGIN) {
			return;
		}
		else {
			win.setOptions('content', tForm());
			
			$(_btnAcceptBuildingThumbClose)
			.off('click')
			.on('click', function() {
				win.close();
			});
			
			_bindDetailClickHandler();
			_bindGeoClickHandler(data.location[1], data.location[0]);
			_getThumb(data);
		}

	}
}(
	hotplace.acceptbuilding = hotplace.acceptbuilding || {},
	jQuery
));