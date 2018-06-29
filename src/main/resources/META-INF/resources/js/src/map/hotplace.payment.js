/**
 * @namespace hotplace.payment
 */
(function(payment, $) {
	
	var _dvPayment = '#dvPayment',
		_rdoPayment = _dvPayment + ' input[name=payment]:radio',
		_rdoPaymentAll = _dvPayment + ' input[name=paymentAll]:radio',
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
		_tooltipHtml = '',
		_$rdoPayment = null,
		_$rdoPaymentAll = null,
		_$chkCoupon = null,
		_$txtPaymentSum = null,
		_$chkPaymentTooja = null,
		_$chkPaymentGG = null,
		_$chkPaymentMulgeon = null,
		_$chkPaymentHeatmap = null,
		_$btnPayment = null;
	
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
	
	function _payment() {
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
		param.sum = _$txtPaymentSum.data('couponValue');
		param.couponNum = _couponInfo.couponNum || '0';
		param.depositor = _$txtDepositor.val()
		
		console.log(param);
		
		hotplace.ajax({
			url: 'payment/do',
			data: JSON.stringify(param),
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
		_$txtPaymentSum.data('value', sum);
		var tooltipHtml = '<span class="innerTooltip">';
		var couponHtml = '';
		
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
		
		_$txtPaymentSum.data('couponValue', sum);
		_$txtPaymentSum.val(sum.toString().money() + '원');

		tooltipHtml += '정가: ' + _$txtPaymentSum.data('value').toString().money() + '원<br/>';
		tooltipHtml += couponHtml;
		tooltipHtml += '입금자명: <span id="spPayDepositor">' + _$txtDepositor.val() + '</span><br/>'
		tooltipHtml += '총 결제금액 : ' + _$txtPaymentSum.val() + '</span>';

		
		//hotplace.dom.changeTooltipText(_$btnPaymentInfo, tooltipHtml);
		_changeTooltipText(_tooltipHtml = tooltipHtml);
	}
	
	function _changeTooltipText(htmlStr) {
		hotplace.dom.changeTooltipText(_$btnPaymentInfo, htmlStr);
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
	
	
	payment.init = function() {
		_$rdoPayment = $(_rdoPayment),
		_$rdoPaymentAll = $(_rdoPaymentAll),
		_$txtPaymentSum = $(_txtPaymentSum),
		_$txtDepositor = $(_txtDepositor),
		_$chkPaymentTooja = $(_chkPaymentTooja),
		_$chkPaymentGG = $(_chkPaymentGG),
		_$chkPaymentMulgeon = $(_chkPaymentMulgeon),
		_$chkPaymentHeatmap = $(_chkPaymentHeatmap),
		_$chkCoupon = $(_chkCoupon),
		_$btnCoupon = $(_btnCoupon),
		_$txtCoupon = $(_txtCoupon),
		_$btnPaymentInfo = $(_btnPaymentInfo),
		_$btnPayment = $(_btnPayment);
		
		
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
			}
			else {
				_$chkPaymentTooja.prop('disabled', false);
				_$chkPaymentGG.prop('disabled', false);
				_$chkPaymentMulgeon.prop('disabled', false);
				_$chkPaymentHeatmap.prop('disabled', false);
				_$rdoPaymentAll.prop('disabled', true);
			}
			
			_sum(type);
		});
		
		_$rdoPaymentAll
		.off('change')
		.on('change', function() {
			var value = $(this).val();
			_sum('ALL', value);
		});
		
		$(_chkPaymentTooja + ', ' + _chkPaymentGG + ', ' + _chkPaymentMulgeon + ', ' + _chkPaymentHeatmap)
		.off('click')
		.on('click', function() {
			_checkedSum($(this), $(this).val());
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
				
				if(!depositor) {
					hotplace.dom.showAlertMsg(null, '입금자명을 입력해 주세요.', hotplace.ALERT_SIZE);
					return;
				}
				
				_payment();
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
			
			_tooltipHtml = _tooltipHtml.replace(
					/<span id='spPayDepositor'>\s*[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]*[a-zA-Z]*\s*<\/span>/gm,
					'<span id="spPayDepositor">' + $(this).val() + '</span>'
			);
			_changeTooltipText(_tooltipHtml);
			
		});
	}
}(
	hotplace.payment = hotplace.payment || {},
	jQuery
));