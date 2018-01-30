/**
 * @namespace hotplace.login
 */
(function(login, $) {
	var _btnLoginId = '#btnLogin',
		_btnJoinId = '#joinBtn'; //로그인 폼에서 회원가입링크 id

	
	function _checkYaggwanAgree(fn) {
		var v = true;
		
		$('#dvLoginJoin .tos input[type=checkbox]').each(function() {
			if(!$(this).is(':checked')) {
				v = false;
				return false;
			}
		})
		.promise()
		.done(function() {
			if(fn) fn(v);
		});;
	}
	
	$(document).on('change', '#joinStep01 .rdchBox > input[type="checkbox"]', function() {
		console.log('ppppppppppppppppp')
	});
	
	//로그인 버튼
	$(document).on('click', _btnLoginId, function() {
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
	$(document).on('click', _btnJoinId, function() {
		hotplace.dom.showJoinForm({width: 600});
	});

	$(document).on('keydown', '#pw', function(e) {
		if (e.which == 13) {
			var txt = e.target.value;
			$(_btnLoginId).trigger('click'); 
	    }
	});
}(
		hotplace.login = hotplace.login || {},
		jQuery
));