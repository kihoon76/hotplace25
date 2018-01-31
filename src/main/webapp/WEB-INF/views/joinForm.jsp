<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c"	uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="required" value="" />
<div class="modal-dialog" role="document">
	<div class="modal-content">
		
		<div class="modal-header">
			<h2 class="modal-title">회원가입</h2>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<i class="ambicon-015_mark_times"></i><span class="hidden">닫기</span>
			</button>
		</div>

		<div class="modal-body">

			<!-- 회원가입 step01 //////////////////// 동의부분 -->
			<div id="joinStep01" class="rowBox joinBox joinStep01" style="display:;">			
				<c:forEach var="item" items="${yaggwan}" varStatus="status">
					<c:if test="${status.index == 0}">
					<div class="unit">
					</c:if>
					<c:if test="${status.index > 0}">
					<div class="unit mgT5">
					</c:if>
						<div class="unit_tit">
							<span class="sTit">${item.categoryName}</span>
							<div class="etcText fr mgT5">
								<span class="rdchBox">
									<input type="checkbox"  id="checkbox0${status.index}" name="" data-required="${item.required}" class="YAGGWAN_AGREE"/>
									<label for="checkbox0${status.index}" class="labelCh"><em class="text">동의합니다</em></label>
								</span>
							</div>
						</div>
						<div class="unit_cont">
							<div class="termBox">${item.content}</div>
						</div>
					</div>
					<c:set var="required" value="${required}${item.required}" />
				</c:forEach>
				<div class="btnArea center mgT20">
					<button type="button" id="btnJoinStep01Next" class="btnstyle middle blue" style="width:80px;" <c:if test="${fn:indexOf(required, 'Y') >= 0}">disabled</c:if>>다음</button>
				</div>

			</div>
			<!-- //회원가입 step01 // 동의부분 -->

			<!-- 회원가입 step02 //////////////////// 정보입력 -->
			<div id="joinStep02" class="rowBox joinBox joinStep02" style="display:none;">			
				
				<div class="unit">
					<div class="unit_tit">
						<span class="sTit">정보입력</span>
					</div>
					<div class="unit_cont lineBox">
						<table class="tableStyle formStyle left">
							<colgroup>
								<col style="width:120px;">
								<col style="width:*;">
							</colgroup>
							<tbody>
								<tr>
									<th>아이디</th>
									<td>
										<input type="text" id="joinUserId" class="inp" style="width:60%;" />
										<button type="button" class="btnstyle middle white" id="btnJoinIdCheck">중복검색</button>

										<span class="helpCont EMPTY">아이디값을 입력하세요</span>
										<span class="helpCont DUP">아이디 중복체크를 하세요</span>
									</td>
								</tr>
								<tr>
									<th>비밀번호</th>
									<td>
										<input type="password" id="joinPw" class="inp" style="width:100%;" />
										<span class="helpCont EMPTY">비밀번호를 입력하세요</span>
									</td>
								</tr>
								<tr>
									<th>비밀번호확인</th>
									<td>
										<input type="password" id="joinPwConfirm" class="inp" style="width:100%;" />
										<span class="helpCont EMPTY">비밀번호를 입력하세요</span>
										<span class="helpCont CONFIRM">비밀번호가 일치하지 않습니다</span>
									</td>
								</tr>
								<tr>
									<th>이름</th>
									<td>
										<input type="text" id="joinUserName" class="inp" style="width:100%;" />
										<span class="helpCont EMPTY">이름을 입력하세요</span>
									</td>
								</tr>
								<tr>
									<th>이메일 주소</th>
									<td>
										<div class="inputGroup">
											<input type="text" id="joinUserEmail" class="inp fl" style="width:50%;" />
											<span class="inline center fl" style="width:5%;" >@</span>
											<select class="inp fl" style="width:45%;" id="joinUserEmail2">
												<option value="X">== 선택하세요 ==</option>
												<option value="naver.com">naver.com</option>
												<option value="daum.net">daum.net</option>
												<option value="nate.com">nate.com</option>
												<option value="D">직접입력</option>
											<select>											
										</div>
										<span class="helpCont EMPTY">email을 입력하세요</span>
										<span class="helpCont SELECT">email을 선택하세요</span>
									</td>
								</tr>
								<tr>
									<th>연락처</th>
									<td>
										<div class="inputGroup">
<!-- 											<input type="text" id="joinUserPhoneF" class="inp fl" style="width:30%;" /> -->
											<select class="inp fl" style="width:30%;" id="joinUserPhoneF">
												<option value="010">010</option>
												<option value="02">02</option>
											<select>		
											<span class="inline center fl"  style="width:5%;">-</span>
											<input type="text" id="joinUserPhoneM" class="inp fl NUMBER_ONLY" style="width:30%;" maxLength="4"/>
											<span class="inline center fl"  style="width:5%;">-</span>
											<input type="text" id="joinUserPhoneL" class="inp fl NUMBER_ONLY" style="width:30%;" maxLength="4"/>
										</div>
										<span class="helpCont EMPTY">숫자를 입력해 주세요</span>
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div class="btnArea center mgT20">
					<button type="button" id="btnJoinStep02Prev" class="btnstyle middle white" style="width:80px;">이전</button>
					<button type="button" id="btnJoinStep02Next" class="btnstyle middle blue" style="width:80px;">다음</button>
				</div>

			</div>
			<!-- //회원가입 step02 // 정보입력 -->


			<!-- 회원가입 step03 //////////////////// 회원가입정보 확인 -->
			<div id="joinStep03" class="rowBox joinBox joinStep03" style="display:none;">			
				
				<div class="unit">
					<div class="unit_tit">
						<span class="sTit">가입 정보확인</span>
					</div>
					<div class="unit_cont lineBox">
						<table class="tableStyle formStyle left">
							<colgroup>
								<col style="width:120px;">
								<col style="width:*;">
							</colgroup>
							<tbody>
								<tr>
									<th>아이디</th>
									<td>aaaaaaaaa</td>
								</tr>
								<tr>
									<th>비밀번호</th>
									<td>**********</td>
								</tr>
								<tr>
									<th>이름</th>
									<td>핫플레이스</td>
								</tr>
								<tr>
									<th>이메일 주소</th>
									<td>hotplace@hotplace.com</td>
								</tr>
								<tr>
									<th>연락처</th>
									<td>000-0000-0000</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>

				<div class="joinOkText">위 입력정보로 가입하겠습니다</div>

				<div class="btnArea center mgT20">
<!-- 					<button type="button" id="btnStep03Cancel" class="btnstyle middle white" style="width:80px;" data-dismiss="modal">취소</button> -->
					<button type="button" id="btnStep03Cancel" class="btnstyle middle white" style="width:80px;">취소</button>
					<button type="button" id="btnStep03Ok" class="btnstyle middle blue" style="width:80px;">확인</button>
				</div>

			</div>
			<!-- //회원가입 step03 // 회원가입정보 확인 -->


			<!-- 회원가입 step04 //////////////////// 회원가입 완료 -->
			<div id="joinStep04" class="rowBox joinBox joinStep04" style="display:none;">			
				
				<div class="joinEndText">
					<strong>"축하합니다"</strong>
					회원가입이 완료되었습니다.
				</div>

				<div class="btnArea center mgT20">
					<button type="button" id="btnStep04_login" class="btnstyle middle black" style="">로그인페이지로 이동</button>
				</div>

			</div>
			<!-- //회원가입 step04 // 회원가입 완료 -->

		</div>
	</div>
</div>
