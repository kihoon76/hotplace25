/**
 * @namespace hotplace.gongmae
 */
(function(gongmae, $) {
	var _dvGongmaeInfoWin = '#dvGongmaeInfoWin',
		_btnGongmaePano = '#btnGongmaePano',
		_btnGongmaeDetail = '#btnGongmaeDetail',
		_btnGongmaeThumbClose = '#btnGongmaeThumbClose',
		_gDimages = '#gongmaeimages',
		_gongmaeImageCnt = '#gongmaeImageCnt',
		_address = null;
	
	function _getThumb(data, cbSucc) {
		hotplace.ajax({
			url: 'gongmae/thumb',
			method: 'GET',
			dataType: 'json',
			data: {unu: data.info.unu},
			//loadEl: _dvGongmaeInfoWin,
			success: function(d, textStatus, jqXHR) {
				console.log(d);
				if(d.success === false && d.errCode) {
					jqXHR.errCode = d.errCode;
				}
				else {
					d.lng = (data.location) ? data.location[0] : '';
					d.lat = (data.location) ? data.location[1] : '';
					cbSucc(d);
				}
			},
			error:function() {
				
			}
		});
	}
	
	function _bindDetailClickHandler(d) {
		
		$(_btnGongmaeDetail)
		.off('click')
		.on('click', function() {
			var param = {
				goyubeonho: d.goyubeonho,
				pnu: d.pnu
			}
			
			var hasForm = hotplace.dom.showGongmaeDetail();
			
			if(hasForm) {
				hotplace.ajax({
					url: 'gongmae/detail',
					method: 'GET',
					dataType: 'json',
					data: param,
					//loadEl: hotplace.dom.getModalPopId(),
					success: function(data, textStatus, jqXHR) {
						console.log(data);
						if(data.success === false && data.errCode) {
							jqXHR.errCode = data.errCode;
						}
						else {
							$('#gongDcheoboonJasan').text(data.cheoboonJasan);
							$('#gongDyongdo').text(data.yongdo);
							$('#gongDarea').text(data.area);
							$('#gongDgamjeongga').text(data.gamjeongga);
							$('#gongDibchalMethod').text(data.ibchalMethod);
							$('#gongDibchalPeriodNumber').text(data.ibchalPeriodNumber);
							$('#gongDyuchal').text(data.yuchal);
							$('#gongDjibhaengGigwan').text(data.jibhaengGigwan);
							
							if(data.minIbchalga != null) {
								data.minIbchalga = data.minIbchalga.money();
							}
							else {
								data.minIbchalga = '-';
							}
							
							$('#gongDminIbchalga').text(data.minIbchalga);
							
							//물건세부정보 (위치 및 이용현황)
							$('#gongDmulgeonAddress').text(data.mulgeonAddress + ' (' + data.mulgeonAddressDetail + ')');
							
							if(data.wichiBugeun == null) data.wichiBugeun = '-';
							$('#gongDwichiBugeun').text(data.wichiBugeun);
							
							if(data.use == null) data.use = '-';
							$('#gongDuse').text(data.use);
							
							if(data.etc == null) data.etc = '-';
							$('#gongDetc').text(data.etc);
							
							//명도책임
							$('#gongDmyeongdoChaegim').text(data.myeongdoChaegim);
							//부대조건
							$('#gongDbudaeJogeon').text(data.budaeJogeon);
							//전자보증서 사용여부
							if(data.jeonjaBojeungseoYN == 'Y') {
								data.jeonjaBojeungseoYN = '사용 가능';
							}
							else {
								data.jeonjaBojeungseoYN = '사용 불가능';
							}
							$('#gongDjeonjaBojeungseoYN').text(data.jeonjaBojeungseoYN);
							
							//차순위 매수신청 가능여부
							if(data.chasunwiMaesuYN == 'Y') {
								data.chasunwiMaesuYN = '신청 가능';
							}
							else {
								data.chasunwiMaesuYN = '신청 불가능';
							}
							$('#gongDchasunwiMaesuYN').text(data.chasunwiMaesuYN);
							
							//공동입찰 가능여부
							if(data.gongdongIbchalYN == 'Y') {
								data.gongdongIbchalYN = '공동입찰 가능';
							}
							else {
								data.gongdongIbchalYN = '공동입찰 불가능';
							}
							$('#gongDgongdongIbchalYN').text(data.gongdongIbchalYN);
							
							//2인 미만 유찰여부
							if(data.twoPersonYN == 'Y') {
								data.twoPersonYN = '1인이 입찰하더라도 유효한 입찰로 성립';
							}
							else {
								data.twoPersonYN = '2인 이상 입찰자가 있는 경우에만 유효한 입찰로 성립';
							}
							$('#gongDtwoPersonYN').text(data.twoPersonYN);
							
							//대리입찰 가능여부
							if(data.daeliIbchalYN == 'Y') {
								data.daeliIbchalYN = '대리입찰 가능';
							}
							else {
								data.daeliIbchalYN = '대리입찰 불가능';
							}
							$('#gongDdaeliIbchalYN').text(data.daeliIbchalYN);
							
							//2회 이상 입찰 가능여부
							if(data.twoTimeYN == 'Y') {
								data.twoTimeYN = '동일물건 2회 이상 입찰 가능';
							}
							else {
								data.twoTimeYN = '동일물건 2회 이상 입찰 불가능';
							}
							$('#gongDtwoTimeYN').text(data.twoTimeYN);
							
							_makeGongmaeImages(data.images);
							_makeMulgeonDetailArea(data.areaList);
							_makeMulgeonDetailGamjeong(data.gamjeongList);
							_makeIbchalInfoPerHoecha(data.ibchalList);
							_makeSiseInfoTonggye(data.tonggyeList);
							_makeSiseInfoMulgeon(data.mulgeonList);
//							var hasForm = hotplace.dom.showGongmaeDetail(function() {
//								_makeGongmaeImages(data.images);
//							}, data);
//							
//							if(!hasForm) hotplace.dom.showAlertMsg(null, '공매상세정보를 보실수 있는 권한이 없습니다.', {width:'40%'});
						}
						
					},
					error:function() {
						
					}
				});
			}
			else {
				hotplace.dom.showAlertMsg(null, '공매상세정보를 보실수 있는 권한이 없습니다.', {width:'40%'});
			}
		});
	}
	
	function _bindGeoClickHandler(x, y) {
		$(_btnGongmaePano)
		.off('click')
		.on('click', function() {
			hotplace.dom.showMulgeonPanoramaForm(null, null, {x:x, y:y, address:_address});
		});
	}
	
	function _bindImageClick() {
		$(_gDimages + ' li > a')
		.off('click')
		.on('click', function() {
			var $img = $(this).children();
			var imgSrc = $img.prop('src');
			var title = $img.data('gubun');
			
			hotplace.dom.showGyeongmaeImage({width:700}, {src:imgSrc, title:title});
		});
	}
	
	function _makeMulgeonDetailArea(areaList) {
		_makeCommonTd(
			$('#gongDmulgeonDetailArea'),
			areaList,
			'5',
			function(contentArr, data) {
				contentArr.push('<td>' + data.number + '</td>');
				contentArr.push('<td>' + data.jongbyeol + '(' + data.jimok + ')</td>');
				contentArr.push('<td>' + data.area + '</td>');
				contentArr.push('<td>' + data.jiboon + '</td>');
				contentArr.push('<td>' + data.bigo + '</td>');
			}
		);
	}
	
	function _makeMulgeonDetailGamjeong(gamjeongList) {
		_makeCommonTd(
			$('#gongDmulgeonDetailGamjeong'),
			gamjeongList,
			'3',
			function(contentArr, data) {
				contentArr.push('<td>' + data.pyeonggaGigwan + '</td>');
				contentArr.push('<td>' + data.pyeonggaDate + '</td>');
				contentArr.push((data.pyeonggaPrice != null) ? '<td>' + data.pyeonggaPrice.money() + '</td>' : '<td>&nbsp;</td>');
				//contentArr.push('<td><button type="button" class="btnstyle small white"><i class="ambicon-054_loard_down"></i> 감정평가서</button></td>');
			}
		);
	}
	
	function _makeIbchalInfoPerHoecha(ibchalList) {
		_makeCommonTd(
			$('#gongDibchalInfoPerHoecha'),
			ibchalList,
			'8',
			function(contentArr, data) {
				contentArr.push('<td>' + data.ibchalNum + '</td>');
				contentArr.push('<td>' + data.hoecha + ' / ' + data.chasu + '</td>');
				contentArr.push('<td>' + data.gubun + '</td>');
				contentArr.push('<td>' + data.daegeumNabbu + ' / ' + data.nabbuGihan + '</td>');
				contentArr.push('<td>' + data.ibchalStart.substring(0, 16) + ' / ' + data.ibchalEnd.substring(0, 16) + '</td>');
				contentArr.push('<td>' + data.gaechal.substring(0, 16) + '</td>');
				contentArr.push('<td>' + data.gaechalJangso + '</td>');
				contentArr.push((data.minIbchalga != null) ? '<td>' + data.minIbchalga.money() + '</td>' : '<td>&nbsp;</td>');
			}
		);
	}
	
	function _makeSiseInfoTonggye(tonggyeList) {
		_makeCommonTd(
			$('#gongDsiseInfoTonggye'),
			tonggyeList,
			'6',
			function(contentArr, data) {
				contentArr.push('<td>' + data.tonggyeGigan + '개월</td>');
				contentArr.push('<td>' + data.buchalGeonsu + '</td>');
				contentArr.push('<td>' + data.nagchalGeonsu + '</td>');
				contentArr.push((data.nagchalRatio != null) ? '<td>' + data.nagchalRatio + '%</td>' : '<td>&nbsp;</td>');
				contentArr.push((data.gamjeongga != null) ? '<td>' + data.gamjeongga + '%</td>' : '<td>&nbsp;</td>');
				contentArr.push((data.minIbchalga != null) ? '<td>' + data.minIbchalga + '%</td>' : '<td>&nbsp;</td>');
			}
		);
	}
	
	function _makeSiseInfoMulgeon(mulgeonList) {
		_makeCommonTd(
			$('#gongDsiseInfoMulgeon'),
			mulgeonList,
			'3',
			function(contentArr, data) {
				contentArr.push('<td>' + data.number + '</td>');
				contentArr.push('<td>' + data.mulgeonName + '</td>');
				contentArr.push((data.nagchalPrice != null) ? '<td>' + data.nagchalPrice.money() + '원</td>' : '<td>&nbsp;</td>');
			}
		);
	}
	
	function _makeCommonTd(container, list, noDataColspan, callback) {
		var contentArr = [];
		if(!list || list.length == 0) {
			contentArr.push('<tr><td colspan="' + noDataColspan + '">조회된 데이타가 없습니다.</td></tr>');
		}
		else {
			var len = list.length;
			for(var i=0; i<len; i++) {
				contentArr.push('<tr>');
				callback(contentArr, list[i]);
				contentArr.push('</tr>');
			}
		}
		
		container.html(contentArr.join(''));
	}
	
	function _makeGongmaeImages(images) {
		var $gDimages = $(_gDimages);
		var cnt = images.length;
		var currentRow = 0;
		var html = [];
		
		if(cnt >= 1) {
			$(_gongmaeImageCnt).text(cnt);
			
			html.push('<ul>');
			for(var i=0; i<cnt; i++) {
				html.push('<li><a href="#"><img src="' + images[i].image + '"></a></li>');
			}
		}
		
		$gDimages.html(html.join(''));
		if(cnt >= 1) {
			_initImageSlider();
			_bindImageClick();
		}
	}
	
	function _initImageSlider() {
		var $touchSlider = $(_gDimages);
		$touchSlider.touchSlider({
			autoplay : {
				enable : true,
				pauseHover : true,
				interval : 3500
			},	
			initComplete: function(e) {
				console.log(e);
			},
			view : 4,
			btn_prev : $touchSlider.next().find('.btn_prev'),
			btn_next : $touchSlider.next().find('.btn_next'),
		});
	}
	
	/** 
	 * @memberof hotplace.gyeongmae 
	 * @function markerClick 
	 * @param {object} map 맵
	 * @param {object} marker 마커
	 * @param {object} win InfoWindow
	 */
	gongmae.markerClick = function(map, marker, win) {
		var data = marker._data;
		console.log(data);
		var tForm = hotplace.dom.getTemplate('gongmaeForm');
		
		if(!tForm) {
			//security로 인해 권한 없음
			hotplace.dom.showLoginMsg();
		}
		else if(tForm == hotplace.error.DUP_LOGIN) {
			return;
		}
		else {
			_getThumb(data, function(d) {
				_address = d.mulgeonAddress;
				
				win.open(map, marker);
				win.setOptions('content', tForm(d));
				
				$(_btnGongmaeThumbClose)
				.off('click')
				.on('click', function() {
					win.close();
				});
				
				
				_bindDetailClickHandler(d);
				_bindGeoClickHandler(data.location[1], data.location[0]);
			});
		}
	}
}(
	hotplace.gongmae = hotplace.gongmae || {},
	jQuery
));