/**
 * @namespace hotplace.notice
 */
(function(notice, $) {
	var rowPerPage = 10,
		pageCount = 5,
		searchCondition = 'all',
		searchMode = false,
		searchParam = {
			type: '',
			text: ''
		};
	
	var _noticeTable = '#noticeTable',
		_dvNoticeSearchItem = '#dvNoticeSearchItem';
	
	function _makePagination(total, pageNum) {
		
		var totalPage = Math.ceil(total/rowPerPage);
		
		if(totalPage < pageNum) {
			pageNum = totalPage;
		}
		
	 	//현재 페이지(정수) / 한페이지 당 보여줄 페지 번호 수(정수) + (그룹 번호는 현제 페이지(정수) % 한페이지 당 보여줄 페지 번호 수(정수)>0 ? 1 : 0)
		var grpNum = Math.floor(pageNum / pageCount + (pageNum % pageCount > 0 ? 1 : 0));
		//현재 그룹 끝 번호 = 현재 그룹번호 * 페이지당 보여줄 번호 
		var pageEno = grpNum * pageCount;
		//현재 그룹 시작 번호 = 현재 그룹 끝 번호 - (페이지당 보여줄 번호 수 -1)
		var pageSno = pageEno - (pageCount - 1);
		
		//현재 그룹 끝 번호가 전체페이지 수 보다 클 경우	
		if(pageEno > totalPage) {
			//현재 그룹 끝 번호와 = 전체페이지 수를 같게
			pageEno = totalPage;
		}
		
		//이전 페이지 번호	= 현재 그룹 시작 번호 - 페이지당 보여줄 번호수	
		var prevPageNo = pageSno - pageCount;  // <<  *[이전]* [21],[22],[23]... [30] [다음]  >>
		//다음 페이지 번호 = 현재 그룹 시작 번호 + 페이지당 보여줄 번호수
		var nextPageNo = pageSno + pageCount;	// <<  [이전] [21],[22],[23]... [30] *[다음]*  >>
		//이전 페이지 번호가 1보다 작을 경우
		if(prevPageNo < 1) {
			//이전 페이지를 1로
			prevPageNo = 1;
		}
		
		//다음 페이지보다 전체페이지 수보가 클경우
		if(nextPageNo > totalPage){
			//다음 페이지 = 전체페이지수 / 페이지당 보여줄 번호수 * 페이지당 보여줄 번호수 + 1		
			nextPageNo = totalPage / pageCount * pageCount + 1;
		}	
		
		var $nav = $('#dvNoticePagination ul');
		var html = '';
		
		if(grpNum > 1) {
			html += '<li class="first"><a href = "#" onclick="hotplace.notice.showPage(1)"><i class="ambicon-006_arrow_first"></i></a></li>';
			html += '<li class="prev"><a href = "#" onclick="hotplace.notice.showPage(' + (prevPageNo + pageCount - 1) + ')"><i class="ambicon-002_arrow_left"></i></a></li>';
		}
	
		
		
		for(var i=pageSno; i<=pageEno; i++) {
			if(i == pageNum) {
				html +=	'<li class = "active"><a href = "#">' + i + '</a></li>';
			}
			else {
				html +=	'<li><a href = "#" onclick="hotplace.notice.showPage(' + i + ')">' + i + '</a></li>';
			}
		}
		
		if(pageEno < totalPage) {
			html +=	'<li class="next"><a href = "#" onclick="hotplace.notice.showPage(' + (nextPageNo) + ')"><i class="ambicon-001_arrow_right"></i></a></li>';
			html +=	'<li class="last"><a href = "#" onclick="hotplace.notice.showPage(' + (totalPage) + ')"><i class="ambicon-005_arrow_last"></i></a></li>';
		}
   		
   		
   		
   		$nav.html(html);
	} 
	
	function _getNoticeList(pageNum) {
		var param = null;
		
		if(searchMode) {
			param = searchParam;
		}
		
		//비동기로 흐르게 되면  모달에 내용이 채워지기 전에 모달 사이즈가 설정되어  모달이 center에 오지 않는다.
		hotplace.getPlainText(
			'notice/page/' + pageNum, //url
			param, 
			function(jo) {
				console.log(jo.datas)
				_makeList(jo.datas);
				_makePagination(jo.datas.total, pageNum);
			}, //cbSucc
			null, //cbErr
			true, //isActiveMask
			false, //isMaskTran
			null, //completeFn
			hotplace.dom.getModalPopId(), //loadEl
			false //async
		);
	}
	
	function _makeList(data) {
		var list = data.list;
		var cnt = list.length;
		
		var $container = $('#noticeTrs');
		var trs = [];
		if(cnt > 0) {
			for(var i=0; i<cnt; i++) {
				trs.push('<tr><td>' + list[i].num + '</td><td class="left ellipsis"><a href="#" class="contView" data-index="' + list[i].num + '">' + list[i].title + '</a></td></tr>');
				trs.push('<tr class="contentViewBox"><td colspan="2"><div id="dvContentBox' + list[i].num + '" class="contentBox"></div></td></tr>');
			}
		}
		
		$container.html(trs.join(''));
	}
	
	function _makeContentDetail($link) {
		var index = $link.data('index');
		hotplace.getPlainText('notice/page/content/' + index, null, function(jo) {
			console.log(jo.datas);
			var content = jo.datas.content;
			$('#dvContentBox' + index).html(content);
			
		},null, true, false, null);
	}
	
	notice.showPage = function(pgNum) {
		_getNoticeList(pgNum || 1);
	}
	
	function _showHideNoticeCont($link){
		var $tbody = $link.parents('tbody');
		var $cont  = $link.parents('tr').next('tr.contentViewBox');
		var isVisible = $cont.is(':visible');

		$tbody.children('.contentViewBox').hide();
		$tbody.find('a.contView').css('font-weight','normal');

		if (isVisible){
			$cont.hide();
			$link.css('font-weight','normal');
		} 
		else {
			$cont.show();
			$link.css('font-weight','bold');
		}
	}
	
	//제목 클릭
	$(document).on('click', _noticeTable + ' .contView', function(e) {	
		_makeContentDetail($(this));
		_showHideNoticeCont($(this));
	});
	
	
	
	//검색 조건
	$(document).on('change', _dvNoticeSearchItem + ' select', function() {
		searchCondition = $(this).val();
		var $txt = $(_dvNoticeSearchItem + ' input[type=text]');
		var $btn = $(_dvNoticeSearchItem + ' button');
		
		if(searchCondition == 'all') {
			searchMode = false;
			$txt.val('');
			hotplace.notice.showPage(1);
		}

	});
	
	$(document).on('click', _dvNoticeSearchItem + ' button', function(e, txt) {
		var search = txt || $.trim($(_dvNoticeSearchItem + ' input[type=text]').val());
		
		if(search) {
			searchParam.type = searchCondition;
			searchParam.text = search;
			searchMode = true;
			_getNoticeList(1);
		}
	});
	
	$(document).on('keydown', _dvNoticeSearchItem + ' input[type=text]', function(e) {
		if (e.which == 13) {
			var txt = $.trim(e.target.value);
			if(txt) {
				$(_dvNoticeSearchItem + ' button').trigger('click', txt);
			}
	    }
	});
}(
	hotplace.notice = hotplace.notice || {},
	jQuery
));