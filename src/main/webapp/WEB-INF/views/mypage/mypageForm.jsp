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
				<!--<div class="unit_cont bgWhite"></div>-->
				<div class="unit_cont tabWrap">
					<div class="tab-head">
						<ul class="nav-tabs">
							<li class="tabLink active">
								<button href="#tabMypageAccount" data-toggle="tab"><span class="text">계정정보</span></button>
							</li>
							<li class="tabLink">
								<button href="#tabMypagePayment" data-toggle="tab"><span class="text">결제내역</span></button>
							</li>
							<li class="tabLink">
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
					<div class="tab-content" style="min-height:680px;">
						<div id="tabMypageAccount" class="tab-pane active">
							<div class="unit_cont bgWhite lineBox" style="border-top:0; border-bottom:0;">
								<table class="tableStyle formStyle left">
								<colgroup>
									<col style="width:20%;">
									<col style="width:*;">
								</colgroup>
								<tbody>
									<tr>
										<th>아이디</th>
										<td>
											<input type="text" id="mypageAccUserId" class="inp" style="width:60%;" value="${account.id}" disabled>
										</td>
									</tr>
									<tr>
										<th>비밀번호</th>
										<td>
											<input type="password" id="mypageAccPw" class="inp" style="width:100%;">
											<span class="helpCont FORMAT">비밀번호 형식이 맞지 않습니다(최소 8자 이상, 대문자 + 소문자 + 숫자 + 특수문자 조합)(\&lt;&gt;제외)</span>
										</td>
									</tr>
									<tr>
										<th>비밀번호확인</th>
										<td>
											<input type="password" id="mypageAccPwConfirm" class="inp" style="width:100%;">
											<span class="helpCont CONFIRM">비밀번호가 일치하지 않습니다</span>
										</td>
									</tr>
									<tr>
										<th>이름</th>
										<td>
											<input type="text" id="mypageAccUserName" class="inp" style="width:100%;" value="${account.userName}">
											<span class="helpCont EMPTY">이름을 입력하세요</span>
										</td>
									</tr>
									<tr>
										<th>이메일 주소</th>
										<td>
											<div class="inputGroup">
												<c:set var="email" value="${account.email}" />
												<c:set var="emailDirect" value="Y" />
												<input type="text" id="mypageAccUserEmail" class="inp fl" style="width:50%;">
												<span class="inline center fl" style="width:5%;">@</span>
												<select class="inp fl" style="width:45%;" id="mypageAccUserEmail2">
													<option value="X">== 선택하세요 ==</option>
													<c:choose>
														<c:when test="${account.email2 == 'naver.com'}">
														<c:set var="emailDirect" value="N" />
														<option value="naver.com" selected>naver.com</option>
														</c:when>
														<c:otherwise><option value="naver.com">naver.com</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.email2 == 'daum.net'}">
														<c:set var="emailDirect" value="N" />
														<option value="daum.net" selected>daum.net</option>
														</c:when>
														<c:otherwise><option value="daum.net">daum.net</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.email2 == 'nate.com'}">
														<c:set var="emailDirect" value="N" />
														<option value="nate.com" selected>nate.com</option>
														</c:when>
														<c:otherwise><option value="nate.com">nate.com</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.email2 == 'hotmail.com'}">
														<c:set var="emailDirect" value="N" />
														<option value="hotmail.com" selected>hotmail.com</option>
														</c:when>
														<c:otherwise><option value="hotmail.com">hotmail.com</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.email2 == 'yahoo.com'}">
														<c:set var="emailDirect" value="N" />
														<option value="yahoo.com" selected>yahoo.com</option>
														</c:when>
														<c:otherwise><option value="yahoo.com">yahoo.com</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.email2 == 'empas.com'}">
														<c:set var="emailDirect" value="N" />
														<option value="empas.com" selected>empas.com</option>
														</c:when>
														<c:otherwise><option value="empas.com">empas.com</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.email2 == 'korea.com'}">
														<c:set var="emailDirect" value="N" />
														<option value="korea.com" selected>korea.com</option>
														</c:when>
														<c:otherwise><option value="korea.com">korea.com</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.email2 == 'dreamwiz.com'}">
														<c:set var="emailDirect" value="N" />
														<option value="dreamwiz.com" selected>dreamwiz.com</option>
														</c:when>
														<c:otherwise><option value="dreamwiz.com">dreamwiz.com</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.email2 == 'gmail.com'}">
														<c:set var="emailDirect" value="N" />
														<option value="gmail.com" selected>gmail.com</option>
														</c:when>
														<c:otherwise><option value="gmail.com">gmail.com</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${emailDirect == 'Y'}">
															<option value="D" selected>직접입력</option>
														</c:when>
														<c:otherwise>
															<c:set var="email" value="${account.email1}" />
															<option value="D">직접입력</option>
														</c:otherwise>
													</c:choose>
												</select>	
												<input type="hidden" id="hdnEmail" value="${email}" />										
											</div>
											<span class="helpCont EMPTY">email을 입력하세요</span>
											<span class="helpCont SELECT">email을 선택하세요</span>
											<span class="helpCont FORMAT">email 형식이 올바르지 않습니다</span>
										</td>
									</tr>
									<tr>
										<th>연락처</th>
										<td>
											<div class="inputGroup">
												<select class="inp fl" style="width:30%;" id="mypageAccUserPhoneF">
													<c:choose>
														<c:when test="${account.phone1 == '010'}">
														<option value="010" selected>010</option>
														</c:when>
														<c:otherwise><option value="010">010</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '016'}">
														<option value="016" selected>016</option>
														</c:when>
														<c:otherwise><option value="016">016</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '017'}">
														<option value="017" selected>017</option>
														</c:when>
														<c:otherwise><option value="017">017</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '018'}">
														<option value="018" selected>018</option>
														</c:when>
														<c:otherwise><option value="018">018</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '019'}">
														<option value="019" selected>019</option>
														</c:when>
														<c:otherwise><option value="019">019</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '02'}">
														<option value="02" selected>02</option>
														</c:when>
														<c:otherwise><option value="02">02</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '031'}">
														<option value="031" selected>031</option>
														</c:when>
														<c:otherwise><option value="031">031</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '032'}">
														<option value="032" selected>032</option>
														</c:when>
														<c:otherwise><option value="032">032</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '033'}">
														<option value="033" selected>033</option>
														</c:when>
														<c:otherwise><option value="033">033</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '041'}">
														<option value="041" selected>041</option>
														</c:when>
														<c:otherwise><option value="041">041</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '042'}">
														<option value="042" selected>042</option>
														</c:when>
														<c:otherwise><option value="042">042</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '043'}">
														<option value="043" selected>043</option>
														</c:when>
														<c:otherwise><option value="043">043</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '044'}">
														<option value="044" selected>044</option>
														</c:when>
														<c:otherwise><option value="044">044</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '051'}">
														<option value="051" selected>051</option>
														</c:when>
														<c:otherwise><option value="051">051</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '052'}">
														<option value="052" selected>052</option>
														</c:when>
														<c:otherwise><option value="052">052</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '053'}">
														<option value="053" selected>053</option>
														</c:when>
														<c:otherwise><option value="053">053</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '054'}">
														<option value="054" selected>054</option>
														</c:when>
														<c:otherwise><option value="054">054</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '055'}">
														<option value="055" selected>055</option>
														</c:when>
														<c:otherwise><option value="055">055</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '061'}">
														<option value="061" selected>061</option>
														</c:when>
														<c:otherwise><option value="061">061</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '062'}">
														<option value="062" selected>062</option>
														</c:when>
														<c:otherwise><option value="062">062</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '063'}">
														<option value="063" selected>063</option>
														</c:when>
														<c:otherwise><option value="063">063</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '064'}">
														<option value="064" selected>064</option>
														</c:when>
														<c:otherwise><option value="064">064</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '0502'}">
														<option value="0502" selected>0502</option>
														</c:when>
														<c:otherwise><option value="0502">0502</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '0504'}">
														<option value="0504" selected>0504</option>
														</c:when>
														<c:otherwise><option value="0504">0504</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '0505'}">
														<option value="0505" selected>0505</option>
														</c:when>
														<c:otherwise><option value="0505">0505</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '0506'}">
														<option value="0506" selected>0506</option>
														</c:when>
														<c:otherwise><option value="0506">0506</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '0507'}">
														<option value="0507" selected>0507</option>
														</c:when>
														<c:otherwise><option value="0507">0507</option></c:otherwise>
													</c:choose>
													<c:choose>
														<c:when test="${account.phone1 == '070'}">
														<option value="070" selected>070</option>
														</c:when>
														<c:otherwise><option value="070">070</option></c:otherwise>
													</c:choose>
												</select>		
												<span class="inline center fl" style="width:5%;">-</span>
												<input type="text" id="mypageAccUserPhoneM" class="inp fl NUMBER_ONLY" style="width:30%;" maxlength="4" value="${account.phone2}" data-value="${account.phone2}">
												<span class="inline center fl" style="width:5%;">-</span>
												<input type="text" id="mypageAccUserPhoneL" class="inp fl NUMBER_ONLY" style="width:30%;" maxlength="4" value="${account.phone3}" data-value="${account.phone3}">
											</div>
											<span class="helpCont EMPTY">숫자를 입력해 주세요</span>
											<span class="helpCont PHONE_M">가운데자리 3자리~4자리를 입력해 주세요</span>
											<span class="helpCont PHONE_L">끝자리 4자리를 입력해 주세요</span>
										</td>
									</tr>
								</tbody>
								</table>
							</div>
						
							<div class="btnArea right mgT10">
								<button type="button" class="btnstyle middle blue" id="btnAccModifyAccount" style="margin-right:10px; width:80px;">수정</button>
							</div>
						</div>
						<div id="tabMypagePayment" class="tab-pane">
							<table class="tableStyle gridStyle bgWhite">
								<colgroup>
									<col style="width:15%;">
									<col style="width:10%;">
									<col style="width:10%;">
									<col style="width:10%;">
									<col style="width:10%;">
									<col style="width:35%;">
									<col style="width:10%;">
								</colgroup>
								<thead>
									<tr>
										<th>신청일자</th>
										<th>결제금액</th>
										<th>진행상태</th>
										<th>쿠폰사용</th>
										<th>쿠폰번호</th>
										<th>결제내용</th>
										<th>상세</th>
									</tr>
								</thead>
								<tbody>
								<c:choose>
									<c:when test="${fn:length(paymentHistory) == 0}">
									<tr class="NO-DATA">
										<td colspan="6">결제내역이 존재하지 않습니다.</td>
									</tr>
									</c:when>
									<c:otherwise>
									<c:forEach var="payment" items="${paymentHistory}" varStatus="status">
									<tr>
										<td class="left ellipsis">${payment.applyDate}</td>
										<td class="left ellipsis">${payment.sum}</td>
										<td class="left ellipsis">${payment.status}</td>
										<td class="left ellipsis">${payment.useCoupon}</td>
										<td class="left ellipsis">${payment.couponNum}</td>
										<td class="left ellipsis">${payment.applyComment}</td>
										<td class="PAYMENT_DETAIL" 
											data-key="${payment.key}" 
											data-apply-date="${payment.applyDate}"
											data-status="${payment.status}"
											data-coupon-num="${payment.couponNum}"
											data-coupon-value="${payment.couponValue}"
											data-coupon-unit="${payment.couponUnit}">
											<span class="iconRBtnDel"><i class="ambicon-023_trash"></i></span>
										</td>
									</tr>
									</c:forEach>
									</c:otherwise>
								</c:choose>
								</tbody>
							</table>
						</div>
						<div id="tabMypageGwansimMulgeon" class="tab-pane">
							<table class="tableStyle gridStyle dvGwansimMulgeon bgWhite">
								<colgroup>
									<col style="width:15%;">
									<col style="width:25%;">
									<col style="width:53%;">
									<col style="width:7%;">
								</colgroup>
								<thead>
									<tr>
										<th>등록일</th>
										<th>물건주소</th>
										<th>메모내용</th>
										<th>삭제</th>
									</tr>
								</thead>
								<tbody>
								<c:choose>
									<c:when test="${fn:length(gwansim) == 0}">
									<tr class="NO-DATA">
										<td colspan="4">등록된 관심물건이 없습니다.</td>
									</tr>
									</c:when>
									<c:otherwise>
									<c:forEach var="item" items="${gwansim}" varStatus="status">
									<tr data-lat="${item.lat}" data-lng="${item.lng}" data-pnu="${item.pnu}" data-address="${item.address}" data-key="${item.gwansimMulgeonNum}">
										<td>${item.regDate}</td>
										<td class="left ellipsis">${item.address}</td>
										<td class="left ellipsis">${item.memo}</td>
										<td class="DEL" data-address="${item.address}" data-key="${item.gwansimMulgeonNum}">
											<span class="iconRBtnDel"><i class="ambicon-023_trash"></i></span>
										</td>	
									</tr>
									</c:forEach>
									</c:otherwise>
								</c:choose>
								</tbody>
							</table>
						</div>
						<div id="tabMypageConsulting" class="tab-pane">
							<div class="serviceReady" style="margin-top:160px;">
								<span class="iconBlock"></span>
								<span class="text">서비스 준비중입니다</span>	
							</div>
						</div>
						<div id="tabMaemul" class="tab-pane">
							<div class="serviceReady" style="margin-top:160px;">
								<span class="iconBlock"></span>
								<span class="text">서비스 준비중입니다</span>	
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>