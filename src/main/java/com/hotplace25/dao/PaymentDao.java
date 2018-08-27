package com.hotplace25.dao;

import java.util.List;
import java.util.Map;

import com.hotplace25.domain.Coupon;
import com.hotplace25.domain.Payment;

public interface PaymentDao {

	void insertHotplaceServices(Payment payment);

	Coupon selectCoupon(String coupon);

	void insertPayment(Payment payment);

	void updateCoupon(String couponNum);

	List<Payment> selectPaymentList(String accountId);

	List<String> selectCheckPaymentList(String accountId);

	void insertCardPaymentLog(Map<String, String> map);
	
	void updatePayment(Map<String, String> map);

	void insertCardPaymentError(Map<String, String> errLog);

}
