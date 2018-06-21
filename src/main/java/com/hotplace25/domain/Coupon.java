package com.hotplace25.domain;

import org.apache.ibatis.type.Alias;

@Alias("Coupon")
public class Coupon {

	private String couponNum;			//쿠폰번호
	private String couponTarget;		//발행대상
	private String couponTargetName;	//발행대상이름
	private String used;				//사용여부 
	private String publishDate;			//발행일자
	private String discountValue;		//할인값
	private String discountUnit;		//할인단위
	
	public String getCouponNum() {
		return couponNum;
	}
	public void setCouponNum(String couponNum) {
		this.couponNum = couponNum;
	}
	public String getCouponTarget() {
		return couponTarget;
	}
	public void setCouponTarget(String couponTarget) {
		this.couponTarget = couponTarget;
	}
	public String getCouponTargetName() {
		return couponTargetName;
	}
	public void setCouponTargetName(String couponTargetName) {
		this.couponTargetName = couponTargetName;
	}
	public String getUsed() {
		return used;
	}
	public void setUsed(String used) {
		this.used = used;
	}
	public String getPublishDate() {
		return publishDate;
	}
	public void setPublishDate(String publishDate) {
		this.publishDate = publishDate;
	}
	public String getDiscountValue() {
		return discountValue;
	}
	public void setDiscountValue(String discountValue) {
		this.discountValue = discountValue;
	}
	public String getDiscountUnit() {
		return discountUnit;
	}
	public void setDiscountUnit(String discountUnit) {
		this.discountUnit = discountUnit;
	}
}
