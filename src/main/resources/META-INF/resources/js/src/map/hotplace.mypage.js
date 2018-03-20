/**
 * @namespace hotplace.mypage
 */
(function(mypage, $) {
	var _tabMypageGwansimMulgeon = '#tabMypageGwansimMulgeon';
	
	var _$selectedGwansimTr = null;
	
	function _setConfigSelectTr($tr) {
		if(_$selectedGwansimTr) {
			_$selectedGwansimTr.css('background', '#fff');
		}
		
		$tr.css('background', '#f5f5f5');
		_$selectedGwansimTr = $tr;
	}
	
	mypage.init = function() {
		_initGwansimMulgeon();
	}
	
	function _initGwansimMulgeon() {
		$(_tabMypageGwansimMulgeon + ' table tr')
		.off('click')
		.on('click', function(e) {
			_setConfigSelectTr($(this));
			console.log(e);
			hotplace.dom.showMypageGwansimPop();
			
		});
		
		$(_tabMypageGwansimMulgeon + ' .DEL')
		.off('click')
		.on('click', function(e) {
			e.stopPropagation();
			var $tr = $(this).parent();
			_setConfigSelectTr($tr);
			
			var gwansimNum = $(this).data('key');
			var msg = '주소지 [ ' + $(this).parent().data('address') + ' ]를 삭제하시겠습니까?';
			
			hotplace.dom.showConfirmBox(function() {
				hotplace.ajax({
					url: 'spot/del/gwansim?gwansimNum=' + gwansimNum,
					method : 'GET',
					success : function(data, textStatus, jqXHR) {
						console.log(data);
						if(data.success) {
							var gwansimNum = data.datas[0];
							$tr.remove();
							_$selectedGwansimTr = null;
						}
						else {
							jqXHR.errCode = hotplace.error.GWANSIM_DEL;
						}
					},
					error: function() {
						
					}
				});
			}, msg, {width:'40%'});
		})
	}
}(
	hotplace.mypage = hotplace.mypage || {},
	jQuery
));