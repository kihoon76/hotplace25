/**
 * @namespace hotplace.login
 */
(function(user, $) {
	var _login_BTN = '#btnLogin',
		_login_BTN_Join = '#joinBtn', //로그인 폼에서 회원가입링크 id
		_joinStep01 = '#joinStep01',
		_joinStep02 = '#joinStep02',
		_joinStep03 = '#joinStep03',
		_joinStep01_CHK_YaggwanAgree = '.YAGGWAN_AGREE',
		_joinStep02_TXT_UserId = '#joinUserId',
		_joinStep02_TXT_Pw = '#joinPw',
		_joinStep02_TXT_PwConfirm = '#joinPwConfirm',
		_joinStep02_TXT_UserName = '#joinUserName',
		_joinStep02_TXT_UserEmail = '#joinUserEmail',
		_joinStep02_SEL_UserEmail = '#joinUserEmail2',
		_joinStep02_SEL_UserPhoneF = '#joinUserPhoneF',
		_joinStep02_TXT_UserPhoneM = '#joinUserPhoneM',
		_joinStep02_TXT_UserPhoneL = '#joinUserPhoneL',
		_joinStep02_BTN_IdCheck = '#btnJoinIdCheck',
		_joinBox = '.joinBox',
		_joinStep01_BTN_Next = '#btnJoinStep01Next',
		_joinStep02_BTN_Prev = '#btnJoinStep02Prev',
		_joinStep02_BTN_Next = '#btnJoinStep02Next',
		_joinStep03_BTN_Cancel = '#btnStep03Cancel';

	var _doCheckJoinID = false;
	var _checkedJoinID = '';
	var _joinStep02TxtElements = [
	    _joinStep02_TXT_UserId,
	    _joinStep02_TXT_Pw,
	    _joinStep02_TXT_PwConfirm,
	    _joinStep02_TXT_UserName,
	    _joinStep02_TXT_UserEmail,
	    _joinStep02_TXT_UserPhoneM,
	    _joinStep02_TXT_UserPhoneL];
	
	function _checkYaggwanAgree(fn) {
		var v = true;
		
		$(_joinStep01_CHK_YaggwanAgree).each(function() {
			var required = $(this).data('required');
			if(required == 'Y' && !$(this).is(':checked')) {
				v = false;
				return false;
			}
		})
		.promise()
		.done(function() {
			if(fn) fn(v);
		});
	}
	
	function _isValidJoinForm() {
		if(/*_checkEmpty() && _checkDupId() && _checkPwConfirm() &&*/ _checkSelectMail()) {
			return true;
		}
		return false;
	}
	
	function _checkEmpty() {
		var $txt = null;
		var isValid = true;
		
		for(var i=_joinStep02TxtElements.length-1; i>=0; i--) {
			$txt = $(_joinStep02TxtElements[i]);
			if(_isEmptyTxt($txt)) {
				_ctrlValidMsg($txt, true)
				isValid = false;
			}
			else {
				_ctrlValidMsg($txt, false)
			}
		}
		
		return isValid;
	}
	
	function _checkDupId() {
		var v = true;
		var $joinStep02_TXT_UserId = $(_joinStep02_TXT_UserId);
		if(_doCheckJoinID && _checkedJoinID == $.trim($joinStep02_TXT_UserId.val())) {
			_ctrlValidMsg($joinStep02_TXT_UserId, false, '.DUP');
		}
		else {
			_ctrlValidMsg($joinStep02_TXT_UserId, true, '.DUP');
			v = false;
		}
		
		return v;
	}
	
	function _checkPwConfirm() {
		var $joinStep02_TXT_Pw = $(_joinStep02_TXT_Pw);
		var $joinStep02_TXT_PwConfirm = $(_joinStep02_TXT_PwConfirm);
		var v = true;
		
		if($.trim($joinStep02_TXT_Pw.val()) == $.trim($joinStep02_TXT_PwConfirm.val())) {
			_ctrlValidMsg($joinStep02_TXT_PwConfirm, false, '.CONFIRM');
		}
		else {
			_ctrlValidMsg($joinStep02_TXT_PwConfirm, true, '.CONFIRM');
			v = false;
		}
		
		return v;
	}
	
	function _checkSelectMail() {
		var v = true;
		var $joinStep02_SEL_UserEmail = $(_joinStep02_SEL_UserEmail);
		
		if($joinStep02_SEL_UserEmail.val() != 'X') {
			_ctrlValidMsg($joinStep02_SEL_UserEmail, false, '.SELECT');
		}
		else {
			_ctrlValidMsg($joinStep02_SEL_UserEmail, true, '.SELECT');
			v = false;
		}
		
		return v;
		
	}
	
	function _ctrlValidMsg($el, visible, type) {
		var value = visible ? 'block' : 'none';
		type = type || '.EMPTY';
		//GROUP인지 검사
		if($el.parent().hasClass('inputGroup')) {
			$el.parent().siblings(type).css('display', value);
		}
		else {
			$el.siblings(type).css('display', value);
		}
	}
	
	function _isEmptyTxt($element) {
		if($.trim($element.val()) == '') return true;
		return false;
	}
	
	
	function _initJoinStep03() {
		
	}
	
	function _reset() {
		_doCheckJoinID = false;
		_checkedJoinID = '';
	}
	
	user.removeDuplicatedID = function() {
		$(_joinStep02_TXT_UserId).val('').focus();
	}
	
	//회원가입 약관 동의체크
	$(document).on('change', _joinStep01_CHK_YaggwanAgree, function() {
		var $joinStep01_BTN_Next = $(_joinStep01_BTN_Next);
		_checkYaggwanAgree(function(result) {
			if(result) {
				if($joinStep01_BTN_Next.is(':disabled')) {
					$joinStep01_BTN_Next.removeAttr('disabled');
				}
			}
			else {
				$joinStep01_BTN_Next.prop('disabled', true);
			}
		});
	});
	
	//회원가입 Step01 동의 하단 다음버튼
	$(document).on('click', _joinStep01_BTN_Next, function() {
		$(_joinBox).hide();
		$(_joinStep02).show();
	});
	
	//회원가입 Step02(정보입력) 이전버튼
	$(document).on('click', _joinStep02_BTN_Prev, function() {
		$(_joinBox).hide();
		$(_joinStep01).show();
	});
	
	//회원가입 Step02(정보입력) 다음버튼
	$(document).on('click', _joinStep02_BTN_Next, function() {
		if(_isValidJoinForm()) {
			$(_joinBox).hide();
			$(_joinStep03).show();
		}
	});
	
	//회원가입 Step03(가입 정보확인) 취소버튼
	$(document).on('click', _joinStep03_BTN_Cancel, function() {
		_reset();
		$(_joinBox).hide();
		$(_joinStep02).show();
	});
	
	//아이디 중복체크
	$(document).on('click', _joinStep02_BTN_IdCheck, function() {
		var id = $(_joinStep02_TXT_UserId).val();
		hotplace.ajax({
			url: 'user/checkId?id=' + id,
			method: 'GET',
			success: function(data, textStatus, jqXHR) {
				if(data.success) {
					if(data.errCode == hotplace.error.DUP_ID) {
						jqXHR.errCode = data.errCode;
					}
					else {
						_doCheckJoinID = true;
						_checkedJoinID = id;
						_ctrlValidMsg($(_joinStep02_TXT_UserId), false, '.DUP');
					}
				}
				console.log(data);
			}
		});
	});
	
	//로그인 버튼
	$(document).on('click', _login_BTN, function() {
		var id = $('#id').val(),
			pw = $('#pw').val();
		
		hotplace.ajax({
			url: 'login',
			method: 'POST',
			dataType: 'text',
			data: $('#loginFm').serialize(),
			success: function(data, textStatus, jqXHR) {
				var jo = $.parseJSON(data);
				if(jo.success) {
					//var r = (hotplace.dom.getCurrentFnAfterModalClose())(true);
					//var $menuBtn = $('#' + hotplace.dom.getMenuBtn().USER_LOGIN);
					
					//_changeLoginMenu($menuBtn);
					hotplace.dom.closeModal();
					
					//hotplace.minimaps.bindData(hotplace.maps.getMap(), 3);
				}
				else {
					jqXHR.errCode = jo.errCode;
				}
			},
			error: function(data, textStatus, jqXHR) {
				console.log(data)
			}
		});
	});
	
	//회원가입 버튼 (로그인폼이 회원가입 모달로 교체)
	$(document).on('click', _login_BTN_Join, function() {
		hotplace.dom.showJoinForm({width: 600});
	});

	$(document).on('keydown', '#pw', function(e) {
		if (e.which == 13) {
			var txt = e.target.value;
			$(_btnLoginId).trigger('click'); 
	    }
	});
	
	hotplace.validation.phoneMiddle('#joinStep02 .NUMBER_ONLY')
}(
		hotplace.user = hotplace.user || {},
		jQuery
));