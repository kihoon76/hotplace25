package com.hotplace25.controller;

import java.io.IOException;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Hashtable;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hotplace25.domain.Account;
import com.hotplace25.domain.AjaxVO;
import com.hotplace25.domain.Coupon;
import com.hotplace25.domain.Payment;
import com.hotplace25.pg.Inicis;
import com.hotplace25.service.PaymentService;
import com.hotplace25.util.SessionUtil;
import com.hotplace25.util.ValidationUtil;

@RequestMapping("/payment")
@Controller
public class PaymentController {

	@Resource(name="paymentService")
	PaymentService paymentService;
	
	@Resource(name="Inicis")
	Inicis inicis;
	
	@PostMapping("/do")
	@ResponseBody
	public AjaxVO doPayment(@RequestBody Payment payment) {
		
		Account user = SessionUtil.getSessionAccount();
		
		AjaxVO vo = new AjaxVO();
		
		try {
//			//쿠폰검증
//			String couponNum = payment.getCouponNum();
//			Coupon cp = null;
//			
//			//쿠폰사용함 
//			if(!"0".equals(couponNum)) {
//				cp = paymentService.validateCoupon(couponNum);
//				if(cp == null) {
//					vo.setSuccess(false);
//					vo.setErrCode("700");
//					return vo;
//				}
//				else {
//					if("Y".equals(cp.getUsed())) {
//						vo.setSuccess(false);
//						vo.setErrCode("701");
//						
//						return vo;
//					}
//				}
//				
//				payment.setUseCoupon("Y");
//			}
//			else {
//				payment.setUseCoupon("N");
//			}
			
			Coupon cp = validateCoupon(payment, vo);
			
			if(vo.getErrCode() == null) {
				boolean r = ValidationUtil.isValidPayment(payment, cp);
				if(r) {
					//paymentService.setServices(payment);
					
					payment.setAccountId(user.getId());
					payment.setMethod("BANK");
					payment.setOrderNum("");
					payment.setLog("");
					paymentService.applyPayment(payment);
					
					vo.setSuccess(true);
				}
				else {
					vo.setSuccess(false);
					throw new IllegalArgumentException("결제정보가 올바르지 않습니다.");
				}
			}
			else {
				return vo;
			}
			
//			boolean r = ValidationUtil.isValidPayment(payment, cp);
//			if(r) {
//				//paymentService.setServices(payment);
//				
//				payment.setAccountId(user.getId());
//				paymentService.applyPayment(payment);
//				
//				vo.setSuccess(true);
//			}
//			else {
//				vo.setSuccess(false);
//				throw new IllegalArgumentException("결제정보가 올바르지 않습니다.");
//			}
		}
		catch(IllegalArgumentException e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
			vo.setErrCode("777");
		}
		
		return vo;
	}
	
	private Coupon validateCoupon(Payment payment, AjaxVO vo) {
		//쿠폰검증
		String couponNum = payment.getCouponNum();
		Coupon cp = null;
		
		//쿠폰사용함 
		if(!"0".equals(couponNum)) {
			cp = paymentService.validateCoupon(couponNum);
			if(cp == null) {
				vo.setSuccess(false);
				vo.setErrCode("700");
			}
			else {
				if("Y".equals(cp.getUsed())) {
					vo.setSuccess(false);
					vo.setErrCode("701");
				}
			}
			
			payment.setUseCoupon("Y");
		}
		else {
			payment.setUseCoupon("N");
		}
		
		return cp;
	}
	
	@PostMapping("/checkCoupon")
	@ResponseBody
	public AjaxVO checkCoupon(@RequestBody Map<String, String> param) {
		AjaxVO vo = new AjaxVO();
		
		String coupon = param.get("coupon");
		
		try {
			//Account user = SessionUtil.getSessionAccount();
			
			Coupon cp = paymentService.validateCoupon(coupon);
			
			if(cp == null) {
				vo.setSuccess(false);
				vo.setErrCode("700");
			}
			else {
				if("Y".equals(cp.getUsed())) {
					vo.setSuccess(false);
					vo.setErrCode("701");
				}
				else {
					vo.setSuccess(true);
					vo.addObject(cp);
				}
			}
		}
		catch(Exception e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
		}
		
		
		return vo;
		
	}
	
	//현재 결제진행건이 있는지 확인
	@GetMapping("checkPayment")
	@ResponseBody
	public AjaxVO checkPayment() {
		
		String accountId = SessionUtil.getSessionUserId();
		
		AjaxVO vo = new AjaxVO();
		
		try {
			List<String> paymentCount = paymentService.checkPayment(accountId);
			
			vo.setSuccess(true);
			vo.setDatas(paymentCount);
		}
		catch(Exception e) {
			vo.setSuccess(false);
			vo.setErrCode("778");
		}
		
		return vo;
	}
	
	@PostMapping("getPayInfo")
	@ResponseBody
	public AjaxVO getPayInfo(@RequestBody Payment payment) {
		Account user = SessionUtil.getSessionAccount();
		
		AjaxVO<Map<String, String>> vo = new AjaxVO<>();
		
		try {
			vo.setSuccess(true);
			Coupon cp = validateCoupon(payment, vo);
			
			if(vo.getErrCode() == null) {
				payment.setDepositor("System");
				boolean r = ValidationUtil.isValidPayment(payment, cp);
				if(r) {
					payment.setAccountId(user.getId());
					payment.setMethod("CARD");
					user.setPayment(payment);
					
					//
					Map<String, String> m = inicis.makeRequestInfo(String.valueOf(payment.getSum()/*1000*/));
					m.put("buyername", user.getUserName());
					m.put("buyertel", user.getPhone());
					m.put("buyeremail", user.getEmail());
					
					vo.addObject(m);
				}
				else {
					vo.setSuccess(false);
					throw new IllegalArgumentException("결제정보가 올바르지 않습니다.");
				}
			}
			else {
				return vo;
			}
		}
		catch(IllegalArgumentException e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
			vo.setErrCode("777");
		}
		catch(Exception e) {
			vo.setSuccess(false);
			vo.setErrCode("702");
		}
		
		return vo;
	}
	
	@RequestMapping("afterPay")
	public String afterPay(ModelMap m, HttpServletRequest request) throws Exception  {
		
		request.setCharacterEncoding("UTF-8");

		Map<String,String> paramMap = new Hashtable<String,String>();

		Enumeration elems = request.getParameterNames();

		String temp = "";
		String paramValue = null;
		
		while(elems.hasMoreElements())
		{
			temp = (String) elems.nextElement();
			System.err.println(temp);
			
			paramValue = request.getParameter(temp);
			if(paramValue == null) {
				paramValue = "";
			}
			paramMap.put(temp, paramValue);
		}
		
		if("0000".equals(paramMap.get("resultCode"))) {
			inicis.pgReturn(m, paramMap);
		}
		else {
			m.addAttribute("err", "Y");
			
			Map<String, String> errLog = new HashMap<String, String>();
			errLog.put("accountId", SessionUtil.getSessionUserId());
			errLog.put("err", paramMap.toString());
			
			paymentService.writeCardPaymentError(errLog);
		}

		return "pg/pgReturn";
	}
	
	//이니시스 결제창 닫기
	@GetMapping("close")
	public String closeInicis() {
		
		return "pg/close";
	}
	
	//이니시스 결제창 닫기
	@GetMapping("popup")
	public String popupInicis() {
		
		return "pg/popup";
	}
	
}
