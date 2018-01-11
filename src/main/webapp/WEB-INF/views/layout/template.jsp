<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c"	uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="req" value="${pageContext.request}" />
<c:set var="url">${req.requestURL}</c:set>
<c:set var="uri" value="${req.requestURI}" />
<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
    <title><sitemesh:write property="title" /></title>
    <link rel="icon" href="${fn:substring(url, 0, fn:length(url) - fn:length(uri))}${req.contextPath}/resources/img/favicon.png" type="image/png" />
    <link rel="stylesheet" href="/resources/css/map.css" />

	<sitemesh:write property="head" />
</head>

<body data-url="${fn:substring(url, 0, fn:length(url) - fn:length(uri))}${req.contextPath}/">
<div id="map" data-vender="naver">
	<div id="minimap1" class="minimap" style="top:150px; right:-110px;" data-year="201601">
		<label id="minimap1Lbl" class="minimap-label"></label>
	</div>
	<div id="minimap2" class="minimap" style="top:400px; right:-310px;" data-year="201501">
		<label id="minimap2Lbl" class="minimap-label"></label>
	</div>
	<div id="minimap3" class="minimap" style="top:650px; right:-510px;" data-year="201401">
		<label id="minimap3Lbl" class="minimap-label"></label>
	</div>
	<div id="dvTimeview">
		<div id="dvAutoYearRange" class="layer-year-range-auto">
	        <input type="checkbox" id="btnAutoYear" data-toggle="toggle" data-on="<i class='fa fa-play'></i>" data-off="<i class='fa fa-pause'></i>">
		</div>
		<div id="dvYearRange"  class="layer-year-range"></div>
		<button class="btn-timeview" data-switch="off">타임뷰</button>
	</div>
	<button id="btnJijeok" class="jijeok" data-switch="off">지적도</button>
	<button id="btnCalcArea" class="area">면적재기</button>
	<button id="btnCalcDistance" class="distance" disabled>거리재기</button>
</div>
<div id="dimScreen"></div>
<div id="dvIntro"></div>
<sitemesh:write property="body" />
<script type="text/javascript" src="/resources/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript" src="/resources/handlebars/4.0.5/handlebars.min.js"></script>
<script type="text/javascript" src="/resources/vendors/waitMe/waitMe.min.js"></script>
<script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?clientId=SgnlyXnzstmDsYDhele7&submodules=panorama"></script>

<script type="text/javascript" src="/resources/js/map/hotplace.js"></script>
<script type="text/javascript" src="/resources/js/map/hotplace.maps.js"></script>
<sitemesh:write property="page.script" />
<script type="text/javascript">
	window.onload = function() {
		$('#dvIntro').hide();
	}
</script>
</body>
</html>