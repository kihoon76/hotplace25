<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c"	uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<div class="modal-dialog" role="document">
	<div class="modal-content">
		<div class="modal-header">
			<h2 class="modal-title">
				관심물건
			</h2>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<i class="ambicon-015_mark_times"></i><span class="hidden">닫기</span>
			</button>
		</div>
		<div class="modal-body">
			<div class="unit dvCateGwansim">
				<div class="unit_cont bgWhite">
					<table class="tableStyle borderStyle left">
						<colgroup>
							<col style="width:100px;">
							<col style="width:*;">
						</colgroup>
						<tbody>
							<tr>
								<th>등록물건지번</th>
								<td>${gwansim.address}</td>
							</tr>
							<tr>
								<th>메모</th>
								<td>
									<textarea class="inp" style="width:100%; height:100px;" placeholder="남기실 메모를 입력해 주세요" id="txtMypageGwansimMemo">${gwansim.memo}</textarea>
									<span class="helpCont EMPTY">메모를  입력해 주세요</span>
								</td>
							</tr>
							<tr>
								<th>물건종류</th>
								<c:choose>
								<c:when test="${gwansim.mulgeonType eq 'K'}">
								<td><i class="icon"><img src="resources/img/marker/gyeongmae.png"></i></td>
								</c:when>
								<c:when test="${gwansim.mulgeonType eq 'G'}">
								<td><i class="icon"><img src="resources/img/marker/gongmae.png"></i></td>
								</c:when>
								<c:when test="${gwansim.mulgeonType eq 'B'}">
								<td><i class="icon"><img src="resources/img/marker/bosang.png"></i></td>
								</c:when>
								<c:when test="${gwansim.mulgeonType eq 'P'}">
								<td><i class="icon"><img src="resources/img/marker/pyeonib.png"></i></td>
								</c:when>
								<c:when test="${gwansim.mulgeonType eq 'S'}">
								<td><i class="icon"><img src="resources/img/marker/silgeolae.png"></i></td>
								</c:when>
								<c:otherwise>
								<td>&nbsp;</td>
								</c:otherwise>
								</c:choose>
							</tr>
							<tr>
								<td colspan="2" class="center">
									<div id="dvGwansimMap" style="width:400px; height:300px; z-index:10; margin:0 auto;"></div>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="modal-footer">
			<button type="button" id="btnGwansimModify" class="btnstyle middle blue" style="width:80px;">수정</button>
			<!--<button type="button" class="btnstyle middle blue" id="btnRegGwansimMulgeon">등록</button>
			<button type="button" class="btnstyle middle gray" data-dismiss="modal">취소</button>-->
		</div>
	</div>
</div>