/**
 * @namespace hotplace.mypage
 */
(function(mypage, $) {
	var _tabMypageGwansimMulgeon = '#tabMypageGwansimMulgeon';
	
	var _$selectedGwansimTr = null;
	
	mypage.init = function() {
		_initGwansimMulgeon();
	}
	
	function _initGwansimMulgeon() {
		$(_tabMypageGwansimMulgeon + ' table tr')
		.off('click')
		.on('click', function(e) {
			if(_$selectedGwansimTr) {
				_$selectedGwansimTr.css('background', '#fff');
			}
			
			$(this).css('background', '#f5f5f5');
			_$selectedGwansimTr = $(this);
		});
		
		$(_tabMypageGwansimMulgeon + ' .DEL')
		.off('click')
		.on('click', function() {
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
							_$selectedGwansimTr.remove();
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