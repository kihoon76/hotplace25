/**
 * @namespace hotplace.payment
 */
(function(payment, $) {
	
	var _rdoPayment = '#dvPayment input[name=payment]:radio',
		_rdoPaymentAll = '#dvPayment input[name=paymentAll]:radio',
		_txtPaymentSum = '#txtPaymentSum',
		_chkPaymentTooja = '#chkPaymentTooja',
		_chkPaymentGG = '#chkPaymentGG',
		_chkPaymentMulgeon = '#chkPaymentMulgeon',
		_chkPaymentHeatmap = '#chkPaymentHeatmap',
		_btnPayment = '#btnPayment',
		_$rdoPayment = null,
		_$rdoPaymentAll = null,
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
		
		_$txtPaymentSum.data('value', sum);
		_$txtPaymentSum.val(sum.toString().money() + '원');
	}
	
	function _checkedSum($chk, val) {
		var sum = _$txtPaymentSum.data('value');
		
		if($chk.is(':checked')) {
			sum += parseInt(val, 10);
		}
		else {
			sum -= parseInt(val, 10);
		}
		
		_$txtPaymentSum.data('value', sum);
		_$txtPaymentSum.val(sum.toString().money() + '원');
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
		
		param.serviceSubType = serviceSubType.join(',');
		param.sum = _$txtPaymentSum.data('value');
		
		console.log(param);
		
		hotplace.ajax({
			url: 'payment/do',
			data: JSON.stringify(param),
			contentType: 'application/json; charset=UTF-8',
			success: function(data, textStatus, jqXHR) {
				if(data.success) {
					
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
		_$chkPaymentTooja = $(_chkPaymentTooja),
		_$chkPaymentGG = $(_chkPaymentGG),
		_$chkPaymentMulgeon = $(_chkPaymentMulgeon),
		_$chkPaymentHeatmap = $(_chkPaymentHeatmap),
		_$btnPayment = $(_btnPayment);
		
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
			if(sum == 0) {
				hotplace.dom.showAlertMsg(null, '구매하실 서비스를 선택하세요', {width:550});
			}
			else {
				_payment();
			}
		});
	}
	
	
}(
	hotplace.payment = hotplace.payment || {},
	jQuery
));