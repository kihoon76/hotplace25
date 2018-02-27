/**
 * @namespace hotplace.sujibunseog
 */
(function(sujibunseog, $) {
	var _dvSujibunseog = '#dvSujibunseog',
		_btnSujiGongsiHistory = '#btnSujiGongsiHistory', //공시지가 변동보기버튼
		_btnSujiTojiUseLimitHistory = '#btnSujiTojiUseLimitHistory', //토지이용규제 변경 내역보기
		
		_chkJaesanse = '#chkJaesanse', //재산세 checkbox (주택);
		_chkYangdose = '#chkYangdose', //양도세 비사업용 체크
		_chkFarmBudam = '#chkFarmBudam' //농지보전부담금 감면 체크
	
	/**
	 * @private
	 * @function _workSpinner
	 * @param {object} $txt spinner의 textbox jquery object
	 * @param {string} upDown spinner updown('up'|'down')
	 * @desc spinner up/down 동작 컨트롤
	 */
	function _workSpinner($txt, upDown, fnStr) {
		var step, 
		    viewVal = 0,
		    dataVal = 0,
		    suffix = $txt.data('suffix'),
		    min = $txt.data('min'),
		    max = $txt.data('max'),
		    type = $txt.data('type'),
		    curVal = parseFloat($txt.data('value'));
		
		// min max가 0일 경우 step안에 있는 값만 허용
		if(min == '0' && max == '0') {
			step = $txt.data('step');
			
			//초기 index 설정
			var idx = $txt.data('index');
			
			if(idx == undefined) {
				for(var i=0; i<step.length; i++) {
					if(step[i] == curVal) {
						$txt.data('index', idx = i)
						break;
					}
				}
			}
			
			if(idx == undefined) throw new Error(curVal + '값은 step에 없습니다.');
			
			if(upDown == 'up') {
				if(idx == step.length - 1) return;
				dataVal = step[++idx]; 
			}
			else {
				if(idx == 0) return;
				dataVal = step[--idx];
			}
			
			$txt.data('index', idx);
		}
		else {
			var strStep = $txt.data('step');
			var fractionDigits = strStep.toString().getDecimalCount();
			step = parseFloat(strStep);
			if(upDown == 'up') {
				var nextVal = curVal + step;
				if(max == undefined || nextVal <= parseFloat(max)) {
					if(fractionDigits > -1) {
						dataVal = nextVal.toFixed(fractionDigits) 
					}
					else {
						dataVal = nextVal;
					}
				}
				else  {
					dataVal = max;
				}
			}
			else {
				var prevVal = curVal - step;
				if(min == undefined || prevVal >= parseFloat(min)) {
					if(fractionDigits > -1) {
						dataVal = prevVal.toFixed(fractionDigits);
					}
					else {
						dataVal = prevVal;
					}
				}
				else  {
					dataVal = min;
				}
			}
		}
		
		$txt.data('value', dataVal);
		switch(type) {
		case 'money' :
			viewVal = dataVal.toString().money() + suffix;
			break;
		default :
			viewVal = dataVal + suffix;
			break;
		}
		
	    $txt.val(viewVal);
	    hotplace.calc.sujibunseog[fnStr]();
	}
	
	sujibunseog.init = function() {
		//펼침버튼
		hotplace.dom.listExpandCollapse(_dvSujibunseog);
		
		//수지분석 토지이용규제 변경 내역 보기
		$(_btnSujiTojiUseLimitHistory)
		.off('click')
		.on('click', function(e) {
			
		});
		
		var stepYangdose2 = $('#stepYangdose2');
		
		//매입주체 
		$('input[name="radioOwn"]').on('click', function(e) {
			var targetId = e.target.id;
			//개인 (양도세 세율)
			if(targetId == 'radioPrivate') {
				
			}
			else {
				
			}
			
		});
		
		//재산세 checkbox (주택)
		$(_chkJaesanse)
		.off('change')
		.on('change', function() {
			var $txtJaesanseH1 = $('#txtJaesanseH1');
			var $txtJaesanseH2 = $('#txtJaesanseH2');
			var $txtJaesanseH3 = $('#txtJaesanseH3');
			var $WJaesanse2    = $('#WJaesanse2');
			var $stepOwnTerm   = $('#stepOwnTerm');
			
			if($(this).is(':checked')) {
				$txtJaesanseH1.prop('disabled', false);
				$txtJaesanseH2.prop('disabled', false);
				$txtJaesanseH3.prop('disabled', false);
				$WJaesanse2.prop('disabled', false);
			}
			else {
				$txtJaesanseH1.prop('disabled', true);
				$txtJaesanseH2.prop('disabled', true);
				$txtJaesanseH3.prop('disabled', true);
				$WJaesanse2.prop('disabled', true);
			}
			
			hotplace.calc.sujibunseog.calcJaesanse2(false, true);
		});
		
		//양도세 비사업용 체크 
		$(_chkYangdose)
		.off('change')
		.on('change', function() {
			hotplace.calc.sujibunseog.calcYangdose();
		});
		
		//농지보전부담금 감면 체크
		$(_chkFarmBudam)
		.off('change')
		.on('change', function() {
			var $txtFarmBudam = $('#txtFarmBudam');
			var $WFarmBudam = $('#WFarmBudam');
			
			if($(this).is(':checked')) {
				$txtFarmBudam.prop('disabled', true);
				$WFarmBudam.prop('disabled', true);
				hotplace.calc.sujibunseog.calcFarmBudam(true);
			}
			else {
				$txtFarmBudam.prop('disabled', false);
				$WFarmBudam.prop('disabled', false);
				hotplace.calc.sujibunseog.calcFarmBudam(false);
			}
		});
		
		hotplace.validation.numberOnly('#txtJaesanseH1', function() {
			hotplace.calc.sujibunseog.calcJaesanse2();
		});
		
		hotplace.validation.numberOnly('#stepYangdose', function($this) {
			var step = hotplace.calc.sujibunseog.makeStep($this.data('value'), hotplace.config.yangdoseStepPercent);
			$this.data('step', step);
			hotplace.calc.sujibunseog.calcYangdose();
		});
		
		hotplace.validation.numberOnly('#stepGeonchugGongsa', function($this) {
			hotplace.calc.sujibunseog.calcGeonchugGongsa();
		});
		
		hotplace.validation.numberOnly('#stepTomogGongsa', function($this) {
			hotplace.calc.sujibunseog.calcTomogGongsa();
		});
		
		hotplace.validation.numberOnly('#stepPojangGongsa', function($this) {
			hotplace.calc.sujibunseog.calcPojangGongsa();
		});
		
		hotplace.validation.numberOnly('#stepInibGongsa', function($this) {
			hotplace.calc.sujibunseog.calcInibGongsa();
		});
		
		//운영비
		hotplace.validation.numberOnly('#txtManagement', function($this) {
			hotplace.calc.sujibunseog.calcManagement();
		});
		
		//매각 > 설비
		hotplace.validation.numberOnly('#txtIncomeSellSeolbi', function($this) {
			hotplace.calc.sujibunseog.calcIncomeSellSeolbi();
		});
		
		//매각 > 토지
		hotplace.validation.numberOnly('#txtIncomeSellLand', function($this) {
			hotplace.calc.sujibunseog.calcIncomeSellLand();
		});
		
		//운영 > 임대
		hotplace.validation.numberOnly('#txtIncomeManageImdae', function($this) {
			hotplace.calc.sujibunseog.calcIncomeManageImdae();
		});
		
		//spinner
		$('#tbProfit .spinner .btn:first-of-type').on('click', function() {
			var parentDv = $(this).parent();
			_workSpinner(parentDv.parent().children('input:first-child'), 'up', parentDv.data('fn'));
		});
		
		$('#tbProfit .spinner .btn:last-of-type').on('click', function() {
			var parentDv = $(this).parent();
			_workSpinner($(this).parent().parent().children('input:first-child'), 'down', parentDv.data('fn'));
		});
		
	}
}(
	hotplace.sujibunseog = hotplace.sujibunseog || {},
	jQuery
));