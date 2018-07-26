<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8" trimDirectiveWhitespaces="true"%>
<%@ taglib prefix="c"	uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn"  uri="http://java.sun.com/jsp/jstl/functions" %>
<c:set var="required" value="" />
<div id="dvPayment" class="modal-dialog" role="document">
	<div class="modal-content">
		<div class="modal-header">
			<h2 class="modal-title">결제하기</h2>
			<button type="button" class="close" data-dismiss="modal" aria-label="Close">
				<i class="ambicon-015_mark_times"></i><span class="hidden">닫기</span>
			</button>
		</div>

		<div class="modal-body">
			<div class="unit">				
				<div class="unit_tit">
					<span class="sTit color_black noBullt">요금 안내</span>
				</div>
				<div class="unit_cont bgWhite">
					<table class="tableStyle gridStyle  topBold center">
						<colgroup>
							<col style="width:10%;">
							<col style="width:30%;">
							<col style="width:20%;">
							<col style="width:40%;">
						</colgroup>
						<tbody>
							<tr>
								<th rowspan="4" class="center">개별 서비스</th>
								<th class="center">투자유망지역 검색</th>
								<td>5만원 / 월</td>
								<td>도시계획시설, 토지이용규제 등 검색</td>
							</tr>
							<tr>
								<th class="center">경공매 검색</th>
								<td>5만원 / 월</td>
								<td>토지이용규제 등 검색</td>
							</tr>
							<tr>
								<th class="center">물건보기</th>
								<td>5만원 / 월</td>
								<td>경매/공매/보상/편입/실거래/건축허가</td>
							</tr>
							<tr>
								<th class="center">히트맵보기</th>
								<td>5만원 / 월</td>
								<td>공시지가/보상물건/실거래가 등</td>
							</tr>
							<tr>
								<th rowspan="2" colspan="2" class="center">전체서비스</th>
								<th class="center">월간</th>
								<td>정가: 20만원 /월  &nbsp;&nbsp; <span style="font-weight:bold; color:#ff0000;">할인가: 10만원 / 월</span></td>
							</tr>
							<tr>
								<th class="center">년간</th>
								<td>정가: 240만원 / 년  &nbsp;&nbsp; <span style="font-weight:bold; color:#ff0000;">할인가: 99만원 / 년</span></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
			<c:set var="required" value="" />
			<c:forEach var="item" items="${yaggwan}" varStatus="status">
				<c:if test="${status.index == 0}">
				<div class="unit">
				</c:if>
				<c:if test="${status.index > 0}">
				<div class="unit mgT5">
				</c:if>
					<div class="unit_tit">
						<span class="sTit color_black noBullt">${item.categoryName}</span>
						<div class="etcText fr mgT5">
							<span class="rdchBox">
								<input type="checkbox"  id="checkbox0${status.index}" name="" data-required="${item.required}" class="YAGGWAN_AGREE_PAYMENT"/>
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

			<div class="unit">				
				<div class="unit_tit">
					<span class="sTit color_black noBullt">구매내용(※ 현재 무통장입금만 가능합니다)</span>
				</div>
				<div class="unit_cont bgWhite">
					<table class="tableStyle gridStyle  topBold center">
						<colgroup>
							<col style="width:30%;">
							<col style="width:30%;">
							<col style="width:40%;">
						</colgroup>
						<tbody>
							<tr>
								<th colspan="3" class="center">
									입금계좌 (<span class="payment_info">542-910013-13904</span>) 입금은행(<span class="payment_info">하나은행</span>) 예금주(<span class="payment_info">핫플레이스25경영컨설팅 주식회사</span>)</span>
								</th>
							
							</tr>
							<tr>
								<th rowspan="2" class="center">
									<span class="rdchBox">
										<input type="radio" id="rdoPaymentAll" name="payment" value="ALL" checked />
										<label for="rdoPaymentAll" class="labelCh"><em class="text">전체서비스</em></label>
									</span>
								</th>
								<th class="">
									<span class="rdchBox">
										<input type="radio" id="rdoPaymentAllMonth" name="paymentAll" value="100000" data-type="MONTH"/>
										<label for="rdoPaymentAllMonth" class="labelCh"><em class="text">월간구매</em></label>
									</span>
								</th>
								<td>10만원 / 월</td>
							</tr>
							<tr>
								<th class="">
									<span class="rdchBox">
										<input type="radio" id="rdoPaymentAllYear" name="paymentAll" value="990000" checked data-type="YEAR"/>
										<label for="rdoPaymentAllYear" class="labelCh"><em class="text">년간구매</em></label>
									</span>
								</th>
								<td>99만원 / 년</td>
							</tr>
							<tr>
								<th rowspan="4" class="center">
									<span class="rdchBox">
										<input type="radio" id="rdoPaymentOne" name="payment" value="EACH" />
										<label for="rdoPaymentOne" class="labelCh"><em class="text">개별서비스</em></label>
									</span>
								</th>
								<th class="">
									<span class="rdchBox">
                                    	<input type="checkbox" id="chkPaymentTooja" value="50000" disabled data-type="ROLE_TOOJA">
                                        <label for="chkPaymentTooja" class="labelCh"><em class="text">투자유망지역 검색</em></label>
                                    </span>
								</th>
								<td>5만원 / 월</td>
							</tr>
							<tr>
								<th class="">
									<span class="rdchBox">
                                    	<input type="checkbox" id="chkPaymentGG" value="50000" disabled data-type="ROLE_GYEONGGONG">
                                        <label for="chkPaymentGG" class="labelCh"><em class="text">경공매 검색</em></label>
                                    </span>
								</th>
								<td>5만원 / 월</td>
							</tr>
							<tr>
								<th class="">
									<span class="rdchBox">
                                    	<input type="checkbox" id="chkPaymentMulgeon" value="50000" disabled data-type="ROLE_MULGEON">
                                        <label for="chkPaymentMulgeon" class="labelCh"><em class="text">물건보기</em></label>
                                    </span>
								</th>
								<td>5만원 / 월</td>
							</tr>
							<tr>
								<th class="">
									<span class="rdchBox">
                                    	<input type="checkbox" id="chkPaymentHeatmap" value="50000" disabled data-type="ROLE_HEATMAP">
                                        <label for="chkPaymentHeatmap" class="labelCh"><em class="text">히트맵보기</em></label>
                                    </span>
								</th>
								<td>5만원 / 월</td>
							</tr>
							<tr>
								<th class="center">
									<span class="rdchBox">
                                    	<input type="checkbox" id="chkCoupon">
                                        <label for="chkCoupon" class="labelCh"><em class="text">쿠폰사용</em></label>
                                    </span>
								</th>
								<td class="right" colspan="2">
									<input type="text" id="txtCoupon" style="width: 370px; height:30px; font-size: 1.2em; color:#ff0000; font-weight:bold;" placeholder="쿠폰입력" disabled/>
									<button type="button" class="btnstyle blue" id="btnCoupon" disabled>쿠폰인증</button>
								</td>
							</tr>
							<tr>
								<th class="center">입금자명</th>
								<td class="right" colspan="2">
									<input type="text" id="txtDepositor" style="width: 425px; height:30px; font-size: 1.2em; font-weight:bold;"/>
								</td>
							</tr>
							<tr>
								<td class="right" colspan="3">
									<button type="button" id="btnPaymentInfo" class="btnstyle middle black TOOLTIP"  title="<span class='innerTooltip'>정가: 990,000원<br/>쿠폰: 사용안함<br/>입금자명: <span id='spPayDepositor'></span><br/>총 결제금액 : 990,000원<span>">?</button>
									총 결제하실 금액: <input type="text" id="txtPaymentSum" style="width: 150px; height:30px; font-size: 1.2em; color:#ff0000; font-weight:bold;"  readonly value="990,000원" data-value="990000" data-total-value="990000"/>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
		<div class="modal-footer">
			<button type="button" id="btnPayment" class="btnstyle middle black" disabled>결제신청</button>
		</div>
	</div>
</div>