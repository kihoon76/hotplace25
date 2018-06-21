package com.hotplace25.dao;

import java.util.Map;

import com.hotplace25.domain.Payment;

public interface PaymentDao {

	void insertHotplaceServices(Payment payment);

	Map<String, String> selectCoupon(String coupon);

}
