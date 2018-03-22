/**
 * @namespace hotplace.bosangpyeonib
 */
(function(bosangpyeonib, $) {
	var _dvBosangPyeonibInfoWin = '#dvBosangPyeonibInfoWin',
		_btnBosangPyeonibPano = '#btnBosangPyeonibPano',
		_btnBosangPyeonibThumbClose = '#btnBosangPyeonibThumbClose',
		_btnBosangPyeonibList = '#btnBosangPyeonibList',
		_dvBosangPyeonibList = '#dvBosangPyeonibList',
		_dvBosangPyeonibTable = '#dvBosangPyeonibTable';
	
	function _getThumb(unu, cbSucc) {
		hotplace.ajax({
			url: 'bosangpyeonib/thumb',
			method: 'GET',
			dataType: 'json',
			data: {unu: unu},
			//loadEl: '#dvBosangPyeonib',
			success: function(data, textStatus, jqXHR) {
				//hotplace.dom.createChart('canvas');
				console.log(data);
				cbSucc(data);
				
				/*$('#bpMulgeonsojaeji').text(data.mulgeonsojaeji);
				$('#bpGonggogigwan').text(data.gonggogigwan);
				$('#bpGonggoil').text(data.gonggoil);
				$('#bpSaeobname').text(data.saeobname);
				$('#bpGonggobeonho').text(data.gonggobeonho);
				$('#bpSiseolkind').text(data.siseolkind);
				$('#bpSaeobsihaengja').text(data.saeobsihaengja);
				
				if(callback) callback();*/ 
			},
			error:function() {
				
			}
		});
	}
	
	function _getGroupMulgeonsojaeji(list, cbSucc) {
		hotplace.ajax({
			url: 'bosangpyeonib/group',
			method: 'POST',
			dataType: 'text',
			data: {gunu: list},
			//loadEl: '#dvBosangPyeonib',
			success: function(data, textStatus, jqXHR) {
				console.log(data);
				var jo = $.parseJSON(data);
				var list = jo.datas;
				
				cbSucc(list);
			},
			error:function() {
				
			}
		});
	}
	
	bosangpyeonib.markerClick = function(map, marker, win, kind) {
		var data = marker._data;
		var grpCnt = parseInt(data.info.xgc);
		var isGrouped = grpCnt >= hotplace.config.markerGrpCount;
		
		var tForm = hotplace.dom.getTemplate('bosangpyeonibForm');
		
		if(!tForm) {
			//security로 인해 권한 없음
			hotplace.dom.showAlertMsg(null, kind + '정보를 보실수 있는 권한이 없습니다.', {width:'40%'});
		}
		else {
			//그룹핑 된것인지 
			if(isGrouped) {
				_getGroupMulgeonsojaeji(data.info.gunu, function(list) {
					if(!list) return;
					
					win.open(map, marker);
					win.setOptions('content', tForm({kind:kind}));
					_setView('list');
					
					var len = list.length;
					var $list = $(_dvBosangPyeonibList);
					var lis = ['<ul class="listBox">'];
					for(var i=0; i<len; i++) {
						lis.push('<li data-unu="' +  list[i].unu + '">');
						lis.push('<span>' + list[i].addr + '</span>');
						lis.push('</li>');
					}
					
					lis.push('</ul>');
					
					$list.html(lis.join(''));
					
					$(_dvBosangPyeonibList + ' li')
					.off('click')
					.on('click', function(e) {
						var unu = $(this).data('unu');
						_getThumb(unu, function(d) {
							_address = d.mulgeonsojaeji;
							$('#bpMulgeonsojaeji').text(d.mulgeonsojaeji);
							$('#bpGonggogigwan').text(d.gonggogigwan);
							$('#bpGonggoil').text(d.gonggoil);
							$('#bpSaeobname').text(d.saeobname);
							$('#bpGonggobeonho').text(d.gonggobeonho);
							$('#bpSiseolkind').text(d.siseolkind);
							$('#bpSaeobsihaengja').text(d.saeobsihaengja);
							
							_viewItem();
							_bindGeoClickHandler(d.lat, d.lng);
						});
					});
					
					$(_btnBosangPyeonibThumbClose)
					.off('click')
					.on('click', function() {
						win.close();
					});
					
					$(_btnBosangPyeonibList)
					.off('click')
					.on('click', function() {
						_goList();
					});
				});
			}
			else {
				_getThumb(data.info.unu, function(d) {
					_address = d.mulgeonsojaeji;
					win.open(map, marker);
					win.setOptions('content', tForm($.extend({kind:kind}, d)));
					
					$(_btnBosangPyeonibThumbClose)
					.off('click')
					.on('click', function() {
						win.close();
					});
					
					_setView();
					_bindGeoClickHandler(d.lat, d.lng);
				});
			}
		}
	}
	
	function _bindGeoClickHandler(x, y) {
		$(_btnBosangPyeonibPano)
		.off('click')
		.on('click', function() {
			hotplace.dom.showMulgeonPanoramaForm(null, null, {x:x, y:y, address:_address});
		});
	}
	
	function _goList() {
		var $dvList = $(_dvBosangPyeonibList);
		var $dvTable = $(_dvBosangPyeonibTable);
		
		if($dvList.is(':visible')) return;
		
		$dvList.show();
		$dvTable.hide();
		$(_btnBosangPyeonibPano).hide();
	}
	
	function _viewItem() {
		$(_dvBosangPyeonibList).hide();
		$(_dvBosangPyeonibTable).show();
		$(_btnBosangPyeonibPano).show();
		
	}
	
	function _setView(type) {
		var $dvList = $(_dvBosangPyeonibList);
		var $dvTable = $(_dvBosangPyeonibTable);
		
		if(type == 'list') {
			$dvList.show();
			$dvTable.hide();
			$(_btnBosangPyeonibList).show();
			$(_btnBosangPyeonibPano).hide();
		}
		else {
			$dvList.hide();
			$dvTable.show();
			$(_btnBosangPyeonibList).hide();
			$(_btnBosangPyeonibPano).show();
		}
	}

}(
	hotplace.bosangpyeonib = hotplace.bosangpyeonib || {},
	jQuery
));