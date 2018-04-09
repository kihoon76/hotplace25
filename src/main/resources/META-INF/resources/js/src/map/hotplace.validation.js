/**
 * @namespace hotplace.validation
 * */
(function(validation, $) {
	
	$(document).on('focus', '.readonly', function() {
		$(this).trigger('blur')
	});
	
	//숫자관련 제한 공통함수
	function _digitKeyLimit(selector, regEx, isComma, blurFn) {
		$(document).on('keyup', selector, function(e) {
			if (!(e.keyCode >=37 && e.keyCode<=40)) {
				$(this).val( $(this).val().replace(regEx, '') );
				
			}
			
			if(isComma) {
				var v = $(this).val();
				v = v.replace(/,/gm, '');
				$(this).val(v.money());
			}
		});
		
		//tab키 눌렀을 때 버그로 인해서 blur이후 다시 설정, max 점검
		$(document).on('blur', selector, function(e) {
			//max 점검
			var maxObj = $(this).data('max');
			var suffix = $(this).data('suffix');
			var step = $(this).data('step');
			
			$(this).val($(this).val().replace(regEx,''));
			var v = $(this).val();
			v = v.replace(/,/gm, '');
			
			if(suffix != undefined) {
				v = v.replace(new RegExp(suffix, 'ig'), '');
			}
			
			var fIdx = v.indexOf('.');
			//소수점 있을 경우 
			if(fIdx > -1) {
				v = v.replace(/\./gm, '');
				v = v.slice(0, fIdx) + '.' + v.slice(fIdx);
				
				//입력을 5...이런식으로 했을경우
				if(v.length - 1 == v.lastIndexOf('.')) {
					v = v + '0';
				}
				
				v = parseFloat(v).toFixed((step.toString().split('.'))[1].length);
			}
			
			if(maxObj != undefined) {
				if(parseFloat(v) > parseFloat(maxObj)) {
					v = $(this).data('value');
				}
			}
			
			//전부 지웠을 경우 원래값 복원
			if(v == '') {
				v = $(this).data('value');
			}
			else {
				$(this).data('value', v);
			}
			
			if(isComma) {
				v = v.toString().money(); 
			}
			
			$(this).val(v + (suffix || ''));
			if(blurFn) blurFn($(this));
			
			//spinner textbox일 경우
			//var $next = $(this).next();
			var $spinnerDiv = $(this).siblings('div.btn-vertical');
			var fnStr = $spinnerDiv.data('fn');
			if(fnStr != undefined) hotplace.calc.sujibunseog[fnStr]();
			
			
		});
	}
	
	/**
	 * @memberof hotplace.validation
	 * @function numberOnly
	 * @param {string} selector jquery selector
	 * @desc text 숫자만 입력되게 함
	 */
	validation.numberOnly = function(selector, blurFn) {
		_digitKeyLimit(selector, /[^0-9]/gi, true, blurFn);
	}
	
	validation.phone = function(selector) {
		_digitKeyLimit(selector, /[^0-9]/gi, false);
	}
	
	/**
	 * @memberof hotplace.validation
	 * @function numberNdot
	 * @param {string} selector jquery selector
	 * @desc text 숫자와 . 입력되게 함
	 */
	validation.numberNdot = function(selector, blurFn) {
		_digitKeyLimit(selector, /[^0-9|\.]/gi, true, blurFn);
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
	
	function _isValidPhoneDigit(type, len) {
		if(type == 'M') {
			return len >=3 && len <=4;
		}
		else if(type == 'L'){
			return len == 4;
		}
		else {
			return false;
		}
	}
	
	function _isValidPhone($phone, type) {
		var v = true;
		var phone = $.trim($phone.val());
		var phone_len = phone.length;
		try {
			if(_isValidPhoneDigit(type, phone_len)) {
				phone = parseInt(phone);
				_ctrlValidMsg($phone, false, '.PHONE_' + type);
			}
			else {
				v = false;
				_ctrlValidMsg($phone, true, '.PHONE_' + type);
			}
		}
		catch(e) {
			v = false;
			_ctrlValidMsg($phone, true, '.PHONE_' + type);
		}
		
		return v;
	}
	
	validation.ctrlValidMsg = _ctrlValidMsg;
	
	validation.isValidPhoneM = function($phoneM) {
		return _isValidPhone($phoneM, 'M');
	}
	
	validation.isValidPhoneL = function($phoneL) {
		return _isValidPhone($phoneL, 'L');
	}
	
	validation.isValidEmail = function($txtMail, selV) {
		var v = true;
		var re = (selV == 'D') ? /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))$/; 
		
		v = re.test($txtMail.val());
		if(v) {
			_ctrlValidMsg($txtMail, false, '.FORMAT');
		}
		else {
			_ctrlValidMsg($txtMail, true, '.FORMAT');
		}
		
		return v;
	}
	
	validation.isFormNotEmpty = function(arr) {
		if(!arr) return false;
		
		var v = true;
		var arrVal;
		var isInput = false;
		
		for(var i=arr.length-1; i>=0; i--) {
			arrVal = $(arr[i]).val();
			isInput = $(arr[i])[0].nodeName.toLowerCase() == 'input' || $(arr[i])[0].nodeName.toLowerCase() == 'textarea';
			if($.trim(arrVal) == '' || arrVal == 'X') {
				_ctrlValidMsg($(arr[i]), true, isInput ? '.EMPTY' : '.SELECT');
				v = false;
			}
			else {
				_ctrlValidMsg($(arr[i]), false, isInput ? '.EMPTY' : '.SELECT');
			}
		}
		
		return v;
	}
	
	validation.isPasswordFormat = function($txtPw) {
		var v = true;
		var re = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
		
		v = re.test($txtPw.val());
		if(v) {
			_ctrlValidMsg($txtPw, false, '.FORMAT');
		}
		else {
			_ctrlValidMsg($txtPw, true, '.FORMAT');
		}
		
		return v;
	}
	
	
}(
	hotplace.validation = hotplace.validation || {},
	jQuery
));