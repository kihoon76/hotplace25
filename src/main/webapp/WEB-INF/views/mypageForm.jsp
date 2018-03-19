<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c"	uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<div class="modal-dialog" role="document">
	<div class="modal-content">
		<div class="modal-header">
			<h2 class="modal-title">
				My Page
			</h2>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<i class="ambicon-015_mark_times"></i><span class="hidden">닫기</span>
			</button>
		</div>
		<div class="modal-body dvMypage">
			<div class="unit">
				<div class="unit_cont bgWhite"></div>
				<div class="unit_cont tabWrap">
					<div class="tab-head">
						<ul class="nav-tabs">
							<li class="tabLink active">
								<button href="#tabMypageGwansimMulgeon" data-toggle="tab"><span class="text">관심물건</span></button>
							</li>
							<li class="tabLink">
								<button href="#tabMypageConsulting" data-toggle="tab"><span class="text">&nbsp;컨설팅&nbsp;</span></button>
							</li>
							<li class="tabLink">
								<button href="#tabMaemul" data-toggle="tab"><span class="text">&nbsp;&nbsp;매물&nbsp;&nbsp;</span></button>
							</li>
						</ul>
					</div>
					<div class="tab-content bgWhite" style="min-height:500px;">
						<div id="tabMypageGwansimMulgeon" class="tab-pane active">
							<table class="tableStyle gridStyle dvGwansimMulgeon">
								<colgroup>
									<col style="width:15%;">
									<col style="width:25%;">
									<col style="width:55%;">
									<col style="width:5%;">
								</colgroup>
								<thead>
									<tr>
										<th>등록일</th>
										<th>물건주소</th>
										<th>메모내용</th>
										<th>&nbsp;</th>
									</tr>
								</thead>
								<tbody>
								<c:choose>
									<c:when test="${fn:length(gwansim) == 0}">
									<tr>
										<td colspan="4">등록된 관심물건이 없습니다.</td>
									</tr>
									</c:when>
									<c:otherwise>
									<c:forEach var="item" items="${gwansim}" varStatus="status">
									<tr data-lat="${item.lat}" data-lng="${item.lng}" data-pnu="${item.pnu}">
										<td>${item.regDate}</td>
										<td>${item.address}</td>
										<td class="left ellipsis">${item.memo}</td>
										<td><span class="glyphicon glyphicon-minus-sign" style="color:red; font-size:1.2em;"></span></td>	
									</tr>
									</c:forEach>
									</c:otherwise>
								</c:choose>
								
								
								</tbody>
							</table>
						</div>
						<div id="tabMypageConsulting" class="tab-pane">tab2</div>
						<div id="tabMaemul" class="tab-pane">tab3</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>