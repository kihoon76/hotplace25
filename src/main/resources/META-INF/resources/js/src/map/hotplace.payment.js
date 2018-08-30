/**
 * @namespace hotplace.payment
 */
(function(payment, $) {
	
	var _dvPayment = '#dvPayment',
		_rdoPayment = _dvPayment + ' input[name=payment]:radio',
		_rdoPaymentAll = _dvPayment + ' input[name=paymentAll]:radio',
		_rdoPaymentType = _dvPayment + ' input[name=paymentType]:radio',
		_txtPaymentSum = '#txtPaymentSum',
		_txtDepositor = '#txtDepositor',
		_chkPaymentTooja = '#chkPaymentTooja',
		_chkPaymentGG = '#chkPaymentGG',
		_chkPaymentMulgeon = '#chkPaymentMulgeon',
		_chkPaymentHeatmap = '#chkPaymentHeatmap',
		_btnPayment = '#btnPayment',
		_txtCoupon = '#txtCoupon',
		_btnCoupon = '#btnCoupon',
		_btnPaymentInfo = '#btnPaymentInfo',
		_chkCoupon = '#chkCoupon',
		_chksYaggwan = '.YAGGWAN_AGREE_PAYMENT',
		_ifmInicis = '#ifmInicis',
		_trDepositorInPayment = '#trDepositorInPayment',
		_trPaymentMethod = '#trPaymentMethod',
		_tooltipHtml = '',
		_rdoPaymentAllYear = '#rdoPaymentAllYear',  //전체서비스 연간결제 라디오버튼
		_rdoCardPayment = '#rdoCardPayment',	    //결제방법 카드
		_$rdoPayment = null,
		_$rdoPaymentAll = null,
		_$rdoPaymentType = null,
		_$chkCoupon = null,
		_$txtPaymentSum = null,
		_$chkPaymentTooja = null,
		_$chkPaymentGG = null,
		_$chkPaymentMulgeon = null,
		_$chkPaymentHeatmap = null,
		_$trDepositorInPayment = null,
		_$trPaymentMethod = null,
		_$rdoPaymentAllYear = null,
		_$rdoCardPayment = null,
		_$btnPayment = null,
		_isAll = null;
	
	function _sum(type, value) {
		var sum;
		
		if(type == 'ALL') {
			sum = (value == undefined) ? $(_rdoPaymentAll + ':checked').val() : value;
		}
		else {
			sum = 0;
		}
		
		//_$txtPaymentSum.data('value', sum);
		//_$txtPaymentSum.val(sum.toString().money() + '원');
		
		_sumCoupon(sum);
	}
	
	function _checkedSum($chk, val) {
		var sum = _$txtPaymentSum.data('value');
		
		if($chk.is(':checked')) {
			sum += parseInt(val, 10);
		}
		else {
			sum -= parseInt(val, 10);
		}
		
		//_$txtPaymentSum.data('value', sum);
		//_$txtPaymentSum.val(sum.toString().money() + '원');
		
		_sumCoupon(sum);
	}
	
	function _getPaymentParam() {
		var param = {};
		var serviceSubType = [];
		
		param.serviceType = $(_rdoPayment + ':checked').val();
		if(param.serviceType == 'ALL') {
			serviceSubType.push($(_rdoPaymentAll + ':checked').data('type'));
		}
		else {
			if(_$chkPaymentTooja.is(':checked')) serviceSubType.push(_$chkPaymentTooja.data('type'));
			if(_$chkPaymentGG.is(':checked')) serviceSubType.push(_$chkPaymentGG.data('type'));
			if(_$chkPaymentMulgeon.is(':checked')) serviceSubType.push(_$chkPaymentMulgeon.data('type'));
			if(_$chkPaymentHeatmap.is(':checked')) serviceSubType.push(_$chkPaymentHeatmap.data('type'));
		}
		
		param.serviceSubTypes = serviceSubType.join(',');
		param.sum = _$txtPaymentSum.data('totalValue'); 
		param.couponNum = _couponInfo.couponNum || '0';
		param.depositor = _$txtDepositor.val();
		
		return param;
	}
	
	function _checkPopupCard() {
		var param = {};
		if(hotplace.browser.chrome) {
			param.browser = 'chrome';
		}
		else if(hotplace.browser.msedge) {
			param.browser = 'edge';
		}
		else if(hotplace.browser.msie) {
			param.browser = 'msie';
		}
		else {
			param.browser = 'other';
		}
		
		hotplace.dom.showPopupAlarmForm(param, _inicisCardPayment);
	}
	
	payment.popupNotice = function(fn) {
		$('#noticePopup').skippr();
	}
	
	function _payment() {
//		var param = {};
//		var serviceSubType = [];
//		
//		param.serviceType = $(_rdoPayment + ':checked').val();
//		if(param.serviceType == 'ALL') {
//			serviceSubType.push($(_rdoPaymentAll + ':checked').data('type'));
//		}
//		else {
//			if(_$chkPaymentTooja.is(':checked')) serviceSubType.push(_$chkPaymentTooja.data('type'));
//			if(_$chkPaymentGG.is(':checked')) serviceSubType.push(_$chkPaymentGG.data('type'));
//			if(_$chkPaymentMulgeon.is(':checked')) serviceSubType.push(_$chkPaymentMulgeon.data('type'));
//			if(_$chkPaymentHeatmap.is(':checked')) serviceSubType.push(_$chkPaymentHeatmap.data('type'));
//		}
//		
//		param.serviceSubTypes = serviceSubType.join(',');
//		param.sum = _$txtPaymentSum.data('totalValue');
//		param.couponNum = _couponInfo.couponNum || '0';
//		param.depositor = _$txtDepositor.val()
//		
//		console.log(param);
		
		hotplace.ajax({
			url: 'payment/do',
			data: JSON.stringify(_getPaymentParam()),
			contentType: 'application/json; charset=UTF-8',
			success: function(data, textStatus, jqXHR) {
				if(data.success) {
					hotplace.dom.showAlertMsg(function() {
						_couponInfo = {};
						hotplace.dom.closeModal();
					}, '결제신청이 완료되었습니다.<br/>입금완료후 사용가능합니다.<br/>신청내역은 My Page에서 확인가능 합니다.', hotplace.ALERT_SIZE);
//					hotplace.dom.showAlertMsg(function() {
//						hotplace.dom.logout(function() {
//							window.location.reload();
//						});
//					}, '결제가 완료되었습니다. 다시로그인해 주세요', hotplace.ALERT_SIZE);
					//hotplace.dom.showServiceReady();
				}
				else {
					jqXHR.errCode = data.errCode;
				}
			}
		});
	}
	
	function _inicisCardPayment() {
		var param = _getPaymentParam();
		console.log(param)
		hotplace.ajax({
			url: 'payment/getPayInfo',
			data: JSON.stringify(param),
			contentType: 'application/json; charset=UTF-8',
			success: function(data, textStatus, jqXHR) {
				console.log(data);
				
				var goodname = (param.serviceType == 'ALL') ? '전체서비스(월간)' : '개별서비스';
				
				if(data.success) {
					data = data.datas[0];
					$('#mid').val(data.mid);
					$('#goodname').val(goodname);
					$('#oid').val(data.oid);
					$('#price').val(data.price); //1000
					$('#buyername').val(data.buyername);
					$('#buyertel').val(data.buyertel);
					$('#buyeremail').val(data.buyeremail);
					$('#timestamp').val(data.timestamp);
					$('#signature').val(data.signature);
					$('#returnUrl').val(hotplace.getContextUrl() + 'payment/afterPay');
					$('#popupUrl').val(hotplace.getContextUrl() + 'payment/popup');
					$('#mKey').val(data.mKey);
					$('#closeUrl').val(hotplace.getContextUrl() + 'payment/close');
			
					INIStdPay.pay('sendPayForm');
				}
				else {
					jqXHR.errCode = data.errCode;
				}
			}
		});
	}
	
	var _couponInfo = {};
	
	function _addCoupon(couponObj) {
		
		if(!couponObj.discountUnit || !couponObj.discountValue) {
			hotplace.dom.showAlertMsg(null, '쿠폰정보에 오류가 있습니다. <br/> 070-7117-6868로 문의해 주세요', hotplace.ALERT_SIZE);
		}
		else {
			hotplace.dom.showAlertMsg(function() {
				_couponInfo.discountUnit = couponObj.discountUnit;
				_couponInfo.discountValue = couponObj.discountValue;
				_couponInfo.couponNum = couponObj.couponNum;
				
				var sum = _$txtPaymentSum.data('value');
				_sumCoupon(sum);
			}, '쿠폰인증 되었습니다.', hotplace.ALERT_SIZE);
		}
		
	}
	
	function _sumCoupon(sum) {
		//쿠폰적용전 값 저장
		_$txtPaymentSum.data('value', sum); //정가
		var tooltipHtml = '<span class="innerTooltip">';
		var couponHtml = '';
		var vatHtml = '';
		
		//쿠폰적용여부 결정 couponNum 존재하면 적용
		if(_couponInfo.couponNum) {
			var discountUnit = _couponInfo.discountUnit;
			var discountValue = _couponInfo.discountValue;
			discountValue = parseInt(discountValue, 10);
			
			couponHtml += '쿠폰번호: <span class="coupon">' + _couponInfo.couponNum + '</span><br/>'
			couponHtml += '쿠폰사용: ';
			//%
			if(discountUnit == '1') {
				sum = sum - (sum * (0.01 * discountValue));
				sum = Math.round(sum);
				couponHtml += discountValue + '% 할인<br/>';
			}
			else {
				sum = sum - discountValue;
				couponHtml += discountValue + '원 할인<br/>';
			}
		}
		else {
			couponHtml = '쿠폰사용: 사용안함<br/>';
		}
		
		//VAT 적용(원단위의 경우 10, 십원단위의 경우 100, 백원단위의 경우 1000, ... 을 이용하면 원단위 절사
		/*var vatValue = Math.floor((sum*0.1)/10000) * 10000;
		sum = sum + vatValue;
		sum = Math.floor(sum/10000) * 10000; */
		
		_$txtPaymentSum.data('totalValue', sum);
		_$txtPaymentSum.val(sum.toString().money() + '원');

		tooltipHtml += '정가: ' + _$txtPaymentSum.data('value').toString().money() + '원<br/>';
		//tooltipHtml += '부가가치세: ' + vatValue.toString().money() + ' 원<br/>';
		tooltipHtml += couponHtml;
		tooltipHtml += '입금자명: <span id=\'spPayDepositor\'>' + _$txtDepositor.val() + '</span><br/>'
		tooltipHtml += '총 결제금액 : ' + _$txtPaymentSum.val() + '</span>';

		
		_changeTooltipText(_tooltipHtml = tooltipHtml);
	}
	
	function _changeTooltipText(htmlStr) {
		hotplace.dom.changeTooltipText(_$btnPaymentInfo, htmlStr);
	}
	
	function _checkYaggwanAgree(fn) {
		var v = true;
		
		_$chksYaggwan.each(function() {
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
	
	//결제진행건이 있는지 검사
	payment.addPayment = function() {
		hotplace.ajax({
			url: 'payment/checkPayment',
			contentType: 'application/json; charset=UTF-8',
			method: 'GET',
			success: function(data, textStatus, jqXHR) {
				console.log(data);
				if(data.success) {
					var cnt = data.datas.length;
					if(cnt > 0) {
						hotplace.dom.showConfirmBox(null, '현재 결제진행건이 ' + cnt + '건 있습니다. <br/>추가 결제를 하시겠습니까?', hotplace.ALERT_SIZE, function() {
							hotplace.dom.closeModal(); 
						});
					}
				}
				else {
					jqXHR.errCode = data.errCode;
				}
			}
		});
	}
	
	function _initCardBank() {
		if(_$rdoCardPayment.is(':checked')) {
			_$trDepositorInPayment.hide();
		}
		else {
			_$trDepositorInPayment.show();
		}
		
		_$trPaymentMethod.show();
	}
	
	payment.init = function() {
		_$rdoPayment = $(_rdoPayment),
		_$rdoPaymentAll = $(_rdoPaymentAll),
		_$rdoPaymentType = $(_rdoPaymentType),
		_$txtPaymentSum = $(_txtPaymentSum),
		_$txtDepositor = $(_txtDepositor),
		_$chkPaymentTooja = $(_chkPaymentTooja),
		_$chkPaymentGG = $(_chkPaymentGG),
		_$chkPaymentMulgeon = $(_chkPaymentMulgeon),
		_$chkPaymentHeatmap = $(_chkPaymentHeatmap),
		_$chkCoupon = $(_chkCoupon),
		_$chksYaggwan = $(_chksYaggwan),
		_$btnCoupon = $(_btnCoupon),
		_$txtCoupon = $(_txtCoupon),
		_$trDepositorInPayment = $(_trDepositorInPayment),
		_$trPaymentMethod = $(trPaymentMethod),
		_$btnPaymentInfo = $(_btnPaymentInfo),
		_$rdoPaymentAllYear = $(_rdoPaymentAllYear),
		_$rdoCardPayment = $(_rdoCardPayment),
		_$btnPayment = $(_btnPayment);
		_isAll = true;
		
		_tooltipHtml = _$btnPaymentInfo.prop('title');
		
		//툴팁 초기화
		hotplace.dom.initTooltip(_dvPayment, {
			events: {
				'show.bs.tooltip': function() {
					
				}
			},
			config: {
				placement: 'top'
			}
		});
		
		_$rdoPayment
		.off('change')
		.on('change', function() {
			var type = $(this).val();
			if(type == 'ALL') {
				//개별서비스 비활성화
				_$chkPaymentTooja.prop('checked', false).prop('disabled', true);
				_$chkPaymentGG.prop('checked', false).prop('disabled', true);
				_$chkPaymentMulgeon.prop('checked', false).prop('disabled', true);
				_$chkPaymentHeatmap.prop('checked', false).prop('disabled', true);
				_$rdoPaymentAll.prop('disabled', false);
				_isAll = true;
				
				//전체서비스 년간구매일 경우는 결제선택 화면을 숨긴다.
				if(_$rdoPaymentAllYear.is(':checked')) {
					_$trDepositorInPayment.show();
					_$trPaymentMethod.hide();
				}
				else {
					_initCardBank();
				}
			}
			else {
				_$chkPaymentTooja.prop('disabled', false);
				_$chkPaymentGG.prop('disabled', false);
				_$chkPaymentMulgeon.prop('disabled', false);
				_$chkPaymentHeatmap.prop('disabled', false);
				_$rdoPaymentAll.prop('disabled', true);
				_isAll = false;
				_initCardBank();
				
			}
			
			_sum(type);
		});
		
		_$rdoPaymentAll
		.off('change')
		.on('change', function() {
			var value = $(this).val();
			var type = $(this).data('type');
			
			if(type == 'YEAR') {
				_$trDepositorInPayment.show();
				_$trPaymentMethod.hide();
			}
			else {
				_initCardBank();
			}
			
			_sum('ALL', value);
		});
		
		$(_chkPaymentTooja + ', ' + _chkPaymentGG + ', ' + _chkPaymentMulgeon + ', ' + _chkPaymentHeatmap)
		.off('click')
		.on('click', function() {
			_checkedSum($(this), $(this).val());
		});
		
		
		_$rdoPaymentType
		.off('change')
		.on('change', function() {
			var value = $(this).val();
			if(value == 'B') {//무통장입금
				_$trDepositorInPayment.show();
			}
			else {
				_$trDepositorInPayment.hide();
			}
		});
		
		_$btnPayment
		.off('click')
		.on('click', function() {
			
			var sum = _$txtPaymentSum.data('value');
			var depositor = $.trim($(_txtDepositor).val());
			
			if(sum == 0) {
				hotplace.dom.showAlertMsg(null, '구매하실 서비스를 선택하세요', hotplace.ALERT_SIZE);
			}
			else {
				if(_$chkCoupon.is(':checked')) {
					if(!_couponInfo.couponNum) {
						hotplace.dom.showAlertMsg(null, '쿠폰번호입력후 인증해 주세요.', hotplace.ALERT_SIZE);
						return;
					}
				}
				
				//연간구매는 무조건 무통장
				if((_isAll && _$rdoPaymentAllYear.is(':checked')) || !_$rdoCardPayment.is(':checked')) {
					if(!depositor) {
						hotplace.dom.showAlertMsg(null, '입금자명을 입력해 주세요.', hotplace.ALERT_SIZE);
						return;
					}
					_payment();
				}
				else {
					_checkPopupCard();
				}
			}
		});
		
		_$btnCoupon
		.off('click')
		.on('click', function() {
			var coupon = _$txtCoupon.val();
			
			if($.trim(coupon) == '') {
				hotplace.dom.showAlertMsg(null, '쿠폰번호를 입력해 주세요.', hotplace.ALERT_SIZE);
				return;
			}
			
			hotplace.ajax({
				url: 'payment/checkCoupon',
				data: JSON.stringify({coupon: coupon}),
				contentType: 'application/json; charset=UTF-8',
				success: function(data, textStatus, jqXHR) {
					console.log(data);
					if(data.success) {
						_addCoupon(data.datas[0]);
					}
					else {
						jqXHR.errCode = data.errCode;
					}
				}
			});
		});
		
		_$chkCoupon
		.off('click')
		.on('click', function() {
			if($(this).is(':checked')) {
				_$txtCoupon.prop('disabled', false);
				_$btnCoupon.prop('disabled', false);
			}
			else {
				_$txtCoupon.prop('disabled', true);
				_$btnCoupon.prop('disabled', true);
				_$txtCoupon.val('');
				_couponInfo = {};
				_sumCoupon(_$txtPaymentSum.data('value'));
			}
		});
		
		
		_$txtDepositor
		.off('keyup')
		.on('keyup', function() {
			var txt = $(this).val();
			txt = txt.replace(/[\{\}\[\]\/?.,;:|*~`!^\-_+<>@\#$%&\\\=\'\"]/gi, '');
			$(this).val(txt);

			_tooltipHtml = _tooltipHtml.replace(
					/<span id='spPayDepositor'>(\s|[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]|[a-zA-Z]|\d|\(|\))*<\/span>/gm,
					'<span id=\'spPayDepositor\'>' + txt + '</span>'
			);
			_changeTooltipText(_tooltipHtml);
			
		});
		
		//약관 동의체크
		_$chksYaggwan
		.off('change')
		.on('change', function() {
			_checkYaggwanAgree(function(result) {
				if(result) {
					if(_$btnPayment.is(':disabled')) {
						_$btnPayment.removeAttr('disabled');
					}
				}
				else {
					_$btnPayment.prop('disabled', true);
				}
			});
		});
		
	}
}(
	hotplace.payment = hotplace.payment || {},
	jQuery
));