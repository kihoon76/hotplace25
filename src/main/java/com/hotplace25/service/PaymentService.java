package com.hotplace25.service;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.hotplace25.dao.PaymentDao;
import com.hotplace25.domain.Payment;

@Service("paymentService")
public class PaymentService {
	
	@Resource(name="paymentDao")
	PaymentDao paymentDao;

	public void setServices(Payment payment) {
		paymentDao.insertHotplaceServices(payment);
	}

	public Map<String, String> validateCoupon(String coupon) {
		return paymentDao.selectCoupon(coupon);
	}
	
	

}
