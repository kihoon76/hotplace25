/**
 * @namespace hotplace.util
 * */
(function(util, $) {
	util.maskAll = function(val, shape) {
		var s = '';
		var len = val.length;
		shape = shape || '#';
		
		if(len) {
			for(var i=0; i<len; i++) {
				s += shape;
			}
		}
		
		return s;
	}
	
	util.getEmail = function($txt, $sel) {
		var selV = $sel.val();
		if(selV == 'D') {
			return $txt.val();
		}
		
		return $txt.val() + '@' + selV;
	}
	
	
	/**
	 * @memberof hotplace.util
     * @function isEmailValidFormat
     * @param {string} selV select선택값 - 선택하세요:X, 직접입력:D
     * @returns {boolean}
     */
	util.isEmailValidFormat = function(txtEmail, selV) {
		if(selV == 'X') throw new Error('올바른 이메일 선택값이 아닙니다.');
		var re = (selV == 'D') ? /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/ : /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))$/; 
		return re.test(txtEmail);
	}
	
	util.isNotEmptyForm = function(obj, alrtSize) {
		if(!obj) return false;
		//empty check
		for(var el in obj) {
			if($.trim($(el).val()) == '') {
				hotplace.dom.showAlertMsg(function() {
					$(el).focus();
				}, obj[el].msg, alrtSize || {width:'300px'});
				
				return false;
			}
		}
		
		return true;
	}
	
	util.getEmailOptions = function() {
		var options = [];
		
		options.push('<option value="X">== 선택하세요 ==</option>');
		options.push('<option value="naver.com">naver.com</option>');
		options.push('<option value="daum.net">daum.net</option>');
		options.push('<option value="nate.com">nate.com</option>');
		options.push('<option value="hotmail.com">hotmail.com</option>');
		options.push('<option value="yahoo.com">yahoo.com</option>');
		options.push('<option value="empas.com">empas.com</option>');
		options.push('<option value="korea.com">korea.com</option>');
		options.push('<option value="dreamwiz.com">dreamwiz.com</option>');
		options.push('<option value="gmail.com">gmail.com</option>');
		options.push('<option value="D">직접입력</option>');
		
		
		return options.join('');
	}
	
	util.getPhoneOptions = function() {
		var options = [];
		
		options.push('<option value="010" selected>010</option>');
		options.push('<option value="016">016</option>');
		options.push('<option value="017">017</option>');
		options.push('<option value="018">018</option>');
		options.push('<option value="019">019</option>');
		options.push('<option value="02">02</option>');
		options.push('<option value="031">031</option>');
		options.push('<option value="032">032</option>');
		options.push('<option value="033">033</option>');
		options.push('<option value="041">041</option>');
		options.push('<option value="042">042</option>');
		options.push('<option value="043">043</option>');
		options.push('<option value="044">044</option>');
		options.push('<option value="051">051</option>');
		options.push('<option value="052">052</option>');
		options.push('<option value="053">053</option>');
		options.push('<option value="054">054</option>');
		options.push('<option value="055">055</option>');
		options.push('<option value="061">061</option>');
		options.push('<option value="062">062</option>');
		options.push('<option value="063">063</option>');
		options.push('<option value="064">064</option>');
		options.push('<option value="0502">0502</option>');
		options.push('<option value="0504">0504</option>');
		options.push('<option value="0505">0505</option>');
		options.push('<option value="0506">0506</option>');
		options.push('<option value="0507">0507</option>');
		options.push('<option value="070">070</option>');
		
		
		return options.join('');
	}
	
	function _getCodeStr(code, val) {
		for(var key in code) {
			if(code[key].value == val) {
				return code[key].name;
			}
		}
		
		throw new Error(val + ' is not valid');
	}
	
	util.getJiyeokStr = function(val) {
		return _getCodeStr(hotplace.config.codes.jiyeok, val);
	}
	
	util.getJimokStr = function(val) {
		return _getCodeStr(hotplace.config.codes.jimok, val);
	}
	
	util.getMaegakGubunStr = function(val) {
		if(val) {
			switch(val) {
			case 'G':
				val = '공매';
				break;
			case 'K':
				val = '경매';
				break;
			case 'A':
				val = '경매,공매';
				break;
			}
		}
		
		return val;
	}
	
	util.getBosangPyeonibGubunStr = function(val) {
		if(val) {
			switch(val) {
			case 'B':
				val = '보상';
				break;
			case 'P':
				val = '편입';
				break;
			case 'A':
				val = '보상,편입';
				break;
			}
		}
		
		return val;
	}
}(
	hotplace.util = hotplace.util || {},
	jQuery
));