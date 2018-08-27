package com.hotplace25.pg;

import java.util.HashMap;
import java.util.Hashtable;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.ui.ModelMap;

import com.hotplace25.domain.Account;
import com.hotplace25.domain.Payment;
import com.hotplace25.service.PaymentService;
import com.hotplace25.util.SessionUtil;
import com.inicis.std.util.HttpUtil;
import com.inicis.std.util.ParseUtil;
import com.inicis.std.util.SignatureUtil;

@Component("Inicis")
public class Inicis {

	@Resource(name="paymentService")
	PaymentService paymentService;
	
	@Value("#{pgCfg['mid']}")
	private String mid;	
	
	@Value("#{pgCfg['signKey']}")// 가맹점 ID
	private String signKey;	// 가맹점에 제공된 웹 표준 사인키(가맹점 수정후 고정)
	
	public Map<String, String> makeRequestInfo(String price) throws Exception {
		
		String timestamp = SignatureUtil.getTimestamp();			// util에 의해서 자동생성
		String oid	= mid + "_" + SignatureUtil.getTimestamp();	// 가맹점 주문번호(가맹점에서 직접 설정)
		String mKey = SignatureUtil.hash(signKey, "SHA-256");
		
		Map<String, String> signParam = new HashMap<String, String>();
		signParam.put("oid", oid); 					// 필수
		signParam.put("price", price);				// 필수
		signParam.put("timestamp", timestamp);		// 필수
	
		// signature 데이터 생성 (모듈에서 자동으로 signParam을 알파벳 순으로 정렬후 NVP 방식으로 나열해 hash)
		String signature = SignatureUtil.makeSignature(signParam);
		
		
		Map<String, String> m = new HashMap<>();
		m.put("mid", mid);
		m.put("oid", oid);
		m.put("mKey", mKey);
		m.put("timestamp", timestamp);
		m.put("signature", signature);
		m.put("price", price);
		
		
		return m;
	}
	
	public void pgReturn(ModelMap m, Map<String,String> paramMap) throws Exception {
		//############################################
		// 1.전문 필드 값 설정(***가맹점 개발수정***)
		//############################################
		
		String mid = paramMap.get("mid");						// 가맹점 ID 수신 받은 데이터로 설정
		String timestamp = SignatureUtil.getTimestamp();		// util에 의해서 자동생성
		String charset = "UTF-8";								// 리턴형식[UTF-8,EUC-KR](가맹점 수정후 고정)
		String format = "JSON";								    // 리턴형식[XML,JSON,NVP](가맹점 수정후 고정)
		String authToken = paramMap.get("authToken");			// 취소 요청 tid에 따라서 유동적(가맹점 수정후 고정)
		String authUrl = paramMap.get("authUrl");				// 승인요청 API url(수신 받은 값으로 설정, 임의 세팅 금지)
		String netCancel = paramMap.get("netCancelUrl");		// 망취소 API url(수신 받은 값으로 설정, 임의 세팅 금지)
		String ackUrl = paramMap.get("checkAckUrl");			// 가맹점 내부 로직 처리후 최종 확인 API URL(수신 받은 값으로 설정, 임의 세팅 금지)		
		String merchantData = paramMap.get("merchantData");		// 가맹점 관리데이터 수신
		
		//#####################
		// 2.signature 생성
		//#####################
		Map<String, String> signParam = new HashMap<String, String>();

		signParam.put("authToken",	authToken);		// 필수
		signParam.put("timestamp",	timestamp);		// 필수

		// signature 데이터 생성 (모듈에서 자동으로 signParam을 알파벳 순으로 정렬후 NVP 방식으로 나열해 hash)
		String signature = SignatureUtil.makeSignature(signParam);
  		String price = "";  // 가맹점에서 최종 결제 가격 표기 (필수입력아님)
  		
  		//#####################
		// 3.API 요청 전문 생성
		//#####################
		Map<String, String> authMap = new Hashtable<String, String>();

		authMap.put("mid"			    ,mid);			  // 필수
		authMap.put("authToken"		,authToken);	// 필수
		authMap.put("signature"		,signature);	// 필수
		authMap.put("timestamp"		,timestamp);	// 필수
		authMap.put("charset"		  ,charset);		// default=UTF-8
		authMap.put("format"		  ,format);		  // default=XML
  		//authMap.put("price" 		,price);		    // 가격위변조체크기능 (선택사용)
  
		System.out.println("##승인요청 API 요청##");

		HttpUtil httpUtil = new HttpUtil();
		
		try {
			//#####################
			// 4.API 통신 시작
			//#####################

			String authResultString = "";
			authResultString = httpUtil.processHTTP(authMap, authUrl);
			
			//############################################################
			//5.API 통신결과 처리(***가맹점 개발수정***)
			//############################################################
			
			String authResultStringR = authResultString.replace(",", "&").replace(":", "=").replace("\"", "").replace(" ","").replace("\n", "").replace("}", "").replace("{", "");
			Map<String, String> resultMap = ParseUtil.parseStringToMap(authResultStringR); //문자열을 MAP형식으로 파싱
			
							
			System.out.println("resultMap == " + resultMap);
			
			/*************************  결제보안 강화 2016-05-18 START ****************************/ 
			Map<String , String> secureMap = new HashMap<String, String>();
			secureMap.put("mid"			, mid);								//mid
			secureMap.put("tstamp"		, timestamp);						//timestemp
			secureMap.put("MOID"		, resultMap.get("MOID"));			//MOID
			secureMap.put("TotPrice"	, resultMap.get("TotPrice"));		//TotPrice
			
			// signature 데이터 생성 
			String secureSignature = SignatureUtil.makeSignatureAuth(secureMap);
			/*************************  결제보안 강화 2016-05-18 END ****************************/
			
			if("0000".equals(resultMap.get("resultCode")) && secureSignature.equals(resultMap.get("authSignature")) ){	//결제보안 강화 2016-05-18
			   /*****************************************************************************
		       * 여기에 가맹점 내부 DB에 결제 결과를 반영하는 관련 프로그램 코드를 구현한다.  
			   
				 [중요!] 승인내용에 이상이 없음을 확인한 뒤 가맹점 DB에 해당건이 정상처리 되었음을 반영함
						  처리중 에러 발생시 망취소를 한다.
		       ******************************************************************************/	
				m.addAttribute("isSuccess", "성공");
				
				Account user = SessionUtil.getSessionAccount();
				Payment payment = user.getPayment();
				payment.setOrderNum(resultMap.get("tid"));
				payment.setLog(authResultStringR);
				String key = paymentService.applyCardPayment(payment);
				
				//hotplace25 결제처리
				Map<String, String> param = new HashMap<>();
				param.put("key", key);
				param.put("paymentDate", resultMap.get("applDate")); 
				param.put("accountId", "SYSTEM");
				
				paymentService.confirmCardPayment(param);
			} 
			else {
				m.addAttribute("isSuccess", "실패");
				
				//결제보안키가 다른 경우
				if(!secureSignature.equals(resultMap.get("authSignature")) && "0000".equals(resultMap.get("resultCode"))) {
										
					m.addAttribute("resultMsg", resultMap.get("resultMsg"));
					
					//망취소
					if("0000".equals(resultMap.get("resultCode"))) {
						throw new Exception("데이터 위변조 체크 실패");
					}
				}
			}
			
			
			m.addAttribute("resultCode", resultMap.get("resultCode"));
			m.addAttribute("resultMsg", resultMap.get("resultMsg"));
			m.addAttribute("tid", resultMap.get("tid"));				//주문번호
			m.addAttribute("payMethod", resultMap.get("payMethod"));	//결제방법
			m.addAttribute("totPrice", resultMap.get("TotPrice"));		//결제완료금액
			m.addAttribute("MOID", resultMap.get("MOID"));				//주문번호
			m.addAttribute("applDate", resultMap.get("applDate"));		//승인날짜
			m.addAttribute("applTime", resultMap.get("applTime"));		//승인시간
			
			//카드
			int quota = Integer.parseInt(resultMap.get("CARD_Quota"));
			if(resultMap.get("EventCode") != null) {
				m.addAttribute("eventCode", resultMap.get("EventCode"));	//이벤트코드
			}
			
			m.addAttribute("cardNum", resultMap.get("CARD_Num"));				//카드번호
			m.addAttribute("applNum", resultMap.get("applNum"));				//승인번호
			m.addAttribute("point", resultMap.get("point"));					//포인트 사용 여부
			m.addAttribute("cardCode", getCardName(resultMap.get("CARD_Code")));					//카드 종류
			m.addAttribute("cardBankCode", getCardBankName(resultMap.get("CARD_BankCode")));		//카드 발급사
			
			if(resultMap.get("OCB_Num") != null && resultMap.get("OCB_Num") != "") {
				m.addAttribute("ocbNum", resultMap.get("OCB_Num"));						//OK CASHBAG 카드번호
				m.addAttribute("ocbSaveApplNum", resultMap.get("OCB_SaveApplNum"));		//OK CASHBAG 적립 승인번호
				m.addAttribute("ocbPayPrice", resultMap.get("OCB_PayPrice"));			//OK CASHBAG 포인트지불금액
			}
			
			if(resultMap.get("GSPT_Num") != null && resultMap.get("GSPT_Num") != "") {
				m.addAttribute("gsptNum", resultMap.get("GSPT_Num"));				//GS&Point 카드번호
				m.addAttribute("gsptRemains", resultMap.get("GSPT_Remains"));		//GS&Point 잔여한도
				m.addAttribute("gsptApplPrice", resultMap.get("GSPT_ApplPrice"));	//GS&Point 승인금액
			}
			
			if(resultMap.get("UNPT_CardNum") != null && resultMap.get("UNPT_CardNum") != "") {
				m.addAttribute("upntCardNum", resultMap.get("UNPT_CardNum"));			//U-Point 카드번호
				m.addAttribute("upntUsablePoint", resultMap.get("UPNT_UsablePoint"));	//U-Point 가용포인트
				m.addAttribute("upntPayPrice", resultMap.get("UPNT_PayPrice"));			//U-Point 포인트지불금액
				
			}
			
			m.addAttribute("tid", resultMap.get("tid"));		
		}
		catch(Exception e) {
			
		}

	}

	
	private String getCardName(String cardCode) {
		String cardName = "";
		
		if(cardCode != null && !"".equals(cardCode)) {
			switch(cardCode) {
			case "01" :
				cardName = "하나(외환)";
				break;
			case "03" :
				cardName = "롯데";
				break;
			case "04" :
				cardName = "현대";
				break;
			case "06" :
				cardName = "국민";
				break;
			case "11" :
				cardName = "BC";
				break;
			case "12" :
				cardName = "삼성";
				break;
			case "14" :
				cardName = "신한";
				break;
			case "21" :
				cardName = "해외 VISA";
				break;
			case "22" :
				cardName = "해외마스터";
				break;
			case "23" :
				cardName = "해외 JCB";
				break;
			case "26" :
				cardName = "중국은련";
				break;
			case "32" :
				cardName = "광주";
				break;
			case "33" :
				cardName = "전북";
				break;
			case "34" :
				cardName = "하나";
				break;
			case "35" :
				cardName = "산업카드";
				break;
			case "41" :
				cardName = "NH";
				break;
			case "43" :
				cardName = "씨티";
				break;
			case "44" :
				cardName = "우리";
				break;
			case "48" :
				cardName = "신협체크";
				break;
			case "51" :
				cardName = "수협";
				break;
			case "52" :
				cardName = "제주";
				break;
			case "54" :
				cardName = "MG새마을금고체크";
				break;
			case "55" :
				cardName = "케이뱅크";
				break;
			case "56" :
				cardName = "카카오뱅크";
				break;
			case "71" :
				cardName = "우체국체크";
				break;
			case "95" :
				cardName = "저축은행체크";
				break;
			}
		}
		
		return cardName;
	}
	
	private String getCardBankName(String cardBankCode) {
		String cardBankName = "";
		
		if(cardBankCode != null && !"".equals(cardBankCode)) {
			switch(cardBankCode) {
			case "02" :
				cardBankName = "한국산업은행";
				break;
			case "03" :
				cardBankName = "기업은행";
				break;
			case "04" :
				cardBankName = "국민은행";
				break;
			case "05" :
				cardBankName = "하나은행 (구외환)";
				break;
			case "06" :
				cardBankName = "국민은행 (구 주택)";
				break;
			case "07" :
				cardBankName = "수협중앙회";
				break;
			case "11" :
				cardBankName = "농협중앙회";
				break;
			case "12" :
				cardBankName = "단위농협";
				break;
			case "16" :
				cardBankName = "축협중앙회";
				break;
			case "20" :
				cardBankName = "우리은행";
				break;
			case "21" :
				cardBankName = "신한은행 (조흥은행)";
				break;
			case "23" :
				cardBankName = "제일은행";
				break;
			case "25" :
				cardBankName = "하나은행 (서울은행)";
				break;
			case "26" :
				cardBankName = "신한은행";
				break;
			case "27" :
				cardBankName = "한국씨티은행 (한미은행)";
				break;
			case "31" :
				cardBankName = "대구은행";
				break;
			case "32" :
				cardBankName = "부산은행";
				break;
			case "34" :
				cardBankName = "광주은행";
				break;
			case "35" :
				cardBankName = "제주은행";
				break;
			case "37" :
				cardBankName = "전북은행";
				break;
			case "38" :
				cardBankName = "강원은행";
				break;
			case "39" :
				cardBankName = "경남은행";
				break;
			case "41" :
				cardBankName = "비씨카드";
				break;
			case "53" :
				cardBankName = "씨티은행";
				break;
			case "54" :
				cardBankName = "홍콩상하이은행";
				break;
			case "71" :
				cardBankName = "우체국";
				break;
			case "81" :
				cardBankName = "하나은행";
				break;
			case "83" :
				cardBankName = "평화은행";
				break;
			case "87" :
				cardBankName = "신세계";
				break;
			case "88" :
				cardBankName = "신한은행(조흥 통합)";
				break;
			case "97" :
				cardBankName = "카카오 머니";
				break;
			case "98" :
				cardBankName = "페이코 (포인트 100% 사용)";
				break;
			}
		}
		
		return cardBankName;
	}
}
