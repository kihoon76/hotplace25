<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c"	uri="http://java.sun.com/jsp/jstl/core" %>
<head>
	<title>핫플레이스</title>
	<!-- uploadify -->
	<link href="/resources/vendors/jQuery-Upload-File/4.0.11/uploadfile.css" rel="stylesheet">
	<!-- jQRangeSlider -->
    <!-- http://ghusse.github.io/jQRangeSlider/documentation.html -->
	<link rel="stylesheet" href="/resources/vendors/jQRangeSlider-5.7.2/css/classic.css" />
    <!-- tabulator -->
    <link rel="stylesheet" href="/resources/vendors/tabulator/css/tabulator_simple.min.css" />
    <!-- waitMe -->
    <link rel="stylesheet" href="/resources/vendors/waitMe/waitMe.min.css" />
    <!-- uploadify -->
	<link rel="stylesheet" href="/resources/vendors/jQuery-Upload-File/4.0.11/uploadfile.css">
	
    <!-- 모든 디자인을 재선언하는 css -->
	<link rel="stylesheet" href="/resources/css/style.css" />
	
	<!-- 개인적으로 추가 css -->
	<link rel="stylesheet" href="/resources/css/add.css" />
	
    
</head>
<body>
<c:if test="${jangeagongji == 'on'}">
<div class="jangea">장애공지!!</div>
</c:if>
<div id="test" style="position:absolute; top:50px; left:50px; width:500px; height:500px; display:none; z-index:1; background-color:white;"></div>
<content tag="script">


<c:if test="${(debug eq 'on') || (env eq 'development')}">
<script type="text/javascript" src="/resources/vendors/jQRangeSlider-5.7.2/jQAllRangeSliders-min.js"></script>
<script type="text/javascript" src="/resources/vendors/tabulator/js/tabulator.min.js"></script>
<script type="text/javascript" src="/resources/vendors/dom-to-image/dom-to-image.min.js"></script>
<script type="text/javascript" src="/resources/vendors/jquery-zoom/jquery.zoom-min.js"></script>
<!-- ECharts -->
<script type="text/javascript" src="/resources/vendors/echarts/echarts.min.js"></script>
<!-- uploadify -->
<script type="text/javascript" src="/resources/vendors/jQuery-Upload-File/4.0.11/jquery.uploadfile.min.js"></script>
<!-- touchSlider (이미지 슬라이더) -->
<script type="text/javascript" src="/resources/vendors/touchSlider/jquery.touchSlider.min.js"></script>
<script type="text/javascript" src="/resources/js/src/main.js"></script>
<script type="text/javascript" src="/resources/js/src/user.js"></script>
</c:if>
<c:if test="${(env eq 'production') && (debug eq 'off')}">
<script type="text/javascript" src="/resources/js/dist/opensources.min.js"></script>
<script type="text/javascript" src="/resources/js/dist/main.min.js"></script>
<script type="text/javascript" src="/resources/js/dist/user.min.js"></script>
</c:if>



</content>

</body>