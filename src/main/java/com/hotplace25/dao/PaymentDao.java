package com.hotplace25.dao;

import com.hotplace25.domain.Coupon;
import com.hotplace25.domain.Payment;

public interface PaymentDao {

	void insertHotplaceServices(Payment payment);

	Coupon selectCoupon(String coupon);

	void insertPayment(Payment payment);

	void updateCoupon(String couponNum);

}
