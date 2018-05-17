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
		_$rdoPayment = null,
		_$rdoPaymentAll = null,
		_$txtPaymentSum = null,
		_$chkPaymentTooja = null,
		_$chkPaymentGG = null,
		_$chkPaymentMulgeon = null,
		_$chkPaymentHeatmap = null;
	
	function _sum(type, value) {
		var sum;
		
		if(type == 'ALL') {
			sum = (value == undefined) ? $(_rdoPaymentAll + ':checked').val() : value;
		}
		else {
			sum = 0;
		}
		
		_$txtPaymentSum.data('value', sum);
		_$txtPaymentSum.val(sum.toString().money());
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
		_$txtPaymentSum.val(sum.toString().money());
	}
	
	payment.init = function() {
		var _$rdoPayment = $(_rdoPayment),
			_$rdoPaymentAll = $(_rdoPaymentAll),
			_$txtPaymentSum = $(_txtPaymentSum),
			_$chkPaymentTooja = $(_chkPaymentTooja),
			_$chkPaymentGG = $(_chkPaymentGG),
			_$chkPaymentMulgeon = $(_chkPaymentMulgeon),
			_$chkPaymentHeatmap = $(_chkPaymentHeatmap);
		
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
				_$rdoPaymentAll.prop('disabled', false).prop('disabled', true);
			}
			else {
				_$chkPaymentTooja.prop('disabled', false);
				_$chkPaymentGG.prop('disabled', false);
				_$chkPaymentMulgeon.prop('disabled', false);
				_$chkPaymentHeatmap.prop('disabled', false);
				_$rdoPaymentAll.prop('disabled', false);
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
	}
	
	
}(
	hotplace.payment = hotplace.payment || {},
	jQuery
));