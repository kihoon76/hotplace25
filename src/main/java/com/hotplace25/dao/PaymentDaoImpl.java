package com.hotplace25.dao;

import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.hotplace25.domain.Payment;

@Repository("paymentDao")
public class PaymentDaoImpl implements PaymentDao {

	private static final String namespace = "mappers.mssql.paymentMapper";
	
	@Resource(name = "msSqlSession")
	SqlSession msSqlSession;
	
	@Override
	public void insertHotplaceServices(Payment payment) {
		// TODO Auto-generated method stub
		msSqlSession.insert(namespace + ".insertHotplaceServices", payment);
	}

	@Override
	public Map<String, String> selectCoupon(String coupon) {
		return msSqlSession.selectOne(namespace + ".selectCoupon", coupon);
	}

}
