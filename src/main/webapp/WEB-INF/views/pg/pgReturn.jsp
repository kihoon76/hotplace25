<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c"	uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<!--[if IE 8]><html class="ie8" lang="ko"><![endif]-->
<!--[if IE 9]><html class="ie9" lang="ko"><![endif]-->
<!--[if gt IE 9]><!--><html lang="ko"><!--<![endif]-->
<head>
<meta charset="utf-8">

<title>핫플레이스</title>
<link rel="shortcut icon" href="/resources/img/favicon.png"/>
<c:choose>
<c:when test="${err eq 'Y'}">
<!-- 모든 디자인을 재선언하는 css -->
<link rel="stylesheet" href="/resources/css/style.css" />

<script type="text/javascript" src="/resources/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript" src="/resources/jquery-ui/1.12.0/jquery-ui.min.js"></script>
<script type="text/javascript">
	$(document).ready( function() {
		var thisBoxH = $('.errorBox').outerHeight();
		$('.errorBox').css('margin-top', -thisBoxH/2);
	});
</script>
</c:when>
<c:otherwise>
<link rel="stylesheet" href="/resources/vendors/bootstrap/bootstrap.css" />
<style>
body {
	background:#333336;
}

.tableType {overflow:auto; clear:both; margin:30px 20px 10px;}
.tableType table {width: 100%;}
.tableType table th {width:20%; text-align:right;}
.tableType table th,
.tableType table td {background:none; padding-left: 30px; height: 35px;}

/* 라인 스타일 */
.tableType table.tableStyle     {border-width:1px 0px 0px 0px; border-style:solid none none none;}
.tableType table.tableStyle th,
.tableType table.tableStyle td  {border-width:0px 0px 1px 0px; border-style:none none dashed none;} 
.tableType table.tableStyle tr:last-child th,
.tableType table.tableStyle tr:last-child td { border-style:none none solid none;} 

.tableType table.tableStyle     {border-color:#555 transparent transparent transparent;}
.tableType table.tableStyle tr,
.tableType table.tableStyle th,
.tableType table.tableStyle td  {border-color:#555 #555 #555 #555; color:#fff; color:rgba(255,255,255,0.8);}

.tableType table.tableStyle tr td:last-child {border-right:none;}

.tableType table.tableStyle .ellipsis {overflow:hidden; text-overflow:ellipsis;white-space:nowrap;word-wrap:normal}
.tableType table.tableStyle tbody tr:hover {background:none;}
.tableType table.tableStyle tbody tr:hover td {font-weight:normal;}
</style>
<script type="text/javascript" src="/resources/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript" src="/resources/vendors/bootstrap/bootstrap.min.js"></script>
<script type="text/javascript">
$(window).bind('beforeunload', function() {
	window.opener.hotplace.dom.closeModal();
});

$(document).ready(function() {
	$('#notice').modal('show');
});
</script>
</c:otherwise>
</c:choose>
</head>
<c:choose>
<c:when test="${err eq 'Y'}">
<body class="errorPage" style="min-height: 0px; min-width: 0px;">
	<div class="errorBox" >
		<div class="imgArea"></div>
		
		<div class="textArea">
			<p class="mainText">결제오류가 발생했습니다.</p>
		</div>

		<div class="copyright">Copyright HOTPLACE25 All rights reserved</div>
	</div>
</body>	
</c:when>
<c:otherwise>
<body>
	<div class="tableType">
		<table class="tableStyle">
		<tr>
			<th>거래 성공 여부</th>
			<td>성공</td>
		</tr>
		<tr>
			<th>결과 코드</th>
			<td><c:out value="${resultCode}" /></td>
		</tr>
		<tr>
			<th>결과 내용</th>
			<td><c:out value="${resultMsg}"/></td>
		</tr>
		<tr>
			<th>거래 번호</th>
			<td><c:out value="${tid}"/></td>
		</tr>
		<tr>
			<th>결제방법(지불수단)</th>
			<td><c:out value="${payMethod}"/></td>
		</tr>
		<tr>
			<th>결제완료금액</th>
			<td><c:out value="${totPrice}" />원</td>
		</tr>
		<tr>
			<th>주문 번호</th>
			<td><c:out value="${MOID}" /></td>
		</tr>
		<tr>
			<th>승인날짜</th>
			<td><c:out value="${applDate}" /></td>
		</tr>
		<tr>
			<th>승인시간</th>
			<td><c:out value="${applTime}" /></td>
		</tr>
		<c:if test="${not empty eventCode}">
		<tr>
			<th>이벤트 코드</th>					
			<td><c:out value="${eventCode}" /></td>
		</tr>
		</c:if>
		<tr>
			<th>카드번호</th>
			<td><c:out value="${cardNum}"/></td>
		</tr>
		<tr>
			<th>승인번호</th>
			<td><c:out value="${applNum}"/></td>
		</tr>
		<c:choose>
		<c:when test="${point eq '1'}">
		<tr>
			<th>포인트 사용 여부</th>
			<td>사용</td>
		</tr>
		</c:when>
		<c:otherwise>
		<tr>
			<th>포인트 사용 여부</th>
			<td>미사용</td>
		</tr>
		</c:otherwise>
		</c:choose>
		<tr>
			<th>카드 종류</th>
			<td><c:out value="${cardCode}" /></td>
		</tr>
		<tr>
			<th>카드 발급사</th>
			<td><c:out value="${cardBankCode}" /></td>
		</tr>
		<c:if test="${not empty ocbNum}">
		<tr>
			<th>OK CASHBAG 카드번호</th>
			<td><c:out value="${ocbNum}" /></td>
		</tr>
		<tr>
			<th>OK CASHBAG 적립 승인번호</th>
			<td><c:out value="${ocbSaveApplNum}" /></td>
		</tr>
		<tr>
			<th>OK CASHBAG 포인트지불금액</th>
			<td><c:out value="${ocbPayPrice}" /></td>
		</tr>
		</c:if>
		<c:if test="${not empty gsptNum}">
		<tr>
			<th>GS&Point 카드번호</th>
			<td><c:out value="${gsptNum}" /></td>
		</tr>
		<tr>
			<th>GS&Point 잔여한도</th>
			<td><c:out value="${gsptRemains}" /></td>
		</tr>
		<tr>
			<th>GS&Point 승인금액</th>
			<td><c:out value="${gsptApplPrice}" /></td>
		</tr>
		</c:if>
		<c:if test="${not empty upntCardNum}">
		<tr>
			<th>U-Point 카드번호</th>
			<td><c:out value="${upntCardNum}" /></td>
		</tr>
		<tr>
			<th>U-Point 가용포인트</th>
			<td><c:out value="${upntUsablePoint}" /></td>
		</tr>
		<tr>
			<th>U-Point 포인트지불금액</th>
			<td><c:out value="${upntPayPrice}" /></td>
		</tr>
		</c:if>
	</table>
	</div>
	
	<div class="modal fade" id="notice" tabindex="-1" role="dialog" aria-hidden="true">
  		<div class="modal-dialog modal-dialog-centered" role="document">
    		<div class="modal-content">
      			<div class="modal-header">
       				<button type="button" class="close" data-dismiss="modal" aria-label="Close">
         					<span aria-hidden="true">&times;</span>
       				</button>
      			</div>
		      	<div class="modal-body">
		      		<div style="font-size: 1.2em; line-height: 2.0em; color:#0000ff; text-align:center;">
		        	카드결제가 정상처리 되었습니다<br/>
		         	다시 로그인해 주세요.
		         	</div>
		      	</div>
    		</div>
  		</div>
	</div>
</body>
</c:otherwise>
</c:choose>
</html>