/**
 * @namespace hotplace.calc
 */
(function(calc, $) {
	/**
	 * @memberof hotplace.calc
	 * @name sujibunseog
	 * @type {object} 
	 * @property {object} defaultValue
	 * @property {string} defaultValue.own - 매입(보유)주체 ('gaein' | 'beobin')
	 * @property {number} defaultValue.ownTerm - 보유기간 (0 - 10년)
	 * @property {number} defaultValue.otherAssetRatio - 타인자본비율(0 - 100%)   
	 * 
	 * @property {function} initCalc 				로딩시 기본적으로 수행하는 연산 초기화
	 * @property {function} calcOwnTerm				보유기간 연산함수  
	 * @property {function} calcPurchase 			매입금액 연산함수
	 * @property {function} calcMyeongdobi 			명도비 연산함수
	 * @property {function} calcAcceptLandUse 		토지사용승낙 연산함수
	 * @property {function} calcDaechulIja 			대출이자 연산함수
	 * @property {function} calcChwideugse 			취득세 연산함수
	 * @property {function} calcJaesanse 			재산세 연산함수
	 * @property {function} calcYangdose 			양도세 연산함수
	 * @property {function} calcGeonchugGongsa		건축공사비 연산함수  
	 * @property {function} calcTomogGongsa			토목공사비 연산함수
	 * @property {function} calcPojangGongsa		포장공사비 연산함수
	 * @property {function} calcInibGongsa  		인입공사비 연산함수
	 * @property {function} calcAcceptGaebal  		개발행위허가 연산함수
	 * @property {function} calcGamri  		    	감리비 연산함수
	 * @property {function} calcCheuglyang	    	측량비 연산함수
	 * @property {function} calcEvalueGamjeung  	감정평가비 연산함수
	 * @property {function} calcSplitPilji      	필지분할비 연산함수
	 * @property {function} calcDevBudam			개발부담금 연산함수
	 * @property {function} calcFarmBudam  			농지보전부담금 연산함수
	 * @property {function} calcAlterSanrim  		대체산림자원조성비 연산함수
	 * @property {function} calcPurchaseChaegwon	채권매입비 연산함수
	 * @property {function} calcSetGeunjeodang      근저당설정비 연산함수
	 * @property {function} calcPreserveDeunggi     보존등기비 연산함수
	 * @property {function} calcManagement          운영비 연산함수
	 * @property {function} calcSellSusulyo         매각수수료 연산함수
	 * @property {function} calcPreparation         예비비 연산함수
	 * @property {function} calcIncomeSellBuilding  수입>매각>건물 연산함수
	 * @property {function} calcIncomeSellSeolbi    수입>매각>설비 연산함수
	 * @property {function} calcIncomeSellLand  	수입>매각>토지 연산함수
	 * @property {function} calcIncomeManageImdae	수입>운영>임대 연산함수
	 */
	calc.sujibunseog = function() {
		
		/**
		 * @private
		 * @property {object} defaultValue 
		 * @property {string} own - 매입(보유)주체 ('gaein' | 'beobin')
		 * @property {number} ownTerm - 보유기간 (0 - 10년)
		 * @property {number} otherAssetRatio - 타인자본비율(0 - 100%)    
		 */
		var defaultValue = {
			own: 'gaein',
			ownTerm:3,
			otherAssetRatio:70,
			myeongdobi:0,
			acceptLandUse:0,
			daechulIja:'5.0',
			chwideugse:4.6,
			jaesanse:0.07,
		}
		
		/**
		 * @private
		 * @function onChangeOwn
		 * @desc 매입(보유)주체 event
		 */
		function onBindOwn() {
			$(document).on('click', 'input[type="radio"][name="radioOwn"]', function(e) {
				own = $(this).val();
			});
		}
		
		var data = null;
		var moneyUnit = 1;
		/**
		 * @private 
		 * @function initCalc
		 * @desc 로딩시 기본적으로 수행하는 연산 초기화
		 */
		function initCalc(params) {
			/*data = params;
			var $txtPurchase = $('#txtPurchase');
			var area = $txtPurchase.data('value');
			//var pyeung = Math.round(area * 0.3025);
			var val = (pyeung * data.valPerPyeung)/moneyUnit;
			$txtPurchase.val(pyeung + '㎡');
			$txtPurchase.data('value', pyeung);*/
			
			calc.sujibunseog.calcPurchase();
			//calc.sujibunseog.calcYangdose(true);
			calc.sujibunseog.calcGeonchugGongsa(true);
			calc.sujibunseog.calcTomogGongsa(true);
			calc.sujibunseog.calcPojangGongsa(true);
			calc.sujibunseog.calcInibGongsa(true);
			calc.sujibunseog.calcAcceptGaebal();			//인허가비 > 개발행위허가 등
			calc.sujibunseog.calcCheuglyang();				//인허가비 > 측량비
			calc.sujibunseog.calcEvalueGamjeung();			//인허가비 > 감정평가
			calc.sujibunseog.calcSplitPilji();				//인허가비 > 필지분할
			calc.sujibunseog.calcDevBudam();				//부담금 > 개별부담금
			calc.sujibunseog.calcFarmBudam();				//부담금 > 농지보전부담금
			calc.sujibunseog.calcAlterSanrim();				//부담금 > 대체산림자원조성비
			calc.sujibunseog.calcIncomeSellLand();			//매각 > 토지
			calc.sujibunseog.calcManagement();				//사업경비 > 운영비
			calc.sujibunseog.calcIncomeSellSeolbi();		//매각 > 설비
			calc.sujibunseog.calcIncomeSellLand();			//매각 > 토지
			calc.sujibunseog.calcIncomeManageImdae();		//운영 > 임대
			
			//다른 모든 초기화가 끝나고 양도세를 세팅한다
			//calc.sujibunseog.calcYangdose(true);
			
		}
		
		/**
		 * @private 
		 * @function makeStep
		 * @returns {number} 입력값의 백분율 값
		 * @desc 입력값의 백분율 값으로 spinner의 step값을 설정
		 */
		function makeStep(value, percent) {
			value = value.toString();
			var len = value.length;
			var s = value.slice(0,1);
			
			for(var i=0; i<len-1; i++) {
				s += '0';
			}
			
			return Math.round(parseInt(s) * 0.01 * percent);
		}
		
		
		function calcRatio(selectorRatio, Warray, sum) {
			var WarrayLen = Warray.length;
			var v = 0;
			
			for(var i=0; i<WarrayLen; i++) {
				v += parseInt($(Warray[i]).data('value'));
			}
			
			$(selectorRatio).text(Math.floor((v/sum) * 100 * 100)/100);
		}
		/**
		 * @private 
		 * @function calcJichoolRatio
		 * @desc 비율
		 */
		function calcJichoolRatio(sum) {
			var suji = hotplace.sujibunseog;
			
			calcRatio(suji.getRatioPurchaseId(), [suji.getWPurchaseId()], sum);							//매입금액 
			calcRatio(suji.getRatioMyeongdobiId(), [suji.getWMyeongdobiId()], sum);						//명도비 
			calcRatio(suji.getRatioAcceptLandUseId(), [suji.getWAcceptLandUseId()], sum);				//토지사용승낙 
			calcRatio(suji.getRatioTojibiId(), [suji.getWTojibiId()], sum);								//[토지비 비율]
			calcRatio(suji.getRatioDaechulIjaId(), [suji.getWDaechulIjaId()], sum);						//대출이자
			calcRatio(suji.getRatioChwideugseId(), [suji.getWChwideugseId()], sum);						//취득세
			calcRatio(suji.getRatioJaesanseId(), [suji.getWJaesanseId(), suji.getWJaesanse2Id()], sum);	//재산세
			calcRatio(suji.getRatioYangdoseId(), [suji.getWYangdoseId()], sum);							//양도세
			calcRatio(suji.getRatioJesegeumId(), [suji.getWJesegeumId()], sum);							//[제세금 비율]
			calcRatio(suji.getRatioGeonchugGongsaId(), [suji.getWGeonchugGongsaId()], sum);				//건축공사비
			calcRatio(suji.getRatioTomogGongsaId(), [suji.getWTomogGongsaId()], sum);					//토목공사비
			calcRatio(suji.getRatioPojangGongsaId(), [suji.getWPojangGongsaId()], sum);					//포장공사비
			calcRatio(suji.getRatioInibGongsaId(), [suji.getWInibGongsaId()], sum);						//인입공사비
			calcRatio(suji.getRatioGongsabiId(), [suji.getWGongsabiId()], sum);							//[공사비 비율]
			calcRatio(suji.getRatioAcceptGaebalId(), [suji.getWAcceptGaebalId()], sum);					//개발행위허가 등
			calcRatio(suji.getRatioGamriId(), [suji.getWGamriId()], sum);								//감리비
			calcRatio(suji.getRatioCheuglyangId(), [suji.getWCheuglyangId()], sum);						//측량비
			calcRatio(suji.getRatioEvalueGamjeungId(), [suji.getWEvalueGamjeungId()], sum);				//감정평가
			calcRatio(suji.getRatioSplitPiljiId(), [suji.getWSplitPiljiId()], sum);						//필지분할
			calcRatio(suji.getRatioInheogabiId(), [suji.getWInheogabiId()], sum);						//[인허가비 비율]
			calcRatio(suji.getRatioDevBudamId(), [suji.getWDevBudamId()], sum);							//개발부담금
			calcRatio(suji.getRatioFarmBudamId(), [suji.getWFarmBudamId()], sum);						//농지보전부담금
			calcRatio(suji.getRatioAlterSanrimId(), [suji.getWAlterSanrimId()], sum);					//대체산림자원조성비
			calcRatio(suji.getRatioBudamgeumId(), [suji.getWBudamgeumId()], sum);						//부담금
			calcRatio(suji.getRatioPurchaseChaegwonId(), [suji.getWPurchaseChaegwonId()], sum);			//채권매입비
			calcRatio(suji.getRatioSetGeunjeodangId(), [suji.getWSetGeunjeodangId()], sum);				//근저당설정비
			calcRatio(suji.getRatioPreserveDeunggiId(), [suji.getWPreserveDeunggiId()], sum);			//보존등기비
			calcRatio(suji.getRatioManagementId(), [suji.getWManagementId()], sum);						//운영비
			calcRatio(suji.getRatioSellSusulyoId(), [suji.getWSellSusulyoId()], sum);					//매각수수료
			calcRatio(suji.getRatioPreparationId(), [suji.getWPreparationId()], sum);					//예비비
			calcRatio(suji.getRatioSaeobgyeongbiId(), [suji.getWSaeobgyeongbiId()], sum);				//[사업경비 비율]
		}
		
		function calcIncomeRatio(sum) {
			var suji = hotplace.sujibunseog;
			
			calcRatio(suji.getRatioIncomeSellBuildingId(), [suji.getWIncomeSellBuildingId()], sum);		//건물
			calcRatio(suji.getRatioIncomeSellSeolbiId(), [suji.getWIncomeSellSeolbiId()], sum);			//설비
			calcRatio(suji.getRatioIncomeSellLandId(), [suji.getWIncomeSellLandId()], sum);				//토지
			calcRatio(suji.getRatioIncomeSellId(), [suji.getWIncomeSellId()], sum);						//[매각 비율]
			calcRatio(suji.getRatioIncomeManageImdaeId(), [suji.getWIncomeManageImdaeId()], sum);		//임대
			calcRatio(suji.getRatioIncomeManageId(), [suji.getWIncomeManageId()], sum);					//[운영 비율]
		}
		
		/**
		 * @private 
		 * @function calcTojibi
		 * @desc 토지비 (매입금액, 명도비, 토지사용승낙)
		 */
		function calcTojibi(changedEl) {
			console.log('토지비 (매입금액, 명도비, 토지사용승낙)');
			var suji = hotplace.sujibunseog;
			var $$1 = $(suji.getWPurchaseId()).data('value');
			var $$2 = $(suji.getWMyeongdobiId()).data('value');
			var $$3 = $(suji.getWAcceptLandUseId()).data('value');
			var $$r = parseFloat($$1) + parseFloat($$2) + parseFloat($$3);
			
			var $WTojibi = $(suji.getWTojibiId());
			$WTojibi.data('value', $$r)
			$WTojibi.val($$r.toString().money());
			calcJichool();
		}
		

		
		/**
		 * @private 
		 * @function calcJesegeum
		 * @desc 제세금 (취득세,재산세,양도세)
		 */
		function calcJesegeum(fromYangdose) {
			console.log('제세금 (취득세,재산세,양도세)');
			var suji = hotplace.sujibunseog;
			var $$1 = $(suji.getWChwideugseId()).data('value');
			var $$2 = $(suji.getWJaesanseId()).data('value');
			var $$2_1 = $(suji.getWJaesanse2Id()).data('value');
			var $$3 = $(suji.getWYangdoseId()).data('value');
			var $$r = parseFloat($$1) + parseFloat($$2) + parseFloat($$2_1) + parseFloat($$3);
			
			var $WJesegeum = $(suji.getWJesegeumId());
			$WJesegeum.data('value', $$r)
			$WJesegeum.val($$r.toString().money());
			
			calcJichool(fromYangdose);
		}
		
		/**
		 * @private 
		 * @function calcGongsabi
		 * @desc 공사비 (건축공사비, 토목공사비, 포장공사비, 인입공사비)
		 */
		function calcGongsabi() {
			console.log('공사비 (건축공사비, 토목공사비, 포장공사비, 인입공사비)');
			var suji = hotplace.sujibunseog;
			var $$1 = $(suji.getWGeonchugGongsaId()).data('value');
			var $$2 = $(suji.getWTomogGongsaId()).data('value');
			var $$3 = $(suji.getWPojangGongsaId()).data('value');
			var $$4 = $(suji.getWInibGongsaId()).data('value');
			
			var $$r = $$1 + $$2 + $$3 + $$4;
			
			var $WGongsabi = $(suji.getWGongsabiId());
			$WGongsabi.data('value', $$r);
			$WGongsabi.val($$r.toString().money());
			
			//감리비 : 공사비 X 비율
			hotplace.calc.sujibunseog.calcGamri(true);
			//보존등기비 : 공사비 X 비율
			hotplace.calc.sujibunseog.calcPreserveDeunggi(true);
			calcJichool();
		}
		
		/**
		 * @private 
		 * @function calcInheogabi
		 * @desc 인허가비 (개발행위, 감리비, 측량비, 감정평가, 필지분할)
		 */
		function calcInheogabi() {
			console.log('인허가비 (개발행위, 감리비, 측량비, 감정평가, 필지분할)');
			var suji = hotplace.sujibunseog;
			var $WAcceptGaebal = $(suji.getWAcceptGaebalId());
			var $WGamri = $(suji.getWGamriId());
			var $WCheuglyang = $(suji.getWCheuglyangId());
			var $WEvalueGamjeung = $(suji.getWEvalueGamjeungId());
			var $WSplitPilji = $(suji.getWSplitPiljiId());
			
			var $WInheogabi = $(suji.getWInheogabiId());
			
			var $$1 = parseInt($WAcceptGaebal.data('value'));
			var $$2 = parseInt($WGamri.data('value'));
			var $$3 = parseInt($WCheuglyang.data('value'));
			var $$4 = parseInt($WEvalueGamjeung.data('value'));
			var $$5 = parseInt($WSplitPilji.data('value'));
			var $$r = $$1 + $$2 + $$3 + $$4 + $$5;
			
			$WInheogabi.data('value', $$r);
			$WInheogabi.val($$r.toString().money());
			calcJichool();
		}
		
		/**
		 * @private 
		 * @function calcBudamgeum
		 * @desc 부담금 (개발부담금, 농지보전부담금, 대체산림자원조성비)
		 */
		function calcBudamgeum() {
			console.log('부담금 (개발부담금, 농지보전부담금, 대체산림자원조성비)');
			var suji = hotplace.sujibunseog;
			var $WBudamgeum = $(suji.getWBudamgeumId());
			var $WDevBudam = $(suji.getWDevBudamId());
			var $WFarmBudam = $(suji.getWFarmBudamId());
			var $WAlterSanrim = $(suji.getWAlterSanrimId());
			
			var $$1 = $WDevBudam.data('value');
			var $$2 = $WFarmBudam.data('value');
			var $$3 = $WAlterSanrim.data('value');
			var $$r = $$1 + $$2 + $$3;
			
			$WBudamgeum.data('value', $$r);
			$WBudamgeum.val($$r.toString().money());
			
			calcJichool();
		}
		
		/**
		 * @private 
		 * @function calcSaeobgyeongbi
		 * @desc 사업경비(채권매입비, 근저당설정비, 보존등기비, 운영비, 매각수수료, 예비비)
		 */
		function calcSaeobgyeongbi() {
			console.log('사업경비(채권매입비, 근저당설정비, 보존등기비, 운영비, 매각수수료, 예비비)');
			var suji = hotplace.sujibunseog;
			var $WPurchaseChaegwon =$(suji.getWPurchaseChaegwonId());
			var $WSetGeunjeodang = $(suji.getWSetGeunjeodangId());
			var $WPreserveDeunggi = $(suji.getWPreserveDeunggiId());
			var $WManagement = $(suji.getWManagementId());
			var $WSellSusulyo = $(suji.getWSellSusulyoId());
			var $WPreparation = $(suji.getWPreparationId());
			
			var $$1 = parseInt($WPurchaseChaegwon.data('value'));
			var $$2 = parseInt($WSetGeunjeodang.data('value'));
			var $$3 = parseInt($WPreserveDeunggi.data('value'));
			var $$4 = parseInt($WManagement.data('value'));
			var $$5 = parseInt($WSellSusulyo.data('value'));
			var $$6 = parseInt($WPreparation.data('value'));
			var $$r = $$1 + $$2 + $$3 + $$4 + $$5 + $$6;
			
			var $WSaeobgyeongbi = $(suji.getWSaeobgyeongbiId());
			$WSaeobgyeongbi.data('value', $$r);
			$WSaeobgyeongbi.val($$r.toString().money());
			calcJichool();
		}
		
		/**
		 * @private 
		 * @function calcJichool
		 * @desc 지출합계(토지비, 제세금, 공사비, 인허가비, 부담금, 사업경비)
		 */
		function calcJichool(fromYangdose) {
			console.log('지출합계(토지비, 금융비용, 제세금, 공사비, 인허가비, 부담금, 사업경비)');
			var suji = hotplace.sujibunseog;
			//토지비
			var WTojibi = $(suji.getWTojibiId()).data('value');
			//대출이자
			var WDaechulIja = $(suji.getWDaechulIjaId()).data('value');
			//제세금
			
			var WJesegeum = $(suji.getWJesegeumId()).data('value');
			var WYangdose = $(suji.getWYangdoseId()).data('value')
			if(fromYangdose) {
				WJesegeum = isNaN(WJesegeum) ? 0 : WJesegeum;
			} 
			else {
				WJesegeum = isNaN(WJesegeum) ? 0 : WJesegeum;
				WYangdose = isNaN(WYangdose) ? 0 : WYangdose;
				WJesegeum = WJesegeum - WYangdose;
			}

			console.log(WJesegeum);
			//공사비
			var WGongsabi = $(suji.getWGongsabiId()).data('value');
			//인허가비
			var WInheogabi = $(suji.getWInheogabiId()).data('value');
			//부담금
			var WBudamgeum = $(suji.getWBudamgeumId()).data('value');
			//사업경비
			var WSaeobgyeongbi = $(suji.getWSaeobgyeongbiId()).data('value');
			
			var $WJichool = $(suji.getWJichoolId());
			var $$r = parseFloat(WTojibi) + parseFloat(WDaechulIja) + parseFloat(WJesegeum) + 
					  parseFloat(WGongsabi) + parseFloat(WInheogabi) + parseFloat(WBudamgeum) + parseFloat(WSaeobgyeongbi);
			
			
			$WJichool.data('value', $$r);
			$WJichool.val($$r.toString().money());
			
			calcJichoolRatio($$r);
			calcMaechool();
			
//			if(fromYangdose) {
//				calcJichoolRatio($$r);
//				calcMaechool();
//			}
//			else {
//				calc.sujibunseog.calcYangdose(true);
//			}
			
		}
		
		/**
		 * @private 
		 * @function calcIncomeSell
		 * @desc 수입>매각(건물,설비,토지)
		 */
		function calcIncomeSell() {
			console.log('수입>매각(건물,설비,토지)');
			var suji = hotplace.sujibunseog;
			var $WIncomeSellBuilding = $(suji.getWIncomeSellBuildingId());
			var $WIncomeSellSeolbi = $(suji.getWIncomeSellSeolbiId());
			var $WIncomeSellLand = $(suji.getWIncomeSellLandId());
			
			var $$r = parseInt($WIncomeSellBuilding.data('value')) + parseInt($WIncomeSellSeolbi.data('value')) + parseInt($WIncomeSellLand.data('value'))
			var $WIncomeSell = $(suji.getWIncomeSellId());
			$WIncomeSell.data('value', $$r);
			$WIncomeSell.val($$r.toString().money());
			
			//사업경비 > 매각수수료
			calc.sujibunseog.calcSellSusulyo(true);
			
			//양도세(매각-지출합계-양도세)
			//calc.sujibunseog.calcYangdose(true);
			calcIncome();
		}
		
		/**
		 * @private 
		 * @function calcIncomeManage
		 * @desc 수입>운영(임대)
		 */
		function calcIncomeManage() {
			console.log('수입>운영(임대)');
			var suji = hotplace.sujibunseog;
			var $WIncomeManageImdae = $(suji.getWIncomeManageImdaeId());
			
			var $$r = parseInt($WIncomeManageImdae.data('value'));
			
			var $WIncomeManage = $(suji.getWIncomeManageId());
			$WIncomeManage.data('value', $$r);
			$WIncomeManage.val($$r.toString().money());
			calcIncome();
		}
		
		/**
		 * @private 
		 * @function calcIncome
		 * @desc 수입합계
		 */
		function calcIncome() {
			console.log('수입합계');
			var suji = hotplace.sujibunseog;
			//매각 + 운영
			var $WIncomeSell = $(suji.getWIncomeSellId());
			var $WIncomeManage = $(suji.getWIncomeManageId());
			var $$1 = parseInt($WIncomeSell.data('value'));
			var $$2 = parseInt($WIncomeManage.data('value'));
			var $$r = $$1 + $$2;
			
			var $WIncome = $(suji.getWIncomeId());
			$WIncome.data('value', $$r);
			$WIncome.val($$r.toString().money());
			
			//사업경비 > 예비비
			calc.sujibunseog.calcPreparation(true);
			
			calcIncomeRatio($$r);
			calcMaechool();
		}
		
		/**
		 * @private 
		 * @function calcMymoney
		 * @desc 자기자본 총액 (매입금액 + 명도비 + 토지사용승낙 + 취득세 + 공사비 + 개발행위허가 + 부담금 + 
		 *          		채권매입비 + 근저당설정비 + 보존등기비)
		 */
		function calcMymoney() {
			console.log('자기자본 총액');
			var suji = hotplace.sujibunseog;
			//매입금액의 30%
			var purchase30 = parseFloat($(suji.getWPurchaseId()).data('value') || 0) * 0.3;
			//명도비
			var myeongdobi = parseFloat($(suji.getWMyeongdobiId()).data('value') || 0);
			//토지사용승낙
			var acceptLandUse = parseFloat($(suji.getWAcceptLandUseId()).data('value') || 0);
			//취득세
			var chwideugse = parseFloat($(suji.getWChwideugseId()).data('value') || 0);
			//건축공사비
			var geonchugGongsa = parseFloat($(suji.getWGeonchugGongsaId()).data('value') || 0);
			//토목공사비
			var tomogGongsa = parseFloat($(suji.getWTomogGongsaId()).data('value') || 0);
			//포장공사비
			var pojangGongsa = parseFloat($(suji.getWPojangGongsaId()).data('value') || 0);
			//인입공사비
			var inibGongsa = parseFloat($(suji.getWInibGongsaId()).data('value') || 0);
			//개발행위허가
			var acceptGaebal = parseFloat($(suji.getWAcceptGaebalId()).data('value') || 0);
			//개발부담금
			var devBudam = parseFloat($(suji.getWDevBudamId()).data('value') || 0);
			//농지보전부담금
			var farmBudam = parseFloat($(suji.getWFarmBudamId()).data('value') || 0);
			//대체산림자원조성비
			var alterSanrim = parseFloat($(suji.getWAlterSanrimId()).data('value') || 0);
			//채권매입비
			var purchaseChaegwon = parseFloat($(suji.getWPurchaseChaegwonId()).data('value') || 0);
			//근저당설정비
			var setGeunjeodang = parseFloat($(suji.getWSetGeunjeodangId()).data('value') || 0);
			//보존등기비
			var preserveDeunggi = parseFloat($(suji.getWPreserveDeunggiId()).data('value') || 0);
			
			var sum = 0;
				sum += purchase30  + myeongdobi   + acceptLandUse;
			    sum += chwideugse;
			    sum += geonchugGongsa + tomogGongsa + pojangGongsa + inibGongsa;
			    sum += acceptGaebal;
			    sum += devBudam + farmBudam + alterSanrim;
			    sum += purchaseChaegwon + setGeunjeodang + preserveDeunggi;
			sum = Math.round(sum) + '';
			    
			$(suji.getWMymoneyId()).val(sum.money());
		}
		
		/**
		 * @private 
		 * @function calcMaechool
		 * @desc 매출이익 (수입-지출)
		 */
		function calcMaechool() {
			console.log('매출이익 (수입-지출)');
			var suji = hotplace.sujibunseog;
			var $WJichool = $(suji.getWJichoolId());
			var $WIncome = $(suji.getWIncomeId());
			var $ratioMaechool = $(suji.getRatioMaechoolId());
			
			var $$1 = parseInt($WIncome.data('value'));
			var $$2 = parseInt($WJichool.data('value'));
			var $$r = $$1 - $$2;
			
			var $WMaechool = $(suji.getWMaechoolId());
			$WMaechool.data('value', $$r);
			$WMaechool.val($$r.toString().money());
			
			$ratioMaechool.text(Math.floor(($$r/$$1) * 100 * 100)/100);
			
			//경상이익
			calcGyeongsang();
		}
		
		/**
		 * @private 
		 * @function calcDevIig
		 * @desc 개발부담금(개발이익) 
		 */
		function calcDevIig() {
			return 0;
		}
		
		function calcGyeongsang() {
			console.log('경상이익');
			var suji = hotplace.sujibunseog;
			//매출이익 - 대출이자
			
			var $WDaechulIja = $(suji.getWDaechulIjaId());
			var $WMaechool = $(suji.getWMaechoolId());
			var $$1 = $WMaechool.data('value');
			var $$2 = $WDaechulIja.data('value'); //대출이자
			var $$r = $$1 - $$2;
			
			var $WGyeongsang = $(suji.getWGyeongsangId());
			var $ratioGyeongsang = $(suji.getRatioGyeongsangId());
			
			$WGyeongsang.data('value', $$r);
			$WGyeongsang.val($$r.toString().money());
			
			//수입합계
			var $WIncome = $(suji.getWIncomeId());
			var $$r2 = $WIncome.data('value');
			$ratioGyeongsang.text(Math.floor(($$r/$$r2) * 100 * 100)/100);
			
			//hotplace.dom.changeTooltipText($WGyeongsang, '<span class="innerTooltip">매출이익(' + $$1.toString().money() +') - 대출이자(' + $$2.toStrong().money() + ')</span>');
		}
		
		return {
			init: function() {
				onBindOwn();
			},
			initCalc: initCalc,
			makeStep: makeStep,
			defaultValue: defaultValue,
			calcOwnTerm: function() {
				hotplace.calc.sujibunseog.calcJaesanse(true);
				hotplace.calc.sujibunseog.calcJaesanse2(true);
				//hotplace.calc.sujibunseog.calcYangdose();
			},
			calcOtherAssetRatio: function() {
				console.log('타인자본비율');
				hotplace.calc.sujibunseog.calcDaechulIja(true);
			},
			calcPurchase: function(initFn) {
				console.log('매입금액');
				//if(initFn) initFn();
				var suji = hotplace.sujibunseog;
				var $$1 = $(suji.getTxtPurchaseId()).data('value');
				var $$2 = $(suji.getStepPurchaseId()).data('value');
				var $$r = Math.round(parseFloat($$1) * parseFloat($$2));
				
				var $WPurchase = $(suji.getWPurchaseId());
				$WPurchase.data('value', $$r);
				$WPurchase.val($$r.toString().money());
				
				//명도비 : 매입금액 * 비율
				hotplace.calc.sujibunseog.calcMyeongdobi(true);
				//토지승낙비 : 매입금액 * 비율
				hotplace.calc.sujibunseog.calcAcceptLandUse(true);
				//대출이자 : 매입가 * 타인자본비율
				hotplace.calc.sujibunseog.calcDaechulIja(true);
				//취득세 : 매입가 * 비율
				hotplace.calc.sujibunseog.calcChwideugse(true);
				//재산세
				hotplace.calc.sujibunseog.calcJaesanse(true);
				//채권매입비
				hotplace.calc.sujibunseog.calcPurchaseChaegwon(true);
				//양도세
				//hotplace.calc.sujibunseog.calcYangdose(true);
				//농지보전부담금
				hotplace.calc.sujibunseog.calcFarmBudam(suji.isFarmBudamGammyeon());
				//대체산림자원조성비
				hotplace.calc.sujibunseog.calcAlterSanrim();
				
				calcMymoney();//자기자본
				calcTojibi();
			},
			calcMyeongdobi: function(isSet) {
				console.log('명도비');
				var suji = hotplace.sujibunseog;
				var $txtMyeongdobi = $(suji.getTxtMyeongdobiId());
				
				if(isSet) {
					var WPurchase = $(suji.getWPurchaseId()).data('value');
					$txtMyeongdobi.data('value', WPurchase);
					$txtMyeongdobi.val(WPurchase.toString().money());
				}
				
				var $stepMyeongdobi = $(suji.getStepMyeongdobiId());
				
				var $$1 = $txtMyeongdobi.data('value');
				var $$2 = $stepMyeongdobi.data('value');
				var $$r = Math.round(parseFloat($$1) * (0.01 * parseFloat($$2)));
				
				var $WMyeongdobi = $(suji.getWMyeongdobiId());
				$WMyeongdobi.data('value', $$r);
				$WMyeongdobi.val($$r.toString().money());
				
				calcMymoney();//자기자본
				calcTojibi();
			},
			calcAcceptLandUse: function(isSet) {
				console.log('토지사용승낙');
				var suji = hotplace.sujibunseog;
				var $txtAcceptLandUse = $(suji.getTxtAcceptLandUseId());
				
				if(isSet) {
					var WPurchase = $(suji.getWPurchaseId()).data('value');
					$txtAcceptLandUse.data('value', WPurchase);
					$txtAcceptLandUse.val(WPurchase.toString().money());
				}
				
				var $stepAcceptLandUse = $(suji.getStepAcceptLandUseId());
				
				var $$1 = $txtAcceptLandUse.data('value');
				var $$2 = $stepAcceptLandUse.data('value');
				var $$r = Math.round(parseFloat($$1) * (0.01 * parseFloat($$2)));
				
				var $WAcceptLandUse = $(suji.getWAcceptLandUseId());
				$WAcceptLandUse.data('value', $$r);
				$WAcceptLandUse.val($$r.toString().money());
				
				calcMymoney();//자기자본
				calcTojibi();
			},
			calcDaechulIja: function(isSet) {
				console.log('대출이자(매입가 X 타인자본 비율)');
				var suji = hotplace.sujibunseog;
				var $txtDaechulIja = $(suji.getTxtDaechulIjaId());
				
				if(isSet) {
					//매입가
					var _$$1 = $(suji.getWPurchaseId()).data('value');
					var _$$2 = $(suji.getStepOtherAssetRatioId()).data('value');
					var _$$r = Math.round(parseFloat(_$$1) * (0.01 * parseFloat(_$$2)));
					
					$txtDaechulIja.data('value', _$$r);
					$txtDaechulIja.val(_$$r.toString().money());
					
					//근저당비 : 대출금 X 130%
					hotplace.calc.sujibunseog.calcSetGeunjeodang(true);
				}
				
				var $stepDaechulIja = $(suji.getStepDaechulIjaId());
				
				var $$1 = $txtDaechulIja.data('value');
				var $$2 = $stepDaechulIja.data('value');
				var $$r = Math.round(parseFloat($$1) * (0.01 * parseFloat($$2)));
				
				var $WDaechulIja = $(suji.getWDaechulIjaId());
				$WDaechulIja.data('value', $$r);
				$WDaechulIja.val($$r.toString().money());
				calcJichool();
				calcGyeongsang();
			},
			calcChwideugse: function(isSet) {
				console.log('취득세(매입가 X 비율)');
				var suji = hotplace.sujibunseog;
				var $txtChwideugse = $(suji.getTxtChwideugseId());
				
				if(isSet) {
					var WPurchase = $(suji.getWPurchaseId()).data('value');
					$txtChwideugse.data('value', WPurchase);
					$txtChwideugse.val(WPurchase.toString().money());
				}
				
				var $stepChwideugse = $(suji.getStepChwideugseId());
				
				var $$1 = $txtChwideugse.data('value');
				var $$2 = $stepChwideugse.data('value');
				var $$r = Math.round(parseFloat($$1) * (0.01 * parseFloat($$2)));
				
				var $WChwideugse = $(suji.getWChwideugseId());
				$WChwideugse.data('value', $$r);
				$WChwideugse.val($$r.toString().money());
				
				calcMymoney();//자기자본
				calcJesegeum();
			},
			calcJaesanse: function(isSet) {
				console.log('재산세');
				var suji = hotplace.sujibunseog;
				//주택외
				var $txtJaesanseT1 = $(suji.getTxtJaesanseT1Id());
				var $txtJaesanseT2 = $(suji.getTxtJaesanseT2Id());
				var $stepJaesanseT3 = $(suji.getStepJaesanseT3Id());
				
				if(isSet) {
					//매입가
					var _$$1 = $(suji.getWPurchaseId()).data('value');
					var _$$2 = $(suji.getStepOwnTermId()).data('value');
					
					$txtJaesanseT1.data('value', _$$1);
					$txtJaesanseT1.val(_$$1.toString().money());
					
					$txtJaesanseT2.data('value', _$$2);
					$txtJaesanseT2.val($(suji.getStepOwnTermId()).val());
				}
				
				var $$1 = $txtJaesanseT1.data('value');
				var $$2 = $txtJaesanseT2.data('value');
				var $$3 = $stepJaesanseT3.data('value');
				var $$r = Math.round(parseFloat($$1) * parseFloat($$2) * (0.01 * parseFloat($$3)));
				
				var $WJaesanse = $(suji.getWJaesanseId());
				$WJaesanse.data('value', $$r);
				$WJaesanse.val($$r.toString().money());
				
				calcJesegeum();
			},
			calcJaesanse2: function(isSet, isInit) {
				var suji = hotplace.sujibunseog;
				var $txtJaesanseH1 = $(suji.getTxtJaesanseH1Id());
				var $txtJaesanseH2 = $(suji.getTxtJaesanseH2Id());
				var $txtJaesanseH3 = $(suji.getTxtJaesanseH3Id());
				var $stepOwnTerm = $(suji.getStepOwnTermId());
				
				if(isSet) {
					$txtJaesanseH2.data('value', $stepOwnTerm.data('value'));
					$txtJaesanseH2.val($stepOwnTerm.val());
				}
				
				if(isInit) {
					$txtJaesanseH1.val('0');
					$txtJaesanseH1.data('value', '0');
					$txtJaesanseH2.val($stepOwnTerm.val());
					$txtJaesanseH2.data('value', $stepOwnTerm.data('value'));
					$txtJaesanseH3.val('0');
					$txtJaesanseH3.data('value', '0');
				}
				
				var $$1 = parseFloat($txtJaesanseH1.data('value'));
				var $$2 = parseFloat($txtJaesanseH2.data('value'));
				var $$3 = 0;
				var $$r = 0;
				var tooltipStr = '';
				
				//6천만원 이하 0.1%
				if($$1 <= 60000000) {
					$$3 = Math.round($$1 * 0.001);
					tooltipStr += '요율 6천만원 이하 0.1% 적용';
				}
				else if($$1 > 60000000 && $$1 <= 150000000) {
					$$3 = Math.round(60000 + ($$1 - 60000000) * 0.0015);
					tooltipStr += '요율 1억 5천만원  이하<br>  (6만원 + 6천만원 초과금액의 0.15%) 적용';
				}
				else if($$1 > 150000000 && $$1 <= 300000000) {
					$$3 = Math.round(195000 + ($$1 - 150000000) * 0.0025);
					tooltipStr += '요율 3억원  이하<br> (19만 5천원 + 1.5억원 초과금액의 0.25%) 적용';
				}
				else {
					$$3 = Math.round(570000 + ($$1 - 300000000) * 0.004);
					tooltipStr += '요율 3억원  초과<br> (57만원 + 3억원 초과금액의 0.4%) 적용';
				}
				
				$$r = Math.round($$2 * $$3);
				
				$txtJaesanseH3.data('value', $$3);
				$txtJaesanseH3.val($$3.toString().money());
				
				var $WJaesanse2 = $(suji.getWJaesanse2Id());
				$WJaesanse2.data('value', $$r);
				$WJaesanse2.val($$r.toString().money());
				calcJesegeum();
				
				hotplace.dom.changeTooltipText($txtJaesanseH3, '<span class="innerTooltip">' + tooltipStr + '<span>');
			},
			calcYangdose: function(isSet, fromCheck) {
				console.log('양도세(매각금액-지출합계-양도세)');
				var suji = hotplace.sujibunseog;
				var $stepYangdose = $(suji.getStepYangdoseId());
				var $stepYangdose2 = $(suji.getStepYangdose2Id());
				var $WYangdose = $(suji.getWYangdoseId());
				
				if(isSet) {
					//var $WPurchase = $(suji.getWPurchaseId());
					var $WIncomeSell = $(suji.getWIncomeSellId());
					var $WJichool = $(suji.getWJichoolId());

					var _$$1 = $WIncomeSell.data('value') - $WJichool.data('value');
					_$$1 = Math.round(_$$1);
					_$$1 = (_$$1 < 0) ? 0 : _$$1;
					$stepYangdose.data('value', _$$1);
					$stepYangdose.val(_$$1.toString().money() + $stepYangdose.data('suffix'));
					
					$stepYangdose.data('step', makeStep(_$$1, hotplace.config.yangdoseStepPercent));
				}
				
				var $$1 = parseInt($stepYangdose.data('value')); 
				var $$2 = 0;
				var isNonSaeob = suji.isNonSaeobYangdose();
				var tooltipStr = '';
				
				//개인
				if(suji.isOwnGaein()) {
					//보유기간
					var term = parseFloat($(suji.getStepOwnTermId()).data('value'));
					if(term < 1) {
						tooltipStr += '1년미만 ' + (isNonSaeob ? '비사업자용 60%' : '50%');
						$$2 = isNonSaeob ? 60 : 50;
					}
					else if(term >=1 && term < 2) {
						tooltipStr += '2년미만 ' + (isNonSaeob ? '비사업자용 50%' : '40%');
						$$2 = isNonSaeob ? 50 : 40;
					}
					else {
						tooltipStr = '2년이상보유 ';
						if($$1 <= 12000000) {
							tooltipStr += '기본세율 1200만원 이하 ' + (isNonSaeob ? '비사업자용 16%(6% + 10%)' : '6%');
							$$2 = isNonSaeob ? 16 : 6;
						}
						else if($$1 > 12000000 && $$1 <= 46000000) {
							tooltipStr += '기본세율 1200만원 초과 ~ 4600만원이하 ' + (isNonSaeob ? '비사업자용 25%(15% + 10%)' : '15%');
							$$2 = isNonSaeob ? 25 : 15;
						}
						else if($$1 > 46000000 && $$1 <= 88000000) {
							tooltipStr += '기본세율 4600만원 초과 ~ 8800만원이하 ' + (isNonSaeob ? '비사업자용 34%(24% + 10%)' : '24%');
							$$2 = isNonSaeob ? 34 : 24;
						}
						else if($$1 > 88000000 && $$1 <= 150000000) {
							tooltipStr += '기본세율 8800만원 초과 ~ 1억5천만원이하 ' + (isNonSaeob ? '비사업자용 45%(35% + 10%)' : '35%');
							$$2 = isNonSaeob ? 45 : 35;
						}
						else if($$1 > 150000000 && $$1 <= 500000000) {
							tooltipStr += '기본세율 1억5천만원 초과 ~ 5억원이하 ' + (isNonSaeob ? '비사업자용 48%(38% + 10%)' : '38%');
							$$2 = isNonSaeob ? 48 : 38;
						}
						else {
							tooltipStr += '기본세율 5억 초과 ' + (isNonSaeob ? '비사업자용 50%(40% + 10%)' : '40%');
							$$2 = isNonSaeob ? 50 : 40;
						}
					}
				}
				else {//법인
					if($$1 <= 200000000) {
						tooltipStr += '(법인세) 2억원 이하 ' + (isNonSaeob ? '비사업자용 20%(10% + 10%)' : '10%');
						$$2 = isNonSaeob ? 20 : 10;
					}
					else if($$1 > 200000000 && $$1 <= 20000000000) {
						tooltipStr += '(법인세) 2억원 초과 ~ 200억 이하  ' + (isNonSaeob ? '비사업자용 30%(20% + 10%)' : '20%');
						$$2 = isNonSaeob ? 30 : 20;
					}
					else {
						tooltipStr += '(법인세) 200억원 초과  ' + (isNonSaeob ? '비사업자용 32%(22% + 10%)' : '22%');
						$$2 = isNonSaeob ? 32 : 22;
					}
				}
				
				$stepYangdose2.data('value', $$2);
				$stepYangdose2.val($$2 + $stepYangdose2.data('suffix'));
				
				var $$r = Math.round($$1 * 0.01 * $$2);
				$WYangdose.data('value', $$r);
				$WYangdose.val($$r.toString().money());
				
				calcJesegeum((fromCheck === true)? true : isSet);
				
				hotplace.dom.changeTooltipText($stepYangdose2, '<span class="innerTooltip">' + tooltipStr +'</span>');
			},
			calcGeonchugGongsa: function(isSet) {
				console.log('건축공사비');
				var suji = hotplace.sujibunseog;
				var $txtGeonchugGongsa = $(suji.getTxtGeonchugGongsaId());
				var $stepGeonchugGongsa = $(suji.getStepGeonchugGongsaId());
				var $WGeonchugGongsa = $(suji.getWGeonchugGongsaId());
				
				if(isSet) {
					var pyeong = Math.round(parseFloat($txtGeonchugGongsa.data('area') / 3.3));
					var _$$1 = pyeong * 4500000;
					$txtGeonchugGongsa.data('value', _$$1);
					$txtGeonchugGongsa.val(_$$1.toString().money());
					
					hotplace.dom.changeTooltipText($txtGeonchugGongsa, '<span class="innerTooltip">' + pyeong +'평 X 450만원</span>');
				}
				
				var $$1 = parseInt($txtGeonchugGongsa.data('value'));
				var $$2 = parseInt($stepGeonchugGongsa.data('value'));
				var $$r = Math.round($$1 * 0.01 * $$2);
				
				$WGeonchugGongsa.data('value', $$r);
				$WGeonchugGongsa.val($$r.toString().money());
				
				//수입 > 매각 > 건물
				hotplace.calc.sujibunseog.calcIncomeSellBuilding(true);
				calcMymoney();//자기자본
				calcGongsabi();
			},
			calcTomogGongsa: function(isSet) {
				console.log('토목공사비');
				var suji = hotplace.sujibunseog;
				var $txtTomogGongsa = $(suji.getTxtTomogGongsaId());
				var $stepTomogGongsa = $(suji.getStepTomogGongsaId());
				var $WTomogGongsa = $(suji.getWTomogGongsaId());
				
				if(isSet) {
					var pyeong = Math.round(parseFloat($txtTomogGongsa.data('area') / 3.3));
					var _$$1 = pyeong * 150000;
					$txtTomogGongsa.data('value', _$$1);
					$txtTomogGongsa.val(_$$1.toString().money());
					
					hotplace.dom.changeTooltipText($txtTomogGongsa, '<span class="innerTooltip">' + pyeong +'평 X 15만원</span>');
				}
				
				var $$1 = parseInt($txtTomogGongsa.data('value'));
				var $$2 = parseInt($stepTomogGongsa.data('value'));
				var $$r = Math.round($$1 * 0.01 * $$2);
				
				$WTomogGongsa.data('value', $$r);
				$WTomogGongsa.val($$r.toString().money());
				
				//수입 > 매각 > 건물
				hotplace.calc.sujibunseog.calcIncomeSellBuilding(true);
				calcMymoney();//자기자본
				calcGongsabi();
			},
			calcPojangGongsa: function(isSet) {
				console.log('포장공사비');
				var suji = hotplace.sujibunseog;
				var $txtPojangGongsa = $(suji.getTxtPojangGongsaId());
				var $stepPojangGongsa = $(suji.getStepPojangGongsaId());
				var $WPojangGongsa = $(suji.getWPojangGongsaId());
				
				if(isSet) {
					var pyeong = Math.round(parseFloat($txtPojangGongsa.data('area') / 3.3));
					var _$$1 = pyeong * 150000;
					
					$txtPojangGongsa.data('value', _$$1);
					$txtPojangGongsa.val(_$$1.toString().money());
					
					hotplace.dom.changeTooltipText($txtPojangGongsa, '<span class="innerTooltip">' + pyeong +'평 X 15만원</span>');
				}
				
				var $$1 = parseInt($txtPojangGongsa.data('value'));
				var $$2 = parseInt($stepPojangGongsa.data('value'));
				var $$r = Math.round($$1 * 0.01 * $$2);
				
				$WPojangGongsa.data('value', $$r);
				$WPojangGongsa.val($$r.toString().money());
				
				calcMymoney();//자기자본
				calcGongsabi();
			},
			calcInibGongsa: function(isSet) {
				console.log('인입공사비');
				var suji = hotplace.sujibunseog;
				var $txtInibGongsa = $(suji.getTxtInibGongsaId());
				var $stepInibGongsa = $(suji.getStepInibGongsaId());
				var $WInibGongsa = $(suji.getWInibGongsaId());
				
				if(isSet) {
					var pyeong = Math.round(parseFloat($txtInibGongsa.data('area') / 3.3));
					var _$$1 = pyeong * 150000;
		
					$txtInibGongsa.data('value', _$$1);
					$txtInibGongsa.val(_$$1.toString().money());
					
					hotplace.dom.changeTooltipText($txtInibGongsa, '<span class="innerTooltip">' + pyeong +'평 X 15만원</span>');
				}
				
				var $$1 = parseInt($txtInibGongsa.data('value'));
				var $$2 = parseInt($stepInibGongsa.data('value'));
				var $$r = Math.round($$1 * 0.01 * $$2);
				
				$WInibGongsa.data('value', $$r);
				$WInibGongsa.val($$r.toString().money());
				
				calcMymoney();//자기자본
				calcGongsabi();
			},
			calcAcceptGaebal: function() {
				console.log('개발행위허가');
				var suji = hotplace.sujibunseog;
				var $stepAcceptGaebal = $(suji.getStepAcceptGaebalId());
				var $WAcceptGaebal = $(suji.getWAcceptGaebalId());
				
				$WAcceptGaebal.data('value', $stepAcceptGaebal.data('value'));
				$WAcceptGaebal.val($stepAcceptGaebal.data('value').toString().money());
				
				//수입 > 매각 > 건물
				hotplace.calc.sujibunseog.calcIncomeSellBuilding(true);
				calcMymoney();//자기자본
				calcInheogabi();
			},
			calcGamri: function(isSet) {
				console.log('감리비');
				//공사비 X 비율
				var suji = hotplace.sujibunseog;
				var $txtGamri = $(suji.getTxtGamriId());
				var $stepGamri = $(suji.getStepGamriId());
				var $WGamri = $(suji.getWGamriId());
				var $WGongsabi;
				
				if(isSet) {
					$WGongsabi = $(suji.getWGongsabiId());
					$txtGamri.data('value', $WGongsabi.data('value'));
					$txtGamri.val($WGongsabi.data('value').toString().money());
				}
				
				var $$1 = $txtGamri.data('value');
				var $$2 = $stepGamri.data('value');
				var $$r = Math.round($$1 * (0.01 * $$2));
				
				$WGamri.data('value', $$r);
				$WGamri.val($$r.toString().money());
				
				calcInheogabi();
			},
			calcCheuglyang: function() {
				console.log('측량비');
				var suji = hotplace.sujibunseog;
				var $stepCheuglyang = $(suji.getStepCheuglyangId());
				var $WCheuglyang = $(suji.getWCheuglyangId());
				
				$WCheuglyang.data('value', $stepCheuglyang.data('value'));
				$WCheuglyang.val($stepCheuglyang.data('value').toString().money());
				
				calcInheogabi();
			},
			calcEvalueGamjeung: function() {
				console.log('감정평가');
				var suji = hotplace.sujibunseog;
				var $stepEvalueGamjeung = $(suji.getStepEvalueGamjeungId());
				var $WEvalueGamjeung = $(suji.getWEvalueGamjeungId());
				
				$WEvalueGamjeung.data('value', $stepEvalueGamjeung.data('value'));
				$WEvalueGamjeung.val($stepEvalueGamjeung.data('value').toString().money());
				
				calcInheogabi();
			},
			calcSplitPilji: function() {
				console.log('필지분할');
				var suji = hotplace.sujibunseog;
				var $stepSplitPilji = $(suji.getStepSplitPiljiId());
				var $WSplitPilji = $(suji.getWSplitPiljiId());
				
				$WSplitPilji.data('value', $stepSplitPilji.data('value'));
				$WSplitPilji.val($stepSplitPilji.data('value').toString().money());
				
				calcInheogabi();
			},
			calcDevBudam: function() {
				console.log('개발부담금');
				//개발이익 X 비율
				var suji = hotplace.sujibunseog;
				var devIig = calcDevIig();
				var $txtDevBudam = $(suji.getTxtDevBudamId());
				var $stepDevBudam = $(suji.getStepDevBudamId());
				var $WDevBudam = $(suji.getWDevBudamId());
				
				$txtDevBudam.data('value', devIig);
				$txtDevBudam.val(devIig.toString().money())
				
				var $$1 = devIig;
				var $$2 = $stepDevBudam.data('value');
				var $$r = Math.round($$1 * (0.01 * $$2));
				
				$WDevBudam.data('value', $$r);
				$WDevBudam.val($$r.toString().money());
				
				calcMymoney();//자기자본
				calcBudamgeum();
			},
			calcFarmBudam: function(isGammyeon) {
				console.log('농지보전부담금');
				var suji = hotplace.sujibunseog;
				var $WPurchase = $(suji.getWPurchaseId());
				var $txtFarmBudam = $(suji.getTxtFarmBudamId());
				var $stepFarmBudam = $(suji.getStepFarmBudamId());
				var $WFarmBudam = $(suji.getWFarmBudamId());
				
				var $$r = 0;
				
				if(suji.isFarm() && !isGammyeon) {
					$txtFarmBudam.val($WPurchase.val());
					$txtFarmBudam.data('value', $WPurchase.data('value'));
					var $$1 = $WPurchase.data('value');
					var $$2 = parseInt($stepFarmBudam.data('value'));
					$$r = Math.round($$1 * (0.01 * $$2));
					
					if($$r > 50000000) {
						$$1 = 50000000;
						$$r = Math.round($$1 * (0.01 * $$2));
					}
				}
				else {
					$txtFarmBudam.val('0');
					$txtFarmBudam.data('value', 0);
				}
				
				$WFarmBudam.data('value', $$r);
				$WFarmBudam.val($$r.toString().money());
				
				calcMymoney();//자기자본
				calcBudamgeum();
			},
			calcAlterSanrim: function() {
				console.log('대체산림자원조성비');
				var suji = hotplace.sujibunseog;
				var $WPurchase = $(suji.getWPurchaseId());
				var $txtAlterSanrim = $(suji.getTxtAlterSanrimId());
				var $stepAlterSanrim = $(suji.getStepAlterSanrimId());
				
				
				$txtAlterSanrim.val((suji.isForest() ? $WPurchase.val() : '0'));
				$txtAlterSanrim.data('value', (suji.isForest() ? $WPurchase.data('value') : 0));
				
				var $$1 = $txtAlterSanrim.data('value');
				var $$2 = $stepAlterSanrim.data('value');
				var $$r = Math.round($$1 * $$2 * 0.01);
				
				var $WAlterSanrim = $(suji.getWAlterSanrimId());
				$WAlterSanrim.data('value', $$r);
				$WAlterSanrim.val($$r.toString().money());
				
				calcMymoney();//자기자본
				calcBudamgeum();
			},
			calcPurchaseChaegwon: function(isSet) {
				console.log('채권매입비');
				var suji = hotplace.sujibunseog;
				var $txtPurchaseChaegwon = $(suji.getTxtPurchaseChaegwonId());
				var $stepPurchaseChaegwon = $(suji.getStepPurchaseChaegwonId());
				var WPurchase;
				
				if(isSet) {
					WPurchase = $(suji.getWPurchaseId()).data('value');
					$txtPurchaseChaegwon.data('value', WPurchase);
					$txtPurchaseChaegwon.val(WPurchase.toString().money());
				}
				
				var $$1 = parseInt($txtPurchaseChaegwon.data('value'));
				var $$2 = parseFloat($stepPurchaseChaegwon.data('value'));
				var $$r = Math.round($$1 * $$2 * 0.01);
				
				var $WPurchaseChaegwon = $(suji.getWPurchaseChaegwonId());
				$WPurchaseChaegwon.data('value', $$r);
				$WPurchaseChaegwon.val($$r.toString().money());
				
				calcMymoney();//자기자본
				calcSaeobgyeongbi();
			},
			calcSetGeunjeodang: function(isSet) {
				console.log('근저당 설정비');
				var suji = hotplace.sujibunseog;
				var $txtDaechulIja = $(suji.getTxtDaechulIjaId());
				var $txtSetGeunjeodang = $(suji.getTxtSetGeunjeodangId());
				var $stepSetGeunjeodang = $(suji.getStepSetGeunjeodangId());
				var $WSetGeunjeodang = $(suji.getWSetGeunjeodangId());
				
				if(isSet) {
					var _$$1 = $txtDaechulIja.data('value');
					var _$$2 = 1.3;
					var _$$r = Math.round(_$$1 * _$$2);
					
					$txtSetGeunjeodang.data('value', _$$r);
					$txtSetGeunjeodang.val(_$$r.toString().money());
				}
				
				var $$1 = parseInt($txtSetGeunjeodang.data('value'));
				var $$2 = parseFloat($stepSetGeunjeodang.data('value'));
				var $$r = Math.round($$1 * 0.001 * $$2);
				
				$WSetGeunjeodang.data('value', $$r);
				$WSetGeunjeodang.val($$r.toString().money());
				
				hotplace.dom.changeTooltipText($txtSetGeunjeodang, '<span class="innerTooltip">대출금액(' + $txtDaechulIja.data('value').toString().money() +'원)의 130%</span>');
				
				calcMymoney();//자기자본
				calcSaeobgyeongbi();
			},
			calcPreserveDeunggi: function(isSet) {
				console.log('보존등기비');
				//공사비의 3.2% 내외
				var suji = hotplace.sujibunseog;
				var WGongsabi;
				var $txtPreserveDeunggi = $(suji.getTxtPreserveDeunggiId());
				var $stepPreserveDeunggi = $(suji.getStepPreserveDeunggiId());
				
				if(isSet) {
					WGongsabi = $(suji.getWGongsabiId()).data('value');
					$txtPreserveDeunggi.data('value', WGongsabi);
					$txtPreserveDeunggi.val(WGongsabi.toString().money());
				}
				
				var $$1 = parseInt($txtPreserveDeunggi.data('value'));
				var $$2 = parseFloat($stepPreserveDeunggi.data('value'));
				var $$r = Math.round($$1 * $$2* 0.01);
				
				var $WPreserveDeunggi = $(suji.getWPreserveDeunggiId());
				$WPreserveDeunggi.data('value', $$r);
				$WPreserveDeunggi.val($$r.toString().money());
				
				calcMymoney();//자기자본
				calcSaeobgyeongbi();
			},
			calcManagement: function() {
				console.log('운영비');
				var suji = hotplace.sujibunseog;
				var $txtManagement = $(suji.getTxtManagementId());
				var $stepManagement = $(suji.getStepManagementId());
				
				var $$1 = parseInt($txtManagement.data('value'));
				var $$2 = parseFloat($stepManagement.data('value'));
				var $$r = Math.round($$1 * $$2 * 0.01);
				
				var $WManagement = $(suji.getWManagementId());
				$WManagement.data('value', $$r);
				$WManagement.val($$r.toString().money());
				
				calcSaeobgyeongbi();
			},
			calcSellSusulyo: function(isSet) {
				console.log('매각수수료');
				var suji = hotplace.sujibunseog;
				//매각 X 비율
				var WIncomeSell;
				var $txtSellSusulyo = $(suji.getTxtSellSusulyoId());
				var $stepSellSusulyo = $(suji.getStepSellSusulyoId());
				
				if(isSet) {
					WIncomeSell= $(suji.getWIncomeSellId()).data('value');
					$txtSellSusulyo.data('value', WIncomeSell);
					$txtSellSusulyo.val(WIncomeSell.toString().money());
				}
				
				var $$1 = parseInt($txtSellSusulyo.data('value'));
				var $$2 = parseFloat($stepSellSusulyo.data('value'));
				var $$r = Math.round($$1 * $$2 * 0.01);
				
				var $WSellSusulyo = $(suji.getWSellSusulyoId());
				$WSellSusulyo.data('value', $$r);
				$WSellSusulyo.val($$r.toString().money());
				
				calcSaeobgyeongbi();
			},
			calcPreparation: function(isSet) {
				console.log('예비비');
				var suji = hotplace.sujibunseog;
				var WIncome;
				var $txtPreparation = $(suji.getTxtPreparationId());
				var $stepPreparation = $(suji.getStepPreparationId());
				
				if(isSet) {
					WIncome = $(suji.getWIncomeId()).data('value');
					$txtPreparation.data('value', WIncome);
					$txtPreparation.val(WIncome.toString().money());
				}
				
				var $$1 = parseInt($txtPreparation.data('value'));
				var $$2 = parseInt($stepPreparation.data('value'));
				var $$r = Math.round($$1 * $$2 * 0.01);
				
				var $WPreparation = $(suji.getWPreparationId());
				$WPreparation.data('value', $$r);
				$WPreparation.val($$r.toString().money());
				
				calcSaeobgyeongbi();
			},
			calcIncomeSellBuilding: function(isSet) {
				console.log('수입>매각>건물');
				var suji = hotplace.sujibunseog;
				//건물 : 건축공사비 + 토목공사비 + 개발행위 허가등
				var $txtIncomeSellBuilding = $(suji.getTxtIncomeSellBuildingId());
				var $stepIncomeSellBuilding = $(suji.getStepIncomeSellBuildingId());
				
				var WGeonchugGongsa, WTomogGongsa, WAcceptGaebal, _$$r;
				
				if(isSet) {
					WGeonchugGongsa = $(suji.getWGeonchugGongsaId()).data('value');
					WTomogGongsa = $(suji.getWTomogGongsaId()).data('value');
					WAcceptGaebal = $(suji.getWAcceptGaebalId()).data('value');
					_$$r = parseInt(WGeonchugGongsa) + parseInt(WTomogGongsa) + parseInt(WAcceptGaebal);
					$txtIncomeSellBuilding.data('value', _$$r);
					$txtIncomeSellBuilding.val(_$$r.toString().money());
				}
				
				var $$1 = parseInt($txtIncomeSellBuilding.data('value'));
				var $$2 = parseInt($stepIncomeSellBuilding.data('value'));
				var $$r = Math.round($$1 * $$2 * 0.01);
				
				var $WIncomeSellBuilding = $(suji.getWIncomeSellBuildingId());
				$WIncomeSellBuilding.data('value', $$r);
				$WIncomeSellBuilding.val($$r.toString().money());
				
				calcIncomeSell();
			},
			calcIncomeSellSeolbi: function() {
				console.log('수입>매각>설비');
				var suji = hotplace.sujibunseog;
				var $txtIncomeSellSeolbi = $(suji.getTxtIncomeSellSeolbiId());
				var $stepIncomeSellSeolbi = $(suji.getStepIncomeSellSeolbiId());
				
				var $$1 = parseInt($txtIncomeSellSeolbi.data('value'));
				var $$2 = parseInt($stepIncomeSellSeolbi.data('value'));
				var $$r = Math.round($$1 * $$2 * 0.01);
				
				var $WIncomeSellSeolbi = $(suji.getWIncomeSellSeolbiId());
				$WIncomeSellSeolbi.data('value', $$r);
				$WIncomeSellSeolbi.val($$r.toString().money());
				
				calcIncomeSell();
			},
			calcIncomeSellLand: function() {
				console.log('수입>매각>토지');
				var suji = hotplace.sujibunseog;
				
				var $WPurchase = $(suji.getWPurchaseId());
				var $txtIncomeSellLand = $(suji.getTxtIncomeSellLandId());
				var $stepIncomeSellLand = $(suji.getStepIncomeSellLandId());
				
				$txtIncomeSellLand.data('value', $WPurchase.data('value'));
				$txtIncomeSellLand.val($WPurchase.val());
				var $$1 = parseInt($txtIncomeSellLand.data('value'));
				var $$2 = parseInt($stepIncomeSellLand.data('value'));
				var $$r = Math.round($$1 * $$2 * 0.01);
				
				var $WIncomeSellLand = $(suji.getWIncomeSellLandId());
				$WIncomeSellLand.data('value', $$r);
				$WIncomeSellLand.val($$r.toString().money());
				
				calcIncomeSell();
			},
			calcIncomeManageImdae: function() {
				console.log('수입>운영>임대');
				var suji = hotplace.sujibunseog;
				var $stepIncomeManageImdae = $(suji.getStepIncomeManageImdaeId());
				var $txtIncomeManageImdae = $(suji.getTxtIncomeManageImdaeId());
				var $$1 = parseInt($stepIncomeManageImdae.data('value'));
				var $$2 = parseInt($txtIncomeManageImdae.data('value'));
				var $$r = $$1 * $$2;
				
				var $WIncomeManageImdae = $(suji.getWIncomeManageImdaeId());
				$WIncomeManageImdae.data('value', $$r);
				$WIncomeManageImdae.val($$r.toString().money());
				
				calcIncomeManage();
			}
		}
	}();
}(
	hotplace.calc = hotplace.calc || {},
	jQuery
));