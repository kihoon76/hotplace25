package com.hotplace25.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.hotplace25.dao.PaymentDao;
import com.hotplace25.domain.Coupon;
import com.hotplace25.domain.Payment;

@Service("paymentService")
public class PaymentService {
	
	@Resource(name="paymentDao")
	PaymentDao paymentDao;

	public void setServices(Payment payment) {
		paymentDao.insertHotplaceServices(payment);
	}

	public Coupon validateCoupon(String coupon) {
		return paymentDao.selectCoupon(coupon);
	}

	@Transactional(isolation=Isolation.DEFAULT, 
			   propagation=Propagation.REQUIRED, 
			   rollbackFor=Exception.class,
			   timeout=10)//timeout 초단위
	public void applyPayment(Payment payment) {
		paymentDao.insertPayment(payment);
		paymentDao.updateCoupon(payment.getCouponNum());
	}


	public List<Payment> getPaymentHistories(String accountId) {
		return paymentDao.selectPaymentList(accountId);
	}

	public List<String> checkPayment(String accountId) {
		return paymentDao.selectCheckPaymentList(accountId);
	}
	

}
