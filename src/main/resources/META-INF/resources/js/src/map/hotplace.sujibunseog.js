/**
 * @namespace hotplace.sujibunseog
 */
(function(sujibunseog, $) {
	var _dvSujibunseog = '#dvSujibunseog',
		_dvSujiLurisDrawing = '#dvSujiLurisDrawing',
		_btnSujiGongsiHistory = '#btnSujiGongsiHistory', //공시지가 변동보기버튼
		_btnSujiTojiUseLimitHistory = '#btnSujiTojiUseLimitHistory', //토지이용규제 변경 내역보기
		_btnSujiGongsiHistory = '#btnSujiGongsiHistory', //공시지가 변동보기
		_btnSujibunseogPdf = '#btnSujibunseogPdf',
		
		_chkJaesanse = '#chkJaesanse', //재산세 checkbox (주택);
		_chkYangdose = '#chkYangdose', //양도세 비사업용 체크
		_chkFarmBudam = '#chkFarmBudam', //농지보전부담금 감면 체크
		_radioGaein = '#radioGaein',
		
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
		_txtJaesanseT1 = '#txtJaesanseT1',
		_txtJaesanseH1 = '#txtJaesanseH1',
		_txtJaesanseT2 = '#txtJaesanseT2',
		_txtJaesanseH2 = '#txtJaesanseH2',
		_stepJaesanseT3 = '#stepJaesanseT3',
		_txtJaesanseH3 = '#txtJaesanseH3',
		_WJaesanse = '#WJaesanse',
		_WJaesanse2 = '#WJaesanse2',
		_ratioJaesanse = '#ratioJaesanse',
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
		_txtFarmBudam = '#txtFarmBudam',
		_stepFarmBudam = '#stepFarmBudam',
		_WFarmBudam = '#WFarmBudam',
		_ratioFarmBudam = '#ratioFarmBudam',
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
		_txtIncomeSellBuilding = '#txtIncomeSellBuilding',
		_stepIncomeSellBuilding = '#stepIncomeSellBuilding',
		_WIncomeSellBuilding = '#WIncomeSellBuilding',
		_ratioIncomeSellBuilding = '#ratioIncomeSellBuilding',
		_txtIncomeSellSeolbi = '#txtIncomeSellSeolbi',
		_stepIncomeSellSeolbi = '#stepIncomeSellSeolbi',
		_WIncomeSellSeolbi = '#WIncomeSellSeolbi',
		_ratioIncomeSellSeolbi = '#ratioIncomeSellSeolbi',
		_txtIncomeSellLand = '#txtIncomeSellLand',
		_stepIncomeSellLand = '#stepIncomeSellLand',
		_WIncomeSellLand = '#WIncomeSellLand',
		_ratioIncomeSellLand = '#ratioIncomeSellLand',
		_WIncomeSell = '#WIncomeSell',
		_ratioIncomeSell = '#ratioIncomeSell',
		_stepIncomeManageImdae = '#stepIncomeManageImdae',
		_txtIncomeManageImdae = '#txtIncomeManageImdae',
		_WIncomeManageImdae = '#WIncomeManageImdae',
		_ratioIncomeManageImdae = '#ratioIncomeManageImdae',
		_WIncomeManage = '#WIncomeManage',
		_ratioIncomeManage = '#ratioIncomeManage',
		_WIncome = '#WIncome',
		_ratioIncome = '#ratioIncome',
		_WJichool = '#WJichool',
		_WMymoney = '#WMymoney',
		_WMaechool = '#WMaechool',
		_ratioMaechool = '#ratioMaechool',
		_WGyeongsang = '#WGyeongsang',
		_ratioGyeongsang = '#ratioGyeongsang',
		_address = null;
		
	sujibunseog.getStepOwnTermId = function() { return _stepOwnTerm; }
	sujibunseog.getStepOtherAssetRatioId = function() { return _stepOtherAssetRatio; }
	sujibunseog.getTxtPurchaseId = function() { return _txtPurchase; }
	sujibunseog.getStepPurchaseId = function() { return _stepPurchase; }
	sujibunseog.getWPurchaseId = function() { return _WPurchase; }
	sujibunseog.getRatioPurchaseId = function() { return _ratioPurchase; }
	sujibunseog.getTxtMyeongdobiId = function() { return _txtMyeongdobi; }
	sujibunseog.getStepMyeongdobiId = function() { return _stepMyeongdobi; }
	sujibunseog.getWMyeongdobiId = function() { return _WMyeongdobi; }
	sujibunseog.getRatioMyeongdobiId = function() { return _ratioMyeongdobi; }
	sujibunseog.getTxtAcceptLandUseId = function() { return _txtAcceptLandUse; }
	sujibunseog.getStepAcceptLandUseId = function() { return _stepAcceptLandUse; }
	sujibunseog.getWAcceptLandUseId = function() { return _WAcceptLandUse; }
	sujibunseog.getRatioAcceptLandUseId = function() { return _ratioAcceptLandUse; }
	sujibunseog.getWTojibiId = function() { return _WTojibi; }
	sujibunseog.getRatioTojibiId = function() { return _ratioTojibi; }
	sujibunseog.getTxtDaechulIjaId = function() { return _txtDaechulIja; }
	sujibunseog.getStepDaechulIjaId = function() { return _stepDaechulIja; }
	sujibunseog.getWDaechulIjaId = function() { return _WDaechulIja; }
	sujibunseog.getRatioDaechulIjaId = function() { return _ratioDaechulIja; }
	sujibunseog.getTxtChwideugseId = function() { return _txtChwideugse; }
	sujibunseog.getStepChwideugseId = function() { return _stepChwideugse; }
	sujibunseog.getWChwideugseId = function() { return _WChwideugse; }
	sujibunseog.getRatioChwideugseId = function() { return _ratioChwideugse; }
	sujibunseog.getTxtJaesanseT1Id = function() { return _txtJaesanseT1; }
	sujibunseog.getTxtJaesanseH1Id = function() { return _txtJaesanseH1; }
	sujibunseog.getTxtJaesanseT2Id = function() { return _txtJaesanseT2; }
	sujibunseog.getTxtJaesanseH2Id = function() { return _txtJaesanseH2; }
	sujibunseog.getStepJaesanseT3Id = function() { return _stepJaesanseT3; }
	sujibunseog.getTxtJaesanseH3Id = function() { return _txtJaesanseH3; }
	sujibunseog.getWJaesanseId = function() { return _WJaesanse; }
	sujibunseog.getWJaesanse2Id = function() { return _WJaesanse2; }
	sujibunseog.getRatioJaesanseId = function() { return _ratioJaesanse; }
	sujibunseog.getStepYangdoseId = function() { return _stepYangdose; }
	sujibunseog.getStepYangdose2Id = function() { return _stepYangdose2; }
	sujibunseog.getWYangdoseId = function() { return _WYangdose; }
	sujibunseog.getRatioYangdoseId = function() { return _ratioYangdose; }
	sujibunseog.getWJesegeumId = function() { return _WJesegeum; }
	sujibunseog.getRatioJesegeumId = function() { return _ratioJesegeum; }
	sujibunseog.getTxtGeonchugGongsaId = function() { return _txtGeonchugGongsa; }
	sujibunseog.getStepGeonchugGongsaId = function() { return _stepGeonchugGongsa; }
	sujibunseog.getWGeonchugGongsaId = function() { return _WGeonchugGongsa; }
	sujibunseog.getRatioGeonchugGongsaId = function() { return _ratioGeonchugGongsa; }
	sujibunseog.getTxtTomogGongsaId = function() { return _txtTomogGongsa; }
	sujibunseog.getStepTomogGongsaId = function() { return _stepTomogGongsa; }
	sujibunseog.getWTomogGongsaId = function() { return _WTomogGongsa; }
	sujibunseog.getRatioTomogGongsaId = function() { return _ratioTomogGongsa; }
	sujibunseog.getTxtPojangGongsaId = function() { return _txtPojangGongsa; }
	sujibunseog.getStepPojangGongsaId = function() { return _stepPojangGongsa; }
	sujibunseog.getWPojangGongsaId = function() { return _WPojangGongsa; }
	sujibunseog.getRatioPojangGongsaId = function() { return _ratioPojangGongsa; }
	sujibunseog.getTxtInibGongsaId = function() { return _txtInibGongsa; }
	sujibunseog.getStepInibGongsaId = function() { return _stepInibGongsa; }
	sujibunseog.getWInibGongsaId = function() { return _WInibGongsa; }
	sujibunseog.getRatioInibGongsaId = function() { return _ratioInibGongsa; }
	sujibunseog.getWGongsabiId = function() { return _WGongsabi; }
	sujibunseog.getRatioGongsabiId = function() { return _ratioGongsabi; }
	sujibunseog.getTxtAcceptGaebalId = function() { return _txtAcceptGaebal; }
	sujibunseog.getStepAcceptGaebalId = function() { return _stepAcceptGaebal; }
	sujibunseog.getWAcceptGaebalId = function() { return _WAcceptGaebal; }
	sujibunseog.getRatioAcceptGaebalId = function() { return _ratioAcceptGaebal; }
	sujibunseog.getTxtGamriId = function() { return _txtGamri; }
	sujibunseog.getStepGamriId = function() { return _stepGamri; }
	sujibunseog.getWGamriId = function() { return _WGamri; }
	sujibunseog.getRatioGamriId = function() { return _ratioGamri; }
	sujibunseog.getTxtCheuglyangId = function() { return _txtCheuglyang; }
	sujibunseog.getStepCheuglyangId = function() { return _stepCheuglyang; }
	sujibunseog.getWCheuglyangId = function() { return _WCheuglyang; }
	sujibunseog.getRatioCheuglyangId = function() { return _ratioCheuglyang; }
	sujibunseog.getTxtEvalueGamjeungId = function() { return _txtEvalueGamjeung; }
	sujibunseog.getStepEvalueGamjeungId = function() { return _stepEvalueGamjeung; }
	sujibunseog.getWEvalueGamjeungId = function() { return _WEvalueGamjeung; }
	sujibunseog.getRatioEvalueGamjeungId = function() { return _ratioEvalueGamjeung; }
	sujibunseog.getTxtSplitPiljiId = function() { return _txtSplitPilji; }
	sujibunseog.getStepSplitPiljiId = function() { return _stepSplitPilji; }
	sujibunseog.getWSplitPiljiId = function() { return _WSplitPilji; }
	sujibunseog.getRatioSplitPiljiId = function() { return _ratioSplitPilji; }
	sujibunseog.getWInheogabiId = function() { return _WInheogabi; }
	sujibunseog.getRatioInheogabiId = function() { return _ratioInheogabi; }
	sujibunseog.getTxtDevBudamId = function() { return _txtDevBudam; }
	sujibunseog.getStepDevBudamId = function() { return _stepDevBudam; }
	sujibunseog.getWDevBudamId = function() { return _WDevBudam; }
	sujibunseog.getTxtFarmBudamId = function() { return _txtFarmBudam; }
	sujibunseog.getStepFarmBudamId = function() { return _stepFarmBudam; }
	sujibunseog.getWFarmBudamId = function() { return _WFarmBudam; }
	sujibunseog.getRatioFarmBudamId = function() { return _ratioFarmBudam; }
	sujibunseog.getRatioDevBudamId = function() { return _ratioDevBudam; }
	sujibunseog.getTxtAlterSanrimId = function() { return _txtAlterSanrim; }
	sujibunseog.getStepAlterSanrimId = function() { return _stepAlterSanrim; }
	sujibunseog.getWAlterSanrimId = function() { return _WAlterSanrim; }
	sujibunseog.getRatioAlterSanrimId = function() { return _ratioAlterSanrim; }
	sujibunseog.getWBudamgeumId = function() { return _WBudamgeum; }
	sujibunseog.getRatioBudamgeumId = function() { return _ratioBudamgeum; }
	sujibunseog.getTxtPurchaseChaegwonId = function() { return _txtPurchaseChaegwon; }
	sujibunseog.getStepPurchaseChaegwonId = function() { return _stepPurchaseChaegwon; }
	sujibunseog.getWPurchaseChaegwonId = function() { return _WPurchaseChaegwon; }
	sujibunseog.getRatioPurchaseChaegwonId = function() { return _ratioPurchaseChaegwon; }
	sujibunseog.getTxtSetGeunjeodangId = function() { return _txtSetGeunjeodang; }
	sujibunseog.getStepSetGeunjeodangId = function() { return _stepSetGeunjeodang; }
	sujibunseog.getWSetGeunjeodangId = function() { return _WSetGeunjeodang; }
	sujibunseog.getRatioSetGeunjeodangId = function() { return _ratioSetGeunjeodang; }
	sujibunseog.getTxtPreserveDeunggiId = function() { return _txtPreserveDeunggi; }
	sujibunseog.getStepPreserveDeunggiId = function() { return _stepPreserveDeunggi; }
	sujibunseog.getWPreserveDeunggiId = function() { return _WPreserveDeunggi; }
	sujibunseog.getRatioPreserveDeunggiId = function() { return _ratioPreserveDeunggi; }
	sujibunseog.getTxtManagementId = function() { return _txtManagement; }
	sujibunseog.getStepManagementId = function() { return _stepManagement; }
	sujibunseog.getWManagementId = function() { return _WManagement; }
	sujibunseog.getRatioManagementId = function() { return _ratioManagement; }
	sujibunseog.getTxtSellSusulyoId = function() { return _txtSellSusulyo; }
	sujibunseog.getStepSellSusulyoId = function() { return _stepSellSusulyo; }
	sujibunseog.getWSellSusulyoId = function() { return _WSellSusulyo; }
	sujibunseog.getRatioSellSusulyoId = function() { return _ratioSellSusulyo; }
	sujibunseog.getTxtPreparationId = function() { return _txtPreparation; }
	sujibunseog.getStepPreparationId = function() { return _stepPreparation; }
	sujibunseog.getWPreparationId = function() { return _WPreparation; }
	sujibunseog.getRatioPreparationId = function() { return _ratioPreparation; }
	sujibunseog.getWSaeobgyeongbiId = function() { return _WSaeobgyeongbi; }
	sujibunseog.getRatioSaeobgyeongbiId = function() { return _ratioSaeobgyeongbi; }
	sujibunseog.getTxtIncomeSellBuildingId = function() { return _txtIncomeSellBuilding; }
	sujibunseog.getStepIncomeSellBuildingId = function() { return _stepIncomeSellBuilding; }
	sujibunseog.getWIncomeSellBuildingId = function() { return _WIncomeSellBuilding; }
	sujibunseog.getRatioIncomeSellBuildingId = function() { return _ratioIncomeSellBuilding; }
	sujibunseog.getTxtIncomeSellSeolbiId = function() { return _txtIncomeSellSeolbi; }
	sujibunseog.getStepIncomeSellSeolbiId = function() { return _stepIncomeSellSeolbi; }
	sujibunseog.getWIncomeSellSeolbiId = function() { return _WIncomeSellSeolbi; }
	sujibunseog.getRatioIncomeSellSeolbiId = function() { return _ratioIncomeSellSeolbi; }
	sujibunseog.getTxtIncomeSellLandId = function() { return _txtIncomeSellLand; }
	sujibunseog.getStepIncomeSellLandId = function() { return _stepIncomeSellLand; }
	sujibunseog.getWIncomeSellLandId = function() { return _WIncomeSellLand; }
	sujibunseog.getRatioIncomeSellLandId = function() { return _ratioIncomeSellLand; }
	sujibunseog.getWIncomeSellId = function() { return _WIncomeSell; }
	sujibunseog.getRatioIncomeSellId = function() { return _ratioIncomeSell; }
	sujibunseog.getStepIncomeManageImdaeId = function() { return _stepIncomeManageImdae; }
	sujibunseog.getTxtIncomeManageImdaeId = function() { return _txtIncomeManageImdae; }
	sujibunseog.getWIncomeManageImdaeId = function() { return _WIncomeManageImdae; }
	sujibunseog.getRatioIncomeManageImdaeId = function() { return _ratioIncomeManageImdae; }
	sujibunseog.getWIncomeManageId = function() { return _WIncomeManage; }
	sujibunseog.getRatioIncomeManageId = function() { return _ratioIncomeManage; }
	sujibunseog.getWIncomeId = function() { return _WIncome; }
	sujibunseog.getRatioIncomeId = function() { return _ratioIncome; }
	sujibunseog.getWJichoolId = function() { return _WJichool; }
	sujibunseog.getWMymoneyId = function() { return _WMymoney; }
	sujibunseog.getWMaechoolId = function() { return _WMaechool; }
	sujibunseog.getRatioMaechoolId = function() { return _ratioMaechool; }
	sujibunseog.getWGyeongsangId = function() { return _WGyeongsang; }
	sujibunseog.getRatioGyeongsangId = function() { return _ratioGyeongsang; }
	
	sujibunseog.getChkYangdoseId = function() { return _chkYangdose; } 
	sujibunseog.getRadioGaeinId = function() { return _radioGaein; } 
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
	
	function _isOwnGaein() {
		return $('#radioGaein').is(':checked');
	}
	
	sujibunseog.getPdfParams = function() {
		return {
			fileName:'sujibunseogFormPdf',
			cssName: 'pdf',
			docName: '수지분석',
			address: _address,
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
	
	sujibunseog.isOwnGaein = _isOwnGaein;
	
	sujibunseog.init = function(param) {
		_address = param.address
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
		
		//공시지가 변동보기
		$(_btnSujiGongsiHistory)
		.off('click')
		.on('click', function() {
			//hotplace.dom.showServiceReady();
			var pnu = $(this).data('pnu');
			
			hotplace.ajax({
	    	    url: 'search/sujiboonseog/gongsi_history?pnu=' + pnu,
				method: 'GET',
				success: function(data, textStatus, jqXHR) {
					console.log(data)
					
					if(data.success) {
						var datas = data.datas;
						if(datas[0] == null) {
							hotplace.dom.showAlertMsg(null, '공시지가 변동내역이 없습니다', {width:400});
							return;
						}
						hotplace.dom.showSujiGongsiHistory(null, {history: datas});
					}
					else {
						var errCode = data.errCode;
						if(errCode)	jqXHR.errCode = errCode;
					}
				}
	       });
			
		});
		
		//luris 도면 이미지 보기
		$(_dvSujiLurisDrawing + ' a')
		.off('click')
		.on('click', function() {
			var $img = $(this).children();
			var imgSrc = $img.prop('src');
			
			hotplace.dom.showSujiLurisDrawing({width:700}, {src:imgSrc});
		});
		
		//수지분석 pdf 다운로드
		$(_btnSujibunseogPdf)
		.off('click')
		.on('click', function() {
			hotplace.report.PDF.sujibunseog();
		});
		
		//var stepYangdose2 = $('#stepYangdose2');
		
		//매입주체 
		$('input[name="radioOwn"]').on('click', function(e) {
			hotplace.calc.sujibunseog.calcYangdose();
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