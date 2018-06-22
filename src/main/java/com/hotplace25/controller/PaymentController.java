package com.hotplace25.controller;

import java.util.Map;

import javax.annotation.Resource;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hotplace25.domain.Account;
import com.hotplace25.domain.AjaxVO;
import com.hotplace25.domain.Coupon;
import com.hotplace25.domain.Payment;
import com.hotplace25.security.UserDetailsImpl;
import com.hotplace25.service.PaymentService;
import com.hotplace25.util.ValidationUtil;

@RequestMapping("/payment")
@Controller
public class PaymentController {

	@Resource(name="paymentService")
	PaymentService paymentService;
	
	@PostMapping("/do")
	@ResponseBody
	public AjaxVO doPayment(@RequestBody Payment payment) {
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Account user = (Account)auth.getPrincipal();
		
		AjaxVO vo = new AjaxVO();
		
		try {
			//쿠폰검증
			String couponNum = payment.getCouponNum();
			Coupon cp = null;
			
			//쿠폰사용함 
			if(!"0".equals(couponNum)) {
				cp = paymentService.validateCoupon(couponNum);
				if(cp == null) {
					vo.setSuccess(false);
					vo.setErrCode("700");
					return vo;
				}
				else {
					if("Y".equals(cp.getUsed())) {
						vo.setSuccess(false);
						vo.setErrCode("701");
						
						return vo;
					}
				}
				
				payment.setUseCoupon("Y");
			}
			else {
				payment.setUseCoupon("N");
			}
			
			boolean r = ValidationUtil.isValidPayment(payment, cp);
			if(r) {
				//paymentService.setServices(payment);
				
				payment.setAccountId(user.getId());
				paymentService.applyPayment(payment);
				
				vo.setSuccess(true);
			}
			else {
				vo.setSuccess(false);
				throw new IllegalArgumentException("결제정보가 올바르지 않습니다.");
			}
		}
		catch(IllegalArgumentException e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
			vo.setErrCode("777");
		}
		
		return vo;
	}
	
	@PostMapping("/checkCoupon")
	@ResponseBody
	public AjaxVO checkCoupon(@RequestBody Map<String, String> param) {
		AjaxVO vo = new AjaxVO();
		
		String coupon = param.get("coupon");
		
		try {
			Authentication auth = SecurityContextHolder.getContext().getAuthentication();
			Account user = (Account)auth.getPrincipal();
			
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
}
