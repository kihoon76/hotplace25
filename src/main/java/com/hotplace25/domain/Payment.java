package com.hotplace25.domain;

import org.apache.ibatis.type.Alias;

@Alias("Payment")
public class Payment {

	private String accountId;					//사용자계정
	private String serviceType;					//서비스타입
	private String serviceSubTypes;				//서비스서브타입
	private String couponNum;					//쿠폰번호
	private String useCoupon;					//쿠폰사용여부('N' | 'Y')
	private String applyDate;					//결제신청일자
	private String applyComment;				//결제내용
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
	public String getApplyDate() {
		return applyDate;
	}
	public void setApplyDate(String applyDate) {
		this.applyDate = applyDate;
	}
	public String getApplyComment() {
		return applyComment;
	}
	public void setApplyComment(String applyComment) {
		this.applyComment = applyComment;
	}
}
