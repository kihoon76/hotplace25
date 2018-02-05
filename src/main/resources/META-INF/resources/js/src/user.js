$(document).ready(function() {
	var _login_BTN = '#btnLogin',
		_login_BTN_Join = '#joinBtn', //로그인 폼에서 회원가입링크 id
		_join_BTN_Login = '#btnStep04Login',
		_joinStep01 = '#joinStep01',
		_joinStep02 = '#joinStep02',
		_joinStep03 = '#joinStep03',
		_joinStep04 = '#joinStep04',
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
		
		_joinStep03_SPN_UserId = '#joinStep03Id',
		_joinStep03_SPN_Pw = '#joinStep03Pw',
		_joinStep03_SPN_UserName = '#joinStep03Name',
		_joinStep03_SPN_UserEmail = '#joinStep03Email',
		_joinStep03_SPN_UserPhone = '#joinStep03Phone',
		
		_joinBox = '.joinBox',
		_joinStep01_BTN_Next = '#btnJoinStep01Next',
		_joinStep02_BTN_Prev = '#btnJoinStep02Prev',
		_joinStep02_BTN_Next = '#btnJoinStep02Next',
		_joinStep03_BTN_Cancel = '#btnStep03Cancel',
		_joinStep03_BTN_Ok = '#btnStep03Ok';

	var _doCheckJoinID = false;
	var _checkedJoinID = '';
	var _joinStep02TxtElements = [
	    _joinStep02_TXT_UserId,
	    _joinStep02_TXT_Pw,
	    _joinStep02_TXT_PwConfirm,
	    _joinStep02_TXT_UserName,
	    _joinStep02_TXT_UserEmail,
	    _joinStep02_TXT_UserPhoneM,
	    _joinStep02_TXT_UserPhoneL],
	    _joinData = null;
	
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
		if(_checkEmpty()
			&& _checkDupId()
			&& _checkPwConfirm()
			&& _checkSelectMail()
			&& _checkPhoneM()
			&& _checkPhoneL()) {
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
			v = _checkMailFormat($joinStep02_SEL_UserEmail.val());
		}
		else {
			_ctrlValidMsg($joinStep02_SEL_UserEmail, true, '.SELECT');
			v = false;
		}
		
		return v;
		
	}
	
	function _checkMailFormat(selV, mailV) {
		var v = true;
		var $joinStep02_TXT_UserEmail = $(_joinStep02_TXT_UserEmail);
		var re = (selV == 'D') ? /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))$/; 
		
		v = re.test($joinStep02_TXT_UserEmail.val());
		if(v) {
			_ctrlValidMsg($joinStep02_TXT_UserEmail, false, '.FORMAT');
		}
		else {
			_ctrlValidMsg($joinStep02_TXT_UserEmail, true, '.FORMAT');
		}
		
		return v;
	}
	
	function _checkPhoneM() {
		var v = true;
		var $joinStep02_TXT_UserPhoneM = $(_joinStep02_TXT_UserPhoneM);
		var phoneM = $.trim($joinStep02_TXT_UserPhoneM.val());
		var phoneM_len = phoneM.length;
		try {
			if(phoneM_len >=3 && phoneM_len <=4) {
				phoneM = parseInt(phoneM);
				_ctrlValidMsg($joinStep02_TXT_UserPhoneM, false, '.PHONE_M');
			}
			else {
				v = false;
				_ctrlValidMsg($joinStep02_TXT_UserPhoneM, true, '.PHONE_M');
			}
		}
		catch(e) {
			v = false;
			_ctrlValidMsg($joinStep02_TXT_UserPhoneM, true, '.PHONE_M');
		}
		
		return v;
	}
	
	function _checkPhoneL() {
		var v = true;
		var $joinStep02_TXT_UserPhoneL = $(_joinStep02_TXT_UserPhoneL);
		var phoneL = $.trim($joinStep02_TXT_UserPhoneL.val());
		var phoneL_len = phoneL.length;
		try {
			if(phoneL_len == 4) {
				phoneL = parseInt(phoneL);
				_ctrlValidMsg($joinStep02_TXT_UserPhoneL, false, '.PHONE_L');
			}
			else {
				v = false;
				_ctrlValidMsg($joinStep02_TXT_UserPhoneL, true, '.PHONE_L');
			}
		}
		catch(e) {
			v = false;
			_ctrlValidMsg($joinStep02_TXT_UserPhoneL, true, '.PHONE_L');
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
		$(_joinStep03_SPN_UserId).text($(_joinStep02_TXT_UserId).val());
		$(_joinStep03_SPN_Pw).text(hotplace.util.maskAll($(_joinStep02_TXT_Pw).val()));
		$(_joinStep03_SPN_UserName).text($(_joinStep02_TXT_UserName).val());
		$(_joinStep03_SPN_UserEmail).text(hotplace.util.getEmail($(_joinStep02_TXT_UserEmail), $(_joinStep02_SEL_UserEmail)));
		$(_joinStep03_SPN_UserPhone).text(
			$(_joinStep02_SEL_UserPhoneF).val() + '-' + $(_joinStep02_TXT_UserPhoneM).val() + '-' + $(_joinStep02_TXT_UserPhoneL).val()
		);
		
		_joinData = {
			id: $(_joinStep02_TXT_UserId).val(),
			userName: $(_joinStep02_TXT_UserName).val(),
			password: $(_joinStep02_TXT_Pw).val(),
			phone: $(_joinStep03_SPN_UserPhone).text(),
			email: $(_joinStep03_SPN_UserPhone).text()
		}
	}
	
	function _reset() {
		_resetJoinStep01();
		_resetJoinStep02();
		_resetJoinStep03();
	}
	
	function _resetJoinStep01() {
		$(_joinStep01_CHK_YaggwanAgree).each(function() {
			this.checked = false;
		});
	}
	
	function _resetJoinStep02() {
		_doCheckJoinID = false;
		_checkedJoinID = '';
		
		for(var i=_joinStep02TxtElements.length-1; i>=0; i--) {
			$(_joinStep02TxtElements[i]).val('');
		}
		
		$(_joinStep02_SEL_UserEmail).val('X');
		$(_joinStep02_SEL_UserPhoneF).val('010');
		
		$('#joinStep02 .helpCont').css('display', 'none');
	}
	
	function _resetJoinStep03() {
		$(_joinStep03_SPN_UserId).text('');
		$(_joinStep03_SPN_Pw).text('');
		$(_joinStep03_SPN_UserName).text('');
		$(_joinStep03_SPN_UserEmail).text('');
		$(_joinStep03_SPN_UserPhone).text('');
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
			_initJoinStep03();
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
	
	//회원가입 Step03(가입 정보확인) 확인버튼버튼
	$(document).on('click', _joinStep03_BTN_Ok, function() {
		hotplace.ajax({
			url: 'user/join',
			data: JSON.stringify(_joinData),
			contentType: 'application/json; charset=UTF-8',
			success: function(data, textStatus, jqXHR) {
				if(data.success) {
					_reset();
					$(_joinBox).hide();
					$(_joinStep04).show();
				}
				else {
					jqXHR.errCode = hotplace.error.JOIN;
				}
			},
			error: function(jqXHR, textStatus, e) {
				jqXHR.errCode = hotplace.error.JOIN;
			}
		})
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
					hotplace.dom.closeModal();
					hotplace.dom.toggleLogin();
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
		hotplace.dom.showJoinForm({width: 600}, function() {
			_reset();
		});
	});
	
	//로그인버튼 (회원가입폼이  로그인 모달로 교체)
	$(document).on('click', _join_BTN_Login, function() {
		hotplace.dom.showLoginForm('IN');
	});

	$(document).on('keydown', '#pw', function(e) {
		if (e.which == 13) {
			var txt = e.target.value;
			$(_btnLoginId).trigger('click'); 
	    }
	});
	
	hotplace.validation.phoneMiddle('#joinStep02 .NUMBER_ONLY')
});