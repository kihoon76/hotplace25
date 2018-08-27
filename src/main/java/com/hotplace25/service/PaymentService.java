package com.hotplace25.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
		
		System.err.println("key===" + payment.getKey());
	}
	
	@Transactional(isolation=Isolation.DEFAULT, 
			   propagation=Propagation.REQUIRED, 
			   rollbackFor=Exception.class,
			   timeout=10)//timeout 초단위
	public String applyCardPayment(Payment payment) {
		paymentDao.insertPayment(payment);
		paymentDao.updateCoupon(payment.getCouponNum());
		
		Map<String, String> m = new HashMap<>();
		m.put("orderNum", payment.getOrderNum());
		m.put("log", payment.getLog());
		paymentDao.insertCardPaymentLog(m);
		
		//입력한 결제내역 번호를 리턴한다(자동 승인처리를 위해)
		return payment.getKey();
	}
	
	public void confirmCardPayment(Map<String, String> map) {
		paymentDao.updatePayment(map);
	}


	public List<Payment> getPaymentHistories(String accountId) {
		return paymentDao.selectPaymentList(accountId);
	}

	public List<String> checkPayment(String accountId) {
		return paymentDao.selectCheckPaymentList(accountId);
	}

	public void writeCardPaymentError(Map<String, String> errLog) {
		paymentDao.insertCardPaymentError(errLog);
	}
	

}
