<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>
<%@ taglib prefix="c"	uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<%@ taglib prefix="sec" uri="http://www.springframework.org/security/tags" %>

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
    <link rel="stylesheet" href="/resources/vendors/bootstrap/bootstrap.css" />

	<sitemesh:write property="head" />
</head>
<body data-url="${fn:substring(url, 0, fn:length(url) - fn:length(uri))}${req.contextPath}/" data-year="${currYear}">
	<!-- top GNB영역 -->
	<div id="gnbArea" class="gnbArea">
		<h1><a href="" class="logo"><span class="hidden">HotPlace25</span></a></h1>
		<c:if test="${jangeagongji eq 'on'}">
		<h1 class="spanJangeagongji">장애공지중.....</h1>
		</c:if>
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
			<span class="boxUnit"> 
				<button type="button" class="unit fullScreen" id="gnbFullScreen" title="전체화면" data-active="false"><span class="hidden">전체화면</span></button>
			</span>
			<span class="boxUnit">
				<button type="button" class="unit contact" id="modalTest" title="contact us"><span class="hidden">contact us</span></button>
				<div class="dropMenu">
					<ul class="dropMenuBox">
						<li><a href="#" class="link" id="modalMypage">My Page</a></li>
						<li><a href="#" class="link" id="modalNotice">공지사항</a></li>
						<li><a href="#" class="link" id="modalSite">서비스소개</a></li>
						<li><a href="#" class="link" id="modalTutorial">사용법</a></li>
					</ul>
				</div>
			</span>
			<span class="boxUnit">
				<sec:authorize access="hasRole('ROLE_JOINED')">
				<button type="button" class="unit login" id="gnbLogin" title="로그인" style="display: none;"><span class="hidden">로그인</span></button>
				<button type="button" class="unit logout" id="gnbLogout" title="로그아웃" style="display:block;"><span class="hidden">로그아웃</span></button>
				</sec:authorize>
				<sec:authorize access="!hasRole('ROLE_JOINED')">
				<button type="button" class="unit login" id="gnbLogin" title="로그인" style="display:block;"><span class="hidden">로그인</span></button>
				<button type="button" class="unit logout" id="gnbLogout" title="로그아웃" style="display: none;"><span class="hidden">로그아웃</span></button>
				</sec:authorize>
				
			</span>
		</div>
	</div>

	<!-- 문의하기 영역//항상노출 -->
	<div class="contactUsLayer">
		<dl>
			<dt>연락처</dt>
			<dd><input id="txtQuestionPhone" type="text" class="inp" placeholder="연락처: '-'없이 숫자만 입력" maxlength="15"/></dd>
		</dl>
		<dl>
			<dt>상담내용</dt>
			<dd><textarea id="txtQuestionContent" class="inp" placeholder="상담내용 입력"></textarea></dd>
		</dl>
		<div class="btnArea">
			<button id="btnQuestionApply" type="button" class="btnstyle middle blue">상담신청</button>
		</div>
	</div>
	
	<!-- 좌측 LNB영역 -->
	<div id="lnbArea" class="lnbArea">
		<button type="button" class="menuToogle"><span class="hidden">메뉴열기/닫기</span></button>

		<ul id="memuList" class="memuList">
			<li>
				<a href="#" class="menu01" data-name="addrSearchMenu" data-new="true"><i class="icon"></i><span>주소 검색</span></a>
			</li>
			<li>
				<a href="#" class="menu02" data-name="toojaRegionSearchMenu" data-new="false"><i class="icon"></i><span>투자 유망 지역 검색</span></a>
			</li>
			<li>
				<a href="#" class="menu03" data-name="gyeonggongSearchMenu" data-new="false"><i class="icon"></i><span>경•공매 물건 검색</span></a>
			</li>
			<li id="lnbMulgeonLi" class="disabled MULGEON" data-key="MULGEON">
				<a href="#" class="menu04" data-name="mulgeonViewMenu" data-new="false" data-first-load="true"><i class="icon"></i><span>물건보기</span></a>
			</li>
			<li>
				<a href="#" class="menu05" data-name="heatmapViewMenu" data-new="false"><i class="icon"></i><span>히트맵보기</span></a>
			</li>
		</ul>
	</div>

	<!-- menu 컨텐츠 노출영역 -->
	<div id="lnbCont" class="lnbCont">
		<div id="addrSearchMenu" class="lnbContWrap" style="display:; width:500px;"></div>
		<div id="toojaRegionSearchMenu" class="lnbContWrap" style="width:750px;"></div>
		<div id="gyeonggongSearchMenu" class="lnbContWrap" style="width:750px;"></div>
		<div id="mulgeonViewMenu" class="lnbContWrap" style="width:280px;"></div>
		<div id="heatmapViewMenu" class="lnbContWrap" style="width:280px;"></div>
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
		
		<div id="dvStreetView">
			<div id="dvStreetViewHeader">
				<span class="tit logo"><span class="hidden">HotPlace25</span></span>
				<a href="#" class="pano-close">
					<i class="ambicon-015_mark_times">
						<span class="hidden">닫기</span>
					</i>
				</a>
			</div>
			
			<div id="dvStreetViewContent">
				<div id="dvStreet"></div>
				<div id="dvStreetMini"></div>
			</div>
		</div>
		
		<div id="dvContextMenu" class="context-menu">
			<div class="context-menu-body">
				<button id="btnContextLocAddress" class="context-btn"><span class="text">위치 주소보기</span></button>
			</div>
		</div>
	</div>

	<div id="footer" class="footer">
		<span class="text">
			(주)동림피앤디 도시계획부 대표자 : 이석우
			&nbsp;&nbsp;&nbsp;&nbsp;
			사업자등록번호 : 215-86-29302 
			&nbsp;&nbsp;&nbsp;&nbsp;
			주소 : 서울 송파구 법원로 127 문정대명벨리온 1108호 
			&nbsp;&nbsp;&nbsp;&nbsp;
			대표전화 : 070-7117-6782
			&nbsp;&nbsp;&nbsp;&nbsp;
			<strong>본 정보를 이용한 결과의 책임은 투자자에게 귀속됩니다.</strong> 
			&nbsp;&nbsp;&nbsp;&nbsp;
			Copyright (주)동림피앤디 All Rights Reserved.
		</span>
	</div>
	
	<div id="dimScreen"></div>

	<!-- bootstrap modal 영역 -->
	<div class="modal" id="modalPopup" tabindex="-1" role="dialog"></div>

	<!-- bootstrap modal에서 modal을 띄울때만 사용 영역 -->
	<div class="modal" id="momPopup" tabindex="-1" role="dialog"></div>
	
	<!-- alert modal을 띄울때만 사용 영역 -->
	<div class="modal" id="alrtPopup" tabindex="-1" role="dialog"></div>
	
	<!-- bootstrap modal에서 image popup을 띄울때만 사용 영역 -->
	<div class="modal" id="imagePopup" tabindex="-1" role="dialog"></div>

<sitemesh:write property="body" />
<script type="text/javascript" src="/resources/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript" src="/resources/vendors/jQuery-Cookie/jquery.cookie.min.js"></script>
<script type="text/javascript" src="/resources/handlebars/4.0.5/handlebars.min.js"></script>
<script type="text/javascript" src="/resources/vendors/waitMe/waitMe.min.js"></script>
<script type="text/javascript" src="/resources/jquery-ui/1.12.0/jquery-ui.min.js"></script>
<script type="text/javascript" src="/resources/vendors/bootstrap/bootstrap.min.js"></script>

<script type="text/javascript" src="https://openapi.map.naver.com/openapi/v3/maps.js?clientId=SgnlyXnzstmDsYDhele7&submodules=panorama,geocoder"></script>
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
<script type="text/javascript" src="/resources/js/src/map/hotplace.menu.js"></script>
<script type="text/javascript" src="/resources/js/src/map/hotplace.streetview.js"></script>
<script type="text/javascript" src="/resources/js/src/map/hotplace.util.js"></script>
<script type="text/javascript" src="/resources/js/src/map/hotplace.spot.js"></script>
<script type="text/javascript" src="/resources/js/src/map/hotplace.upload.js"></script>
<script type="text/javascript" src="/resources/js/src/map/hotplace.notice.js"></script>
<script type="text/javascript" src="/resources/js/src/map/hotplace.gyeongmae.js"></script>
<script type="text/javascript" src="/resources/js/src/map/hotplace.acceptbuilding.js"></script>
<script type="text/javascript" src="/resources/js/src/map/hotplace.gongmae.js"></script>
<script type="text/javascript" src="/resources/js/src/map/hotplace.silgeolae.js"></script>
<script type="text/javascript" src="/resources/js/src/map/hotplace.bosangpyeonib.js"></script>
<script type="text/javascript" src="/resources/js/src/map/hotplace.sujibunseog.js"></script>
<script type="text/javascript" src="/resources/js/src/map/hotplace.mypage.js"></script>  
<script type="text/javascript" src="/resources/js/src/map/hotplace.payment.js"></script> 
</c:if>
<c:if test="${debug eq 'off'}">
<script type="text/javascript" src="/resources/js/dist/hotplace-all.min.js"></script>
</c:if>
<sitemesh:write property="page.script" />
</body>
</html>