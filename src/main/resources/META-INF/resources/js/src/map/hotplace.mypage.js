/**
 * @namespace hotplace.mypage
 */
(function(mypage, $) {
	var _tabMypageAccount = '#tabMypageAccount',
		_tabMypageGwansimMulgeon = '#tabMypageGwansimMulgeon';
	
	var _$selectedGwansimTr = null;
	
	function _setConfigSelectTr($tr) {
		if(_$selectedGwansimTr) {
			_$selectedGwansimTr.css('background', '#fff');
		}
		
		$tr.css('background', '#f5f5f5');
		_$selectedGwansimTr = $tr;
	}
	
	function _createMap(id, lat, lng) {
		var mapOptions = {
		    center: new naver.maps.LatLng(lat, lng),
		    zoom: 10
		};

		var map = new naver.maps.Map(id, mapOptions);
		_createMarker(map, lat, lng);
	}
	
	function _createMarker(map, lat, lng) {
		var marker = new naver.maps.Marker({
		    position: new naver.maps.LatLng(lat, lng),
		    clickable:false,
		    map: map
		});
	}
	
	mypage.init = function() {
		_initAccount();
		_initGwansimMulgeon();
	}
	
	/************************************************
	 * 계정정보
	 ***********************************************/
	var _$mypageAccPw,
		_$mypageAccPwConfirm,
		_$mypageAccUserName,
		_$mypageAccUserEmail,
		_$mypageAccUserEmail2,
		_$mypageAccUserPhoneF,
		_$mypageAccUserPhoneM,
		_$mypageAccUserPhoneL,
		_$btnAccModifyAccount,
		_mypageAccTxtElements,
		_$hdnEmail;
	
	function _initAccount() {
		_$mypageAccPw = $('#mypageAccPw'),
		_$mypageAccPwConfirm = $('#mypageAccPwConfirm'),
		_$mypageAccUserName = $('#mypageAccUserName'),
		_$mypageAccUserEmail = $('#mypageAccUserEmail'),
		_$mypageAccUserEmail2 = $('#mypageAccUserEmail2'),
		_$mypageAccUserPhoneF = $('#mypageAccUserPhoneF'),
		_$mypageAccUserPhoneM = $('#mypageAccUserPhoneM'),
		_$mypageAccUserPhoneL = $('#mypageAccUserPhoneL'),
		_$btnAccModifyAccount = $('#btnAccModifyAccount'),
		_mypageAccTxtElements = ['#mypageAccUserName', '#mypageAccUserEmail', '#mypageAccUserPhoneM', '#mypageAccUserPhoneL', '#mypageAccUserEmail2'],
		_$hdnEmail = $('#hdnEmail');
		
		_initEmail();
		
		_$btnAccModifyAccount
		.off('click')
		.on('click', function() {
			
			if(_isValidAccountForm()) {
				hotplace.validation.ctrlValidMsg(_$mypageAccPw, false, '.FORMAT');
				hotplace.ajax({
					url: 'user/modify',
					data: JSON.stringify({
						userName: _$mypageAccUserName.val(),
						password: _$mypageAccPw.val(),
						phone: _$mypageAccUserPhoneF.val() + '-' + _$mypageAccUserPhoneM.val() + '-' + _$mypageAccUserPhoneL.val(),
						email: (_$mypageAccUserEmail2.val() == 'D') ? _$mypageAccUserEmail.val() : _$mypageAccUserEmail.val() + '@' + _$mypageAccUserEmail2.val()
					}),
					contentType: 'application/json; charset=UTF-8',
					success: function(data, textStatus, jqXHR) {
						if(data.success) {
							hotplace.dom.showAlertMsg(null, '상담이 신청되었습니다', {width:'400px'});
						}
						else {
							hotplace.dom.showAlertMsg(null, '오류가 발생했습니다', {width:'400px'});
						}
					}
				})
			}
		});
	}
	
	function _initEmail() {
		_$mypageAccUserEmail.val(_$hdnEmail.val());
	}
	
	function _checkMailFormat() {
		return hotplace.validation.isValidEmail(_$mypageAccUserEmail, _$mypageAccUserEmail2.val());
	}
	
	function _checkPhoneM() {
		return hotplace.validation.isValidPhoneM(_$mypageAccUserPhoneM);
	}
	
	function _checkPhoneL() {
		return hotplace.validation.isValidPhoneL(_$mypageAccUserPhoneL);
	}
	
	function _checkAccEmpty() {
		return hotplace.validation.isFormNotEmpty(_mypageAccTxtElements);
	}
	
	function _checkPwConfirm() {
		
		var v = true;
		
		if($.trim(_$mypageAccPw.val()) == $.trim(_$mypageAccPwConfirm.val())) {
			hotplace.validation.ctrlValidMsg(_$mypageAccPwConfirm, false, '.CONFIRM');
		}
		else {
			hotplace.validation.ctrlValidMsg(_$mypageAccPwConfirm, true, '.CONFIRM');
			v = false;
		}
		
		return v;
	}
	
	function _checkPwFormat() {
		if($.trim(_$mypageAccPw.val()) == '') return true;
		return hotplace.validation.isPasswordFormat(_$mypageAccPw);
	}
	
	function _isValidAccountForm() {
		if(_checkAccEmpty()
			&& _checkPwConfirm()
			&& _checkPwFormat()
			&& _checkMailFormat()
			&& _checkPhoneM()
			&& _checkPhoneL()) {
			return true;
		}
		return false;
	}
	
	/************************************************
	 * 관심물건
	 ***********************************************/
	var _btnGwansimModify = '#btnGwansimModify',
		_txtMypageGwansimMemo = '#txtMypageGwansimMemo';
	
	function _checkGwansimEmpty() {
		return hotplace.validation.isFormNotEmpty([_txtMypageGwansimMemo]);
	}
	
	function _initGwansimMulgeon() {
		$(_tabMypageGwansimMulgeon + ' table tr')
		.not('.NO-DATA')
		.off('click')
		.on('click', function(e) {
			var $tr = $(this);
			_setConfigSelectTr($tr);
			console.log(e);
			
			hotplace.dom.showMypageGwansimPop($tr.data('key'), function() {
				_createMap('dvGwansimMap', $tr.data('lat'), $tr.data('lng'));
				$(_btnGwansimModify)
				.off('click')
				.on('click', function() {
					if(_checkGwansimEmpty()) {
						hotplace.ajax({
							url: 'spot/mod/gwansim',
							data: {
								gwansimNum: $tr.data('key'),
								memo: $(_txtMypageGwansimMemo).val().trimTS()
							},
							success: function(data, textStatus, jqXHR) {
								if(data.success) {
									hotplace.dom.showAlertMsg(null, '관심물건이 수정되었습니다.', {width:'40%'});
								}
								else {
									jqXHR.errCode = hotplace.error.GWANSIM_MOD;
								}
							},
							error: function(jqXHR, textStatus, e) {
								jqXHR.errCode = hotplace.error.GWANSIM_MOD;
							}
						})
					}
				})
				
			});
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
	
	hotplace.validation.phone(_tabMypageAccount + ' .NUMBER_ONLY')
}(
	hotplace.mypage = hotplace.mypage || {},
	jQuery
));