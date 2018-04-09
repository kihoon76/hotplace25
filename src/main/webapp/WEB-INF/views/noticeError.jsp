<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c"	uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<!--[if IE 8]><html class="ie8" lang="ko"><![endif]-->
<!--[if IE 9]><html class="ie9" lang="ko"><![endif]-->
<!--[if gt IE 9]><!--><html lang="ko"><!--<![endif]-->
<head>
<meta charset="utf-8">

<title>핫플레이스</title>
<link rel="shortcut icon" href="/resources/img/favicon.png"/>


<!-- 모든 디자인을 재선언하는 css -->
<link rel="stylesheet" href="/resources/css/style.css" />

<script type="text/javascript" src="/resources/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript" src="/resources/jquery-ui/1.12.0/jquery-ui.min.js"></script>

<script type="text/javascript">

$(document).ready( function() {
	var thisBoxH = $('.errorBox').outerHeight();
	//alert(thisBoxH);
	$('.errorBox').css('margin-top', -thisBoxH/2);
});
	
</script>

</head>

<body class="errorPage">
	<div class="errorBox">
		<div class="imgArea"></div>
		
		<div class="textArea">
			<p class="mainText">서비스 점검중 입니다</p>
		</div>

		<div class="copyright">Copyright HOTPLACE25 All rights reserved</div>

	</div>
</body>
</html>

