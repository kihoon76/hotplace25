package com.hotplace25.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.hotplace25.domain.AjaxVO;
import com.hotplace25.domain.Payment;
import com.hotplace25.util.ValidationUtil;

@RequestMapping("/payment")
@Controller
public class PaymentController {

	@PostMapping("/do")
	@ResponseBody
	public AjaxVO doPayment(@RequestBody Payment payment) {
		
		AjaxVO vo = new AjaxVO();
		
		try {
			boolean r = ValidationUtil.isValidPayment(payment);
			vo.setSuccess(true);
		}
		catch(IllegalArgumentException e) {
			vo.setSuccess(false);
			vo.setErrMsg(e.getMessage());
			vo.setErrCode("777");
		}
		
		return vo;
	}
}
