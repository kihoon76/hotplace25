<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c"	uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="req" value="${pageContext.request}" />
<c:set var="url">${req.requestURL}</c:set>
<c:set var="uri" value="${req.requestURI}" />
<!DOCTYPE html>
<!--[if IE 8]><html class="ie8" lang="ko"><![endif]-->
<!--[if IE 9]><html class="ie9" lang="ko"><![endif]-->
<!--[if gt IE 9]><!--><html lang="ko"><!--<![endif]-->
<head>
	<meta charset="UTF-8">
    <title><sitemesh:write property="title" /></title>
    <link rel="icon" href="${fn:substring(url, 0, fn:length(url) - fn:length(uri))}${req.contextPath}/resources/img/favicon.png" type="image/png" />
    <!-- bootstrap -->
	<link rel="stylesheet" href="/resources/bootstrap/bootstrap.css">

	<sitemesh:write property="head" />
</head>

<body data-url="${fn:substring(url, 0, fn:length(url) - fn:length(uri))}${req.contextPath}/">
	<!-- top GNB영역 -->
	<div id="gnbArea" class="gnbArea">
		<h1><a href="#" class="logo"><span class="hidden">HotPlace25</span></a></h1>

		<div class="dvBtnArea">
			<!-- 타임뷰 Range -->
			<div id="dvTimeview" class="dvTimeview">
				<div id="dvAutoYearRange" class="dvAutoYearRange">
					<label for="btnAutoYear" class="btnAutoYear">
						<input type="checkbox" id="btnAutoYear" class="hidden" disabled />
						<i class="btnIcon"></i>
					</label>
				</div>
				<div id="dvYearRange" class="dvYearRange"></div>
			</div>
			
			<!-- 타임뷰 버튼 -->
			<button id="btnTimeview" class="mapBtn btnTimeview" data-switch="off">타임뷰</button>	

			<!-- 지적도 버튼 -->			
			<button id="btnJijeok" class="mapBtn btnJijeok" data-switch="off">지적도</button>	


			<!-- 일반 버튼 -->	
			<button id="btnMapNormal" class="mapBtn btnMapNormal active">일반</button>

			<!-- 위성 버튼 -->	
			<button id="btnMapSatellite" class="mapBtn btnMapSatellite">위성</button>
		</div>

		<div class="dvEtc">
			<button type="button" class="unit contact" id="modalTest" title="contact us"><span class="hidden">contact us</span></button>
			<button type="button" class="unit login"  id="loginBtn"   title="로그인"><span class="hidden">로그인</span></button>
		</div>
	</div>
	
	<!-- 좌측 LNB영역 -->
	<div id="lnbArea" class="lnbArea">
		<button type="button" class="menuToogle"><span class="hidden">메뉴열기/닫기</span></button>

		<ul id="memuList" class="memuList">
			<li class="active">
				<a href="#" class="menu01" data-name="menuCont01"><i class="icon"></i><span>주소 검색</span></a>
			</li>
			<li>
				<a href="#" class="menu02" data-name="menuCont02"><i class="icon"></i><span>투자 유망 지역 검색</span></a>
			</li>
			<li>
				<a href="#" class="menu03" data-name="menuCont03"><i class="icon"></i><span>경•공매 물건 검색</span></a>
			</li>
			<li class="disabled">
				<a href="#" class="menu04" data-name="menuCont04"><i class="icon"></i><span>물건보기</span></a>
			</li>
			<li>
				<a href="#" class="menu05" data-name="menuCont05"><i class="icon"></i><span>히트맵보기</span></a>
			</li>
		</ul>
	</div>

	<!-- menu 컨텐츠 노출영역 -->
	<div id="lnbCont" class="lnbCont">
		<div id="menuCont01" class="lnbContWrap" style="display:; width:500px;">
			<!-- ssi(Server Side Includes) 가 설정된 웹서버에서만 실행됨// 필요한 방식으로 호출하삼 -->
			<!--#include virtual="lnbCont_01.html" -->
		</div>

		<div id="menuCont02" class="lnbContWrap">
			<!-- ssi(Server Side Includes) 가 설정된 웹서버에서만 실행됨// 필요한 방식으로 호출하삼 -->
			<!--#include virtual="lnbCont_02.html" -->
		</div>

		<div id="menuCont03" class="lnbContWrap">
			<!-- ssi(Server Side Includes) 가 설정된 웹서버에서만 실행됨// 필요한 방식으로 호출하삼 -->
			<!--#include virtual="lnbCont_03.html" -->
		</div>

		<div id="menuCont04" class="lnbContWrap">
			<!-- ssi(Server Side Includes) 가 설정된 웹서버에서만 실행됨// 필요한 방식으로 호출하삼 -->
			<!--#include virtual="lnbCont_04.html" -->
		</div>

		<div id="menuCont05" class="lnbContWrap">
			<!-- ssi(Server Side Includes) 가 설정된 웹서버에서만 실행됨// 필요한 방식으로 호출하삼 -->
			<!--#include virtual="lnbCont_05.html" -->
		</div>
	</div>
	
	<!-- map 영역 -->
	<div id="mapArea" class="mapArea">
		<!-- naver map -->
		<div id="map"></div>

		<div class="rightArea">
			<!-- 면적재기 버튼 -->
			<button id="btnCalcArea" class="mapBtn btnCalcArea" data-switch="off" title="면적재기">면적</button>
			<!-- 거리재기 버튼 -->
			<button id="btnCalcDistance" class="mapBtn btnCalcDistance"  data-switch="off" title="거리재기">거리</button>
			<!-- 거리뷰 버튼 -->
			<button id="btnStreetView" class="mapBtn btnStreetView"  data-switch="off" title="거리뷰">거리뷰</button>				
		</div>
	</div>
	
<!-- <div id="map" data-vender="naver">
	<div id="dvTimeview">
		<div id="dvAutoYearRange" class="layer-year-range-auto">
	        <input type="checkbox" id="btnAutoYear" data-toggle="toggle" data-on="<i class='fa fa-play'></i>" data-off="<i class='fa fa-pause'></i>">
		</div>
		<div id="dvYearRange"  class="layer-year-range"></div>
		<button class="btn-timeview" data-switch="off">타임뷰</button>
	</div>
	<button id="btnJijeok" class="map-button jijeok" data-switch="off">지적도</button>
	<button id="btnMapNormal" class="map-button map-normal">일반</button>
	<button id="btnMapSatellite" class="map-button map-satellite">위성</button>
	<button id="btnCalcArea" class="map-button area">면적</button>
	<button id="btnCalcDistance" class="map-button distance">거리</button>
	<button id="btnTimeView" class="map-button timeview">타임뷰</button>
	<button id="btnStreetView" class="map-button streetview" data-switch="off">거리뷰</button>
</div>-->
	<div id="dimScreen"></div>
	<div id="dvIntro"></div>
	<div id="dvStreetView">
		<div id="dvStreetViewHeader"><a href="#" style="text-decoration:none;" class="pano-close"><span style="color:#fff; font-size:1.5em;position:relative; top:-5px; left:98%;">&times;</span></a></div>
		<div id="dvStreetViewContent">
			<div id="dvStreet"></div>
			<div id="dvStreetMini"></div>
		</div>
	</div>

<!-- bootstrap modal 영역 -->
	<div class="modal" id="modalPopup" tabindex="-1" role="dialog" aria-labelledby="modalTitle">
		
	</div>

	<!-- bootstrap modal 영역 -->
	<div class="modal" id="modalPopup2" tabindex="-1" role="dialog" aria-labelledby="modalTitle">
		
	</div>
<!-- <div id="dvTimeView" class="timeview-canvas">
	<table border="1">
		<colgroup>
			<col width="50%" />
			<col width="50%" />
		</colgroup>
		<tr>
			<td>2014년</td>
			<td>2015년</td>
		</tr>
		<tr>
			<td id="2014Map" class="map-capture"></td>
			<td id="2015Map" class="map-capture"></td>
		</tr>
		<tr>
			<td>2016년</td>
			<td>2017년</td>
		</tr>
		<tr>
			<td id="2016Map" class="map-capture"></td>
			<td id="2017Map" class="map-capture"></td>
		</tr>
	</table>
</div>-->
<sitemesh:write property="body" />
<script type="text/javascript" src="/resources/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript" src="/resources/handlebars/4.0.5/handlebars.min.js"></script>
<script type="text/javascript" src="/resources/vendors/waitMe/waitMe.min.js"></script>
<script type="text/javascript" src="/resources/jquery-ui/1.12.0/jquery-ui.min.js"></script>
<script type="text/javascript" src="/resources/bootstrap/bootstrap.min.js" ></script>
<script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?clientId=SgnlyXnzstmDsYDhele7&submodules=panorama"></script>
<c:if test="${debug eq 'on'}">
<script type="text/javascript" src="/resources/js/src/map/hotplace.js"></script>
<script type="text/javascript" src="/resources/js/src/map/hotplace.maps.js"></script>
<script type="text/javascript" src="/resources/js/src/map/hotplace.minimaps.js"></script>
<script type="text/javascript" src="/resources/js/src/map/hotplace.panomaps.js"></script>
<script type="text/javascript" src="/resources/js/src/map/hotplace.report.js"></script>
<script type="text/javascript" src="/resources/js/src/map/hotplace.validation.js"></script>
<script type="text/javascript" src="/resources/js/src/map/hotplace.calc.js"></script>
<script type="text/javascript" src="/resources/js/src/map/hotplace.chart.js"></script>
<script type="text/javascript" src="/resources/js/src/map/hotplace.database.js"></script>
<script type="text/javascript" src="/resources/js/src/map/hotplace.dom.js"></script>
<script type="text/javascript" src="/resources/js/src/map/hotplace.search.js"></script>
<script type="text/javascript" src="/resources/js/src/map/hotplace.streetview.js"></script>
</c:if>
<c:if test="${debug eq 'off'}">
<script type="text/javascript" src="/resources/js/dist/hotplace-all.min.js"></script>
</c:if>
<sitemesh:write property="page.script" />
<script type="text/javascript">
	window.onload = function() {
		 $('#dvIntro').hide();
	}
</script>
</body>
</html>