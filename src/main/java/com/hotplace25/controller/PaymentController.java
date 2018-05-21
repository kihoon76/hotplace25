package com.hotplace25.controller;

import javax.annotation.Resource;

import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hotplace25.domain.AjaxVO;
import com.hotplace25.domain.Payment;
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
		
		String accountId = SecurityContextHolder.getContext().getAuthentication().getName();
		
		AjaxVO vo = new AjaxVO();
		
		try {
			boolean r = ValidationUtil.isValidPayment(payment);
			if(r) {
				payment.setAccountId(accountId);
				paymentService.setServices(payment);
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
}
