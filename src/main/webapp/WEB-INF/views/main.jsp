<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c"	uri="http://java.sun.com/jsp/jstl/core" %>
<head>
	<title>핫플레이스</title>
	<!-- uploadify -->
	<link href="/resources/vendors/jQuery-Upload-File/4.0.11/uploadfile.css" rel="stylesheet">
	<!-- jQRangeSlider -->
	<!-- slider -->
    <!-- http://ghusse.github.io/jQRangeSlider/documentation.html -->
	<link rel="stylesheet" href="/resources/vendors/jQRangeSlider-5.7.2/css/classic.css" />
    <!-- tabulator -->
    <link rel="stylesheet" href="/resources/vendors/tabulator/css/tabulator_simple.min.css" />
    <!-- waitMe -->
    <link rel="stylesheet" href="/resources/vendors/waitMe/waitMe.min.css" />
</head>
<body>
<c:if test="${jangeagongji == 'on'}">
<div class="jangea">장애공지!!</div>
</c:if>
<content tag="script">
<script type="text/javascript" src="/resources/jquery-ui/1.12.0/jquery-ui.min.js"></script>
<script type="text/javascript" src="/resources/vendors/jQRangeSlider-5.7.2/jQAllRangeSliders-min.js"></script>
<script type="text/javascript" src="/resources/vendors/tabulator/js/tabulator.min.js"></script>
<script type="text/javascript" src="/resources/js/main.js"></script>

<!-- ECharts -->
<script type="text/javascript" src="/resources/vendors/echarts/echarts.min.js"></script>

<!-- uploadify -->
<script type="text/javascript" src="/resources/vendors/jQuery-Upload-File/4.0.11/jquery.uploadfile.js"></script>

</content>

</body>