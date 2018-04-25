/**
 * @namespace hotplace.gongmae
 */
(function(gongmae, $) {
	var _dvGongmaeInfoWin = '#dvGongmaeInfoWin',
		_btnGongmaePano = '#btnGongmaePano',
		_btnGongmaeDetail = '#btnGongmaeDetail',
		_btnGongmaeThumbClose = '#btnGongmaeThumbClose',
		_gDimages = '#gongmaeimages',
		_gongmaeImageCnt = '#gongmaeImageCnt',
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
				if(data.success === false && data.errCode) {
					jqXHR.errCode = data.errCode;
				}
				else {
					cbSucc(data);
				}
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
					if(data.success === false && data.errCode) {
						jqXHR.errCode = data.errCode;
					}
					else {
						var hasForm = hotplace.dom.showGongmaeDetail(function() {
							_makeGongmaeImages(data.images);
						}, data);
						
						if(!hasForm) hotplace.dom.showAlertMsg(null, '공매상세정보를 보실수 있는 권한이 없습니다.', {width:'40%'});
					}
					
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
	
	function _bindImageClick() {
		$(_gDimages + ' li > a')
		.off('click')
		.on('click', function() {
			var $img = $(this).children();
			var imgSrc = $img.prop('src');
			var title = $img.data('gubun');
			
			hotplace.dom.showGyeongmaeImage({width:700}, {src:imgSrc, title:title});
		});
	}
	
	function _makeGongmaeImages(images) {
		var $gDimages = $(_gDimages);
		var cnt = images.length;
		var currentRow = 0;
		var html = [];
		
		if(cnt >= 1) {
			$(_gongmaeImageCnt).text(cnt);
			
			html.push('<ul>');
			for(var i=0; i<cnt; i++) {
				html.push('<li><a href="#"><img src="' + images[i].image + '"></a></li>');
			}
		}
		
		$gDimages.html(html.join(''));
		if(cnt >= 1) {
			_initImageSlider();
			_bindImageClick();
		}
	}
	
	function _initImageSlider() {
		var $touchSlider = $(_gDimages);
		$touchSlider.touchSlider({
			autoplay : {
				enable : true,
				pauseHover : true,
				interval : 3500
			},	
			view : 4,
			btn_prev : $touchSlider.next().find('.btn_prev'),
			btn_next : $touchSlider.next().find('.btn_next'),
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
		
		if(!tForm) {
			//security로 인해 권한 없음
			hotplace.dom.showLoginMsg();
		}
		else {
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
	}
}(
	hotplace.gongmae = hotplace.gongmae || {},
	jQuery
));