/**
 * @namespace hotplace.mypage
 */
(function(mypage, $) {
	var _tabMypageAccount = '#tabMypageAccount',
		_tabMypagePayment = '#tabMypagePayment',
		_tabMypageGwansimMulgeon = '#tabMypageGwansimMulgeon',
		_dvMypageGwansimMulgeon = '#dvMypageGwansimMulgeon';
	
	var _$selectedGwansimTr = null;
	
	function _setConfigSelectTr($tr) {
		if(_$selectedGwansimTr) {
			_$selectedGwansimTr.css('background', '#fff');
		}
		
		$tr.css('background', '#f5f5f5');
		_$selectedGwansimTr = $tr;
	}
	
	function _createMap(id, lat, lng, mulgeonType) {
		var mapOptions = {
		    center: new naver.maps.LatLng(lat, lng),
		    zoom: 10
		};

		var map = new naver.maps.Map(id, mapOptions);
		_createMarker(map, lat, lng, mulgeonType);
	}
	
	function _createMarker(map, lat, lng, mulgeonType) {
		var marker = new naver.maps.Marker({
		    position: new naver.maps.LatLng(lat, lng),
		    clickable:false,
		    map: map
		});
		
		if(mulgeonType) {
			var icon = '';
			switch(mulgeonType) {
			case 'K':
				icon = 'gyeongmae.png';
				break;
			case 'G':
				icon = 'gongmae.png';
				break;
			case 'B':
				icon = 'bosang.png';
				break;
			case 'P':
				icon = 'pyeonib.png';
				break;
			case 'S':
				icon = 'silgeolae.png';
				break;
			case 'U':
				icon = 'acceptbuilding.png';
				break;
			}
			
			if(icon) {
				marker.setOptions('icon', {
			        content: '<img src="'+ hotplace.getContextUrl() +'resources/img/marker/' + icon + '" alt="" ' +
					  		 'style="margin: 0px; padding: 0px; border: 0px solid transparent; display: block; max-width: none; max-height: none; ' +
					  		 '-webkit-user-select: none; position: absolute; width: 22px; height: 33px; left: 0px; top: 0px;">',
		            size: new hotplace.maps.getVender().Size(22, 33),
		            scaledSize: new hotplace.maps.getVender().Size(22, 33),
		            anchor: new hotplace.maps.getVender().Point(11, 33),
		            origin: new hotplace.maps.getVender().Point(0,0)
				});
			}
		}
	}
	
	mypage.init = function() {
		_initMypage();
		_initAccount();
		_initPayment();
		_initGwansimMulgeon();
	}
	
	function _initMypage() {
		$('.dvMypage button[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		  var target = $(e.target).attr('href'); // activated tab
		  
		  //
		  if(target == '#tabMypageGwansimMulgeon') {
			  $('#dvMypageGwansimMulgeon').tabulator('redraw'); 
		  }
		  
		});
	}
	
	/************************************************
	 * 계정정보
	 ***********************************************/
	var _$mypageAccPw,
		_$mypageAccPwConfirm,
		_$mypageAccUserName,
		_$mypageAccUserEmail,
		_$mypageAccUserEmail2,
		_$mypageAccUserPhoneF,
		_$mypageAccUserPhoneM,
		_$mypageAccUserPhoneL,
		_$btnAccModifyAccount,
		_mypageAccTxtElements,
		_$hdnEmail;
	
	function _initAccount() {
		_$mypageAccPw = $('#mypageAccPw'),
		_$mypageAccPwConfirm = $('#mypageAccPwConfirm'),
		_$mypageAccUserName = $('#mypageAccUserName'),
		_$mypageAccUserEmail = $('#mypageAccUserEmail'),
		_$mypageAccUserEmail2 = $('#mypageAccUserEmail2'),
		_$mypageAccUserPhoneF = $('#mypageAccUserPhoneF'),
		_$mypageAccUserPhoneM = $('#mypageAccUserPhoneM'),
		_$mypageAccUserPhoneL = $('#mypageAccUserPhoneL'),
		_$btnAccModifyAccount = $('#btnAccModifyAccount'),
		_mypageAccTxtElements = ['#mypageAccUserName', '#mypageAccUserEmail', '#mypageAccUserPhoneM', '#mypageAccUserPhoneL', '#mypageAccUserEmail2'],
		_$hdnEmail = $('#hdnEmail');
		
		_initEmail();
		
		_$btnAccModifyAccount
		.off('click')
		.on('click', function() {
			
			if(_isValidAccountForm()) {
				hotplace.validation.ctrlValidMsg(_$mypageAccPw, false, '.FORMAT');
				hotplace.ajax({
					url: 'user/modify',
					data: JSON.stringify({
						userName: _$mypageAccUserName.val(),
						password: _$mypageAccPw.val(),
						phone: _$mypageAccUserPhoneF.val() + '-' + _$mypageAccUserPhoneM.val() + '-' + _$mypageAccUserPhoneL.val(),
						email: (_$mypageAccUserEmail2.val() == 'D') ? _$mypageAccUserEmail.val() : _$mypageAccUserEmail.val() + '@' + _$mypageAccUserEmail2.val()
					}),
					contentType: 'application/json; charset=UTF-8',
					success: function(data, textStatus, jqXHR) {
						if(data.success) {
							hotplace.dom.showAlertMsg(null, '회원정보가 수정되었습니다.', {width:'40%'});
						}
						else {
							jqXHR.errCode = hotplace.error.USER_MOD;
						}
					},
					error: function(jqXHR, textStatus, e) {
						jqXHR.errCode = hotplace.error.USER_MOD;
					}
				})
			}
		});
	}
	
	function _initEmail() {
		_$mypageAccUserEmail.val(_$hdnEmail.val());
	}
	
	function _checkMailFormat() {
		return hotplace.validation.isValidEmail(_$mypageAccUserEmail, _$mypageAccUserEmail2.val());
	}
	
	function _checkPhoneM() {
		return hotplace.validation.isValidPhoneM(_$mypageAccUserPhoneM);
	}
	
	function _checkPhoneL() {
		return hotplace.validation.isValidPhoneL(_$mypageAccUserPhoneL);
	}
	
	function _checkAccEmpty() {
		return hotplace.validation.isFormNotEmpty(_mypageAccTxtElements);
	}
	
	function _checkPwConfirm() {
		
		var v = true;
		
		if($.trim(_$mypageAccPw.val()) == $.trim(_$mypageAccPwConfirm.val())) {
			hotplace.validation.ctrlValidMsg(_$mypageAccPwConfirm, false, '.CONFIRM');
		}
		else {
			hotplace.validation.ctrlValidMsg(_$mypageAccPwConfirm, true, '.CONFIRM');
			v = false;
		}
		
		return v;
	}
	
	function _checkPwFormat() {
		if($.trim(_$mypageAccPw.val()) == '') return true;
		return hotplace.validation.isPasswordFormat(_$mypageAccPw);
	}
	
	function _isValidAccountForm() {
		if(_checkAccEmpty()
			&& _checkPwConfirm()
			&& _checkPwFormat()
			&& _checkMailFormat()
			&& _checkPhoneM()
			&& _checkPhoneL()) {
			return true;
		}
		return false;
	}
	
	/************************************************
	 * 결제내역
	 ***********************************************/
	function _initPayment() {
		
		$(_tabMypagePayment + ' .PAYMENT_DETAIL')
		.off('click')
		.on('click', function() {
			var $this = $(this);
			var couponNum = $this.data('couponNum');
			
			hotplace.dom.showPaymentDetailForm({
				applyDate: $this.data('applyDate'),
				paymentValue: $this.data('paymentValue'),
				useCoupon: (couponNum ? '쿠폰사용' : '쿠폰사용하지 않음'),
				couponNum: 	couponNum,
				couponContent: (couponNum ? ($this.data('couponValue') + ($this.data('couponUnit') == '1' ? '%' : '원') + ' 할인쿠폰') : '') ,
				applyComment: $this.data('applyComment'),
				status: $this.data('status'),
				depositor: $this.data('depositor')
			});
		});
	}
	
	
	/************************************************
	 * 관심물건
	 ***********************************************/
	
	var _btnGwansimModify = '#btnGwansimModify',
		_txtMypageGwansimMemo = '#txtMypageGwansimMemo';
	
	mypage.triggerGwansimPop = function(param) {
		hotplace.dom.showMypageGwansimPop(param.key, function() {
			_createMap('dvGwansimMap', param.lat, param.lng, param.mulgeonType);
			$(_btnGwansimModify)
			.off('click')
			.on('click', function() {
				if(_checkGwansimEmpty()) {
					hotplace.ajax({
						url: 'spot/mod/gwansim',
						method: 'POST',
						data: JSON.stringify({
							gwansimNum: param.key,
							memo: $(_txtMypageGwansimMemo).val().trimTS()
						}),
						contentType: 'application/json',
						success: function(data, textStatus, jqXHR) {
							if(data.success) {
								hotplace.dom.showAlertMsg(null, '관심물건이 수정되었습니다.', {width:'40%'});
							}
							else {
								jqXHR.errCode = hotplace.error.GWANSIM_MOD;
							}
						},
						error: function(jqXHR, textStatus, e) {
							jqXHR.errCode = hotplace.error.GWANSIM_MOD;
						}
					})
				}
			})
			
		});
	}
	
	function _checkGwansimEmpty() {
		return hotplace.validation.isFormNotEmpty([_txtMypageGwansimMemo]);
	}
	
	function _makeTabulatorFilterFromCode(code) {
		if(code) {
			var a = [];
			for(var k in code) {
				a.push(code[k]);
			}
			
			return hotplace.dom.getTabulatorSelectFilter(a);
		}
		
		return null;
	}
	
	function _initGwansimMulgeon() {
		
		var data = $('#dvMypageGwansimMulgeon').data('tab');
		
		hotplace.dom.createTabulator('#dvMypageGwansimMulgeon', {
			height: '600',
			selectable:1,
		    fitColumns:true, //fit columns to width of table (optional)
		    columns:[
		        {title:'등록일', field:'regDate', width:100, headerFilter:'input', headerFilterPlaceholder:'2018-01-01'},
		        {title:'물건주소', field:'address', width:308, headerFilter:'input', headerFilterPlaceholder:'물건주소검색'},
		        {title:'메모내용', field:'memo', width:200, headerFilter:'input', headerFilterPlaceholder:'메모내용검색', headerSort:false},
		        {title:'물건종류', field:'mulgeonType', headerFilter:true, width:100, align:'center', formatter: function(cell) {
		        	var v = '';
		        	switch(cell.getValue()) {
		        	case 'K':
		        		v = '<div style="position:relative; top: 3px;"><img src="' + hotplace.getContextUrl() + 'resources/img/marker/gyeongmae.png" style="width:22px; height:22px;"/></div>';
		        		break;
		        	case 'G':
		        		v = '<div style="position:relative; top: 3px;"><img src="' + hotplace.getContextUrl() + 'resources/img/marker/gongmae.png" style="width:22px; height:22px;"/></div>';
		        		break;
		        	case 'B':
		        		v = '<div style="position:relative; top: 3px;"><img src="' + hotplace.getContextUrl() + 'resources/img/marker/bosang.png" style="width:22px; height:22px;"/></div>';
		        		break;
		        	case 'P':
		        		v = '<div style="position:relative; top: 3px;"><img src="' + hotplace.getContextUrl() + 'resources/img/marker/pyeonib.png" style="width:22px; height:22px;"/></div>';
		        		break;
		        	case 'S':
		        		v = '<div style="position:relative; top: 3px;"><img src="' + hotplace.getContextUrl() + 'resources/img/marker/silgeolae.png" style="width:22px; height:22px;"/></div>';
		        		break;
		        	case 'U':
		        		v = '<div style="position:relative; top: 3px;"><img src="' + hotplace.getContextUrl() + 'resources/img/marker/acceptbuilding.png" style="width:22px; height:22px;"/></div>';
		        		break;
		        	}
		        	
		        	return v;
		        }, editor:_makeTabulatorFilterFromCode({
	    			'K': {name:'경매', value:'K'},
	    			'G': {name:'공매', value:'G'},
	    			'B': {name:'보상', value:'B'},
	    			'P': {name:'편입', value:'P'},
	    			'S': {name:'실거래', value:'S'},
	    			'U': {name:'건축허가', value:'U'},
	    			'X': {name:'해당없음', value:'X'}
	    		}), editable:hotplace.dom.createTabulatorNoEdit},
		        {title:'삭제', field:'gwansimMulgeonNum', width:50, formatter: function(cell) {
		        	return '<span class="iconRBtnDel" style="padding-left: 5px;"><i class="ambicon-023_trash"></i></span>'
		        }, headerFilter:'input', headerFilterPlaceholder:'', headerSort:false,
		        headerFilterFunc: function() { return true;},
		        cellClick: function(e, cell) {
		        	e.stopPropagation();
		        	var rowData = cell.getData();
		        	var row = cell.getRow();
		        	
		        	var gwansimNum = rowData.gwansimMulgeonNum;
					var msg = '주소지 [ ' + rowData.address + ' ]를 삭제하시겠습니까?';
					
					hotplace.dom.showConfirmBox(function() {
						hotplace.ajax({
							url: 'spot/del/gwansim?gwansimNum=' + gwansimNum,
							method : 'GET',
							success : function(data, textStatus, jqXHR) {
								console.log(data);
								if(data.success) {
									var gwansimNum = data.datas[0];
									$('#dvMypageGwansimMulgeon').tabulator("deleteRow", row);
								}
								else {
									jqXHR.errCode = hotplace.error.GWANSIM_DEL;
								}
							},
							error: function() {
								
							}
						});
					}, msg, {width:'40%'});
		        }}
		    ],
		    movableColumns:true,
		    resizableRows:true,
		    rowClick: function(e,row) {
		    	var data = row.getData();
		    	console.log(data);
		    	mypage.triggerGwansimPop({
					key: data.gwansimMulgeonNum,
					lat: data.lat,
					lng: data.lng,
					mulgeonType: data.mulgeonType
				});
		    },
		}, data);
		
		
		
		
//		$(_tabMypageGwansimMulgeon + ' table tr')
//		.not('.NO-DATA')
//		.off('click')
//		.on('click', function(e) {
//			var $tr = $(this);
//			var mulgeonType = $tr.data('mulgeonType');
//			_setConfigSelectTr($tr);
//			console.log(e);
//			
//			mypage.triggerGwansimPop({
//				key: $tr.data('key'),
//				lat: $tr.data('lat'),
//				lng: $tr.data('lng'),
//				mulgeonType: mulgeonType
//			});
//			/*hotplace.dom.showMypageGwansimPop($tr.data('key'), function() {
//				_createMap('dvGwansimMap', $tr.data('lat'), $tr.data('lng'), mulgeonType);
//				$(_btnGwansimModify)
//				.off('click')
//				.on('click', function() {
//					if(_checkGwansimEmpty()) {
//						hotplace.ajax({
//							url: 'spot/mod/gwansim',
//							method: 'POST',
//							data: JSON.stringify({
//								gwansimNum: $tr.data('key'),
//								memo: $(_txtMypageGwansimMemo).val().trimTS()
//							}),
//							contentType: 'application/json',
//							success: function(data, textStatus, jqXHR) {
//								if(data.success) {
//									hotplace.dom.showAlertMsg(null, '관심물건이 수정되었습니다.', {width:'40%'});
//								}
//								else {
//									jqXHR.errCode = hotplace.error.GWANSIM_MOD;
//								}
//							},
//							error: function(jqXHR, textStatus, e) {
//								jqXHR.errCode = hotplace.error.GWANSIM_MOD;
//							}
//						})
//					}
//				})
//				
//			});*/
//		});
//		
//		$(_tabMypageGwansimMulgeon + ' .DEL')
//		.off('click')
//		.on('click', function(e) {
//			e.stopPropagation();
//			var $tr = $(this).parent();
//			_setConfigSelectTr($tr);
//			
//			var gwansimNum = $(this).data('key');
//			var msg = '주소지 [ ' + $(this).parent().data('address') + ' ]를 삭제하시겠습니까?';
//			
//			hotplace.dom.showConfirmBox(function() {
//				hotplace.ajax({
//					url: 'spot/del/gwansim?gwansimNum=' + gwansimNum,
//					method : 'GET',
//					success : function(data, textStatus, jqXHR) {
//						console.log(data);
//						if(data.success) {
//							var gwansimNum = data.datas[0];
//							$tr.remove();
//							_$selectedGwansimTr = null;
//						}
//						else {
//							jqXHR.errCode = hotplace.error.GWANSIM_DEL;
//						}
//					},
//					error: function() {
//						
//					}
//				});
//			}, msg, {width:'40%'});
//		})
	}
	
	hotplace.validation.phone(_tabMypageAccount + ' .NUMBER_ONLY')
}(
	hotplace.mypage = hotplace.mypage || {},
	jQuery
));