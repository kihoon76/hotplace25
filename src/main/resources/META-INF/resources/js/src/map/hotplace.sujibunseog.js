/**
 * @namespace hotplace.sujibunseog
 */
(function(sujibunseog, $) {
	var _dvSujibunseog = '#dvSujibunseog',
		_btnSujiGongsiHistory = '#btnSujiGongsiHistory', //공시지가 변동보기버튼
		_btnSujiTojiUseLimitHistory = '#btnSujiTojiUseLimitHistory', //토지이용규제 변경 내역보기
		
		_chkJaesanse = '#chkJaesanse', //재산세 checkbox (주택);
		_chkYangdose = '#chkYangdose', //양도세 비사업용 체크
		_chkFarmBudam = '#chkFarmBudam', //농지보전부담금 감면 체크
		
		_stepOwnTerm = '#stepOwnTerm',
		_stepOtherAssetRatio = '#stepOtherAssetRatio',
		_txtPurchase = '#txtPurchase',
		_stepPurchase = '#stepPurchase',
		_WPurchase = '#WPurchase',
		_ratioPurchase = '#ratioPurchase',
		
		_txtMyeongdobi = '#txtMyeongdobi',
		_stepMyeongdobi = '#stepMyeongdobi',
		_WMyeongdobi = '#WMyeongdobi',
		_ratioMyeongdobi = '#ratioMyeongdobi',
		
		_txtAcceptLandUse = '#txtAcceptLandUse',
		_stepAcceptLandUse = '#stepAcceptLandUse',
		_WAcceptLandUse = '#WAcceptLandUse',
		_ratioAcceptLandUse = '#ratioAcceptLandUse',
		
		_WTojibi = '#WTojibi',
		_ratioTojibi = '#ratioTojibi',
		_txtDaechulIja = '#txtDaechulIja',
		_stepDaechulIja = '#stepDaechulIja',
		_WDaechulIja = '#WDaechulIja',
		_ratioDaechulIja = '#ratioDaechulIja',
		
		_txtChwideugse = '#txtChwideugse',
		_stepChwideugse = '#stepChwideugse',
		_WChwideugse = '#WChwideugse',
		_ratioChwideugse = '#ratioChwideugse',
		
		_stepYangdose = '#stepYangdose',
		_stepYangdose2 = '#stepYangdose2',
		_WYangdose = '#WYangdose',
		_ratioYangdose = '#ratioYangdose',
		
		_WJesegeum = '#WJesegeum',
		_ratioJesegeum = '#ratioJesegeum',
		
		_txtGeonchugGongsa = '#txtGeonchugGongsa',
		_stepGeonchugGongsa = '#stepGeonchugGongsa',
		_WGeonchugGongsa = '#WGeonchugGongsa',
		_ratioGeonchugGongsa = '#ratioGeonchugGongsa',
		
		_txtTomogGongsa = '#txtTomogGongsa',
		_stepTomogGongsa = '#stepTomogGongsa',
		_WTomogGongsa = '#WTomogGongsa',
		_ratioTomogGongsa = '#ratioTomogGongsa',
		
		_txtPojangGongsa = '#txtPojangGongsa',
		_stepPojangGongsa = '#stepPojangGongsa',
		_WPojangGongsa = '#WPojangGongsa',
		_ratioPojangGongsa = '#ratioPojangGongsa',
		
		_txtInibGongsa = '#txtInibGongsa',
		_stepInibGongsa = '#stepInibGongsa',
		_WInibGongsa = '#WInibGongsa',
		_ratioInibGongsa = '#ratioInibGongsa',
		
		_WGongsabi = '#WGongsabi',
		_ratioGongsabi = '#ratioGongsabi',
		
		_txtAcceptGaebal = '#txtAcceptGaebal',
		_stepAcceptGaebal = '#stepAcceptGaebal',
		_WAcceptGaebal = '#WAcceptGaebal',
		_ratioAcceptGaebal = '#ratioAcceptGaebal',
		
		_txtGamri = '#txtGamri',
		_stepGamri = '#stepGamri',
		_WGamri = '#WGamri',
		_ratioGamri = '#ratioGamri',
		
		_txtCheuglyang = '#txtCheuglyang',
		_stepCheuglyang = '#stepCheuglyang',
		_WCheuglyang = '#WCheuglyang',
		_ratioCheuglyang = '#ratioCheuglyang',
		
		_txtEvalueGamjeung = '#txtEvalueGamjeung',
		_stepEvalueGamjeung = '#stepEvalueGamjeung',
		_WEvalueGamjeung = '#WEvalueGamjeung',
		_ratioEvalueGamjeung = '#ratioEvalueGamjeung',
		
		_txtSplitPilji = '#txtSplitPilji',
		_stepSplitPilji = '#stepSplitPilji',
		_WSplitPilji = '#WSplitPilji',
		_ratioSplitPilji = '#ratioSplitPilji',
		
		_WInheogabi = '#WInheogabi',
		_ratioInheogabi = '#ratioInheogabi',
		
		_txtDevBudam = '#txtDevBudam',
		_stepDevBudam = '#stepDevBudam',
		_WDevBudam = '#WDevBudam',
		_ratioDevBudam = '#ratioDevBudam',
		
		_txtAlterSanrim = '#txtAlterSanrim',
		_stepAlterSanrim = '#stepAlterSanrim',
		_WAlterSanrim = '#WAlterSanrim',
		_ratioAlterSanrim = '#ratioAlterSanrim',
		
		_WBudamgeum = '#WBudamgeum',
		_ratioBudamgeum = '#ratioBudamgeum',
		_txtPurchaseChaegwon = '#txtPurchaseChaegwon',
		_stepPurchaseChaegwon = '#stepPurchaseChaegwon',
		_WPurchaseChaegwon = '#WPurchaseChaegwon',
		_ratioPurchaseChaegwon = '#ratioPurchaseChaegwon',
		
		_txtSetGeunjeodang = '#txtSetGeunjeodang',
		_stepSetGeunjeodang = '#stepSetGeunjeodang',
		_WSetGeunjeodang = '#WSetGeunjeodang',
		_ratioSetGeunjeodang = '#ratioSetGeunjeodang',
		
		_txtPreserveDeunggi = '#txtPreserveDeunggi',
		_stepPreserveDeunggi = '#stepPreserveDeunggi',
		_WPreserveDeunggi = '#WPreserveDeunggi',
		_ratioPreserveDeunggi = '#ratioPreserveDeunggi',
		
		
		_txtManagement = '#txtManagement',
		_stepManagement = '#stepManagement',
		_WManagement = '#WManagement',
		_ratioManagement = '#ratioManagement',
		
		_txtSellSusulyo = '#txtSellSusulyo',
		_stepSellSusulyo = '#stepSellSusulyo',
		_WSellSusulyo = '#WSellSusulyo',
		_ratioSellSusulyo = '#ratioSellSusulyo',
		
		_txtPreparation = '#txtPreparation',
		_stepPreparation = '#stepPreparation',
		_WPreparation = '#WPreparation',
		_ratioPreparation = '#ratioPreparation',
		
		_WSaeobgyeongbi = '#WSaeobgyeongbi',
		_ratioSaeobgyeongbi = '#ratioSaeobgyeongbi',
		
		_WJichool = '#WJichool';
		
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
	
	sujibunseog.getPdfParams = function() {
		return {
			fileName:'sujibunseogFormPdf',
			cssName: 'pdf',
			docName: '수지분석',
			address: '서울시 강남구 도곡동 963',
			jimok: '전',
			valPerPyeung:'21,000',
			area: '132',
			gongsi: '4,040,000',
			limitChange:'Y',
			ownTerm: $(_stepOwnTerm).val(),
			otherAssetRatio: $(_stepOtherAssetRatio).val(),
			tPurchase: $(_txtPurchase).val(),
			sPurchase: $(_stepPurchase).val(),
			wPurchase: $(_WPurchase).val(),
			rPurchase: $(_ratioPurchase).text(),
			tMyeongdobi: $(_txtMyeongdobi).val(),
			sMyeongdobi: $(_stepMyeongdobi).val(),
			wMyeongdobi: $(_WMyeongdobi).val(),
			rMyeongdobi: $(_ratioMyeongdobi).text(),
			
			tAcceptLandUse: $(_txtAcceptLandUse).val(),
			sAcceptLandUse: $(_stepAcceptLandUse).val(),
			wAcceptLandUse: $(_WAcceptLandUse).val(),
			rAcceptLandUse: $(_ratioAcceptLandUse).text(),
			
			wTojibi: $(_WTojibi).val(),
			rTojibi: $(_ratioTojibi).text(),
			
			tDaechulIja: $(_txtDaechulIja).val(),
			sDaechulIja: $(_stepDaechulIja).val(),
			wDaechulIja: $(_WDaechulIja).val(),
			rDaechulIja: $(_ratioDaechulIja).text(),
			
			tChwideugse: $(_txtChwideugse).val(),
			sChwideugse: $(_stepChwideugse).val(),
			wChwideugse: $(_WChwideugse).val(),
			rChwideugse: $(_ratioChwideugse).text(),
			
			//재산세
			tYangdose: $(_stepYangdose).val(),
			sYangdose: $(_stepYangdose2).val(),
			wYangdose: $(_WYangdose).val(),
			rYangdose: $(_ratioYangdose).text(),
			
			wJesegeum: $(_WJesegeum).val(),
			rJesegeum: $(_ratioJesegeum).text(),
			
			tGeonchugGongsa: $(_txtGeonchugGongsa).val(),
			sGeonchugGongsa: $(_stepGeonchugGongsa).val(),
			wGeonchugGongsa: $(_WGeonchugGongsa).val(),
			rGeonchugGongsa: $(_ratioGeonchugGongsa).text(),
			
			tTomogGongsa: $(_txtTomogGongsa).val(),
			sTomogGongsa: $(_stepTomogGongsa).val(),
			wTomogGongsa: $(_WTomogGongsa).val(),
			rTomogGongsa: $(_ratioTomogGongsa).text(),
			
			tPojangGongsa: $(_txtPojangGongsa).val(),
			sPojangGongsa: $(_stepPojangGongsa).val(),
			wPojangGongsa: $(_WPojangGongsa).val(),
			rPojangGongsa: $(_ratioPojangGongsa).text(),
			
			tInibGongsa: $(_txtInibGongsa).val(),
			sInibGongsa: $(_stepInibGongsa).val(),
			wInibGongsa: $(_WInibGongsa).val(),
			rInibGongsa: $(_ratioInibGongsa).text(),
			
			wGongsabi: $(_WGongsabi).val(),
			rGongsabi: $(_ratioGongsabi).text(),
			
			tAcceptGaebal: $(_txtAcceptGaebal).val(),
			sAcceptGaebal: $(_stepAcceptGaebal).val(),
			wAcceptGaebal: $(_WAcceptGaebal).val(),
			rAcceptGaebal: $(_ratioAcceptGaebal).text(),
			
			tGamri: $(_txtGamri).val(),
			sGamri: $(_stepGamri).val(),
			wGamri: $(_WGamri).val(),
			rGamri: $(_ratioGamri).text(),
			
			tCheuglyang: $(_txtCheuglyang).val(),
			sCheuglyang: $(_stepCheuglyang).val(),
			wCheuglyang: $(_WCheuglyang).val(),
			rCheuglyang: $(_ratioCheuglyang).text(),
			
			tEvalueGamjeung: $(_txtEvalueGamjeung).val(),
			sEvalueGamjeung: $(_stepEvalueGamjeung).val(),
			wEvalueGamjeung: $(_WEvalueGamjeung).val(),
			rEvalueGamjeung: $(_ratioEvalueGamjeung).text(),
			
			tSplitPilji: $(_txtSplitPilji).val(),
			sSplitPilji: $(_stepSplitPilji).val(),
			wSplitPilji: $(_WSplitPilji).val(),
			rSplitPilji: $(_ratioSplitPilji).text(),
			
			wInheogabi: $(_WInheogabi).val(),
			rInheogabi: $(_ratioInheogabi).text(),
			
			tDevBudam: $(_txtDevBudam).val(),
			sDevBudam: $(_stepDevBudam).val(),
			wDevBudam: $(_WDevBudam).val(),
			rDevBudam: $(_ratioDevBudam).text(),
			
			tAlterSanrim: $(_txtAlterSanrim).val(),
			sAlterSanrim: $(_stepAlterSanrim).val(),
			wAlterSanrim: $(_WAlterSanrim).val(),
			rAlterSanrim: $(_ratioAlterSanrim).text(),
			
			wBudamgeum: $(_WBudamgeum).val(),
			rBudamgeum: $(_ratioBudamgeum).text(),
			
			tPurchaseChaegwon: $(_txtPurchaseChaegwon).val(),
			sPurchaseChaegwon: $(_stepPurchaseChaegwon).val(),
			wPurchaseChaegwon: $(_WPurchaseChaegwon).val(),
			rPurchaseChaegwon: $(_ratioPurchaseChaegwon).text(),
			
			tSetGeunjeodang: $(_txtSetGeunjeodang).val(),
			sSetGeunjeodang: $(_stepSetGeunjeodang).val(),
			wSetGeunjeodang: $(_WSetGeunjeodang).val(),
			rSetGeunjeodang: $(_ratioSetGeunjeodang).text(),
			
			tPreserveDeunggi: $(_txtPreserveDeunggi).val(),
			sPreserveDeunggi: $(_stepPreserveDeunggi).val(),
			wPreserveDeunggi: $(_WPreserveDeunggi).val(),
			rPreserveDeunggi: $(_ratioPreserveDeunggi).text(),
			
			tManagement: $(_txtManagement).val(),
			sManagement: $(_stepManagement).val(),
			wManagement: $(_WManagement).val(),
			rManagement: $(_ratioManagement).text(),
			
			tSellSusulyo: $(_txtSellSusulyo).val(),
			sSellSusulyo: $(_stepSellSusulyo).val(),
			wSellSusulyo: $(_WSellSusulyo).val(),
			rSellSusulyo: $(_ratioSellSusulyo).text(),
			
			tPreparation: $(_txtPreparation).val(),
			sPreparation: $(_stepPreparation).val(),
			wPreparation: $(_WPreparation).val(),
			rPreparation: $(_ratioPreparation).text(),
			
			wSaeobgyeongbi: $(_WSaeobgyeongbi).val(),
			rSaeobgyeongbi: $(_ratioSaeobgyeongbi).text(),
			
			wJichool: $(_WJichool).val(),
			rJichool: '100',
		};
	}
	
	sujibunseog.init = function() {
		//펼침버튼
		hotplace.dom.listExpandCollapse(_dvSujibunseog);
		
		//툴팁 초기화
		hotplace.dom.initTooltip(_dvSujibunseog);
		
		//수지분석 토지이용규제 변경 내역 보기
		$(_btnSujiTojiUseLimitHistory)
		.off('click')
		.on('click', function(e) {
			hotplace.dom.showSujiTojiUseLimitHistory();
		});
		
		//var stepYangdose2 = $('#stepYangdose2');
		
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
			var $stepOwnTerm   = $(_stepOwnTerm);
			
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
		
		hotplace.validation.numberOnly(_stepYangdose, function($this) {
			var step = hotplace.calc.sujibunseog.makeStep($this.data('value'), hotplace.config.yangdoseStepPercent);
			$this.data('step', step);
			hotplace.calc.sujibunseog.calcYangdose();
		});
		
		hotplace.validation.numberOnly(_stepGeonchugGongsa, function($this) {
			hotplace.calc.sujibunseog.calcGeonchugGongsa();
		});
		
		hotplace.validation.numberOnly(_stepTomogGongsa, function($this) {
			hotplace.calc.sujibunseog.calcTomogGongsa();
		});
		
		hotplace.validation.numberOnly(_stepPojangGongsa, function($this) {
			hotplace.calc.sujibunseog.calcPojangGongsa();
		});
		
		hotplace.validation.numberOnly(_stepInibGongsa, function($this) {
			hotplace.calc.sujibunseog.calcInibGongsa();
		});
		
		//운영비
		hotplace.validation.numberOnly(_txtManagement, function($this) {
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