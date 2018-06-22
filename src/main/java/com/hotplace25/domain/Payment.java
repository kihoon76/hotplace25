package com.hotplace25.domain;

import org.apache.ibatis.type.Alias;

@Alias("Payment")
public class Payment {

	private String accountId;
	private String serviceType;
	private String serviceSubTypes;
	private String couponNum;
	private String useCoupon;
	private int sum;
	
	public String getAccountId() {
		return accountId;
	}
	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}
	public String getServiceType() {
		return serviceType;
	}
	public void setServiceType(String serviceType) {
		this.serviceType = serviceType;
	}
	public String getServiceSubTypes() {
		return serviceSubTypes;
	}
	public void setServiceSubTypes(String serviceSubTypes) {
		this.serviceSubTypes = serviceSubTypes;
	}
	public int getSum() {
		return sum;
	}
	public void setSum(int sum) {
		this.sum = sum;
	}
	public String getCouponNum() {
		return couponNum;
	}
	public void setCouponNum(String couponNum) {
		this.couponNum = couponNum;
	}
	public String getUseCoupon() {
		return useCoupon;
	}
	public void setUseCoupon(String useCoupon) {
		this.useCoupon = useCoupon;
	}
}
