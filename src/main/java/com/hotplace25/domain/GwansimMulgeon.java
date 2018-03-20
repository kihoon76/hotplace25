package com.hotplace25.domain;

import org.apache.ibatis.type.Alias;

@Alias("GwansimMulgeon")
public class GwansimMulgeon {
	private String gwansimMulgeonNum;
	private String pnu;
	private String address;
	private String memo;
	private String regDate;
	private float lng;//경도
	private float lat;//위도
	private String accountId;
	
	public String getPnu() {
		return pnu;
	}
	public void setPnu(String pnu) {
		this.pnu = pnu;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getMemo() {
		return memo;
	}
	public void setMemo(String memo) {
		this.memo = memo;
	}
	public String getRegDate() {
		return regDate;
	}
	public void setRegDate(String regDate) {
		this.regDate = regDate;
	}
	public float getLng() {
		return lng;
	}
	public void setLng(float lng) {
		this.lng = lng;
	}
	public float getLat() {
		return lat;
	}
	public void setLat(float lat) {
		this.lat = lat;
	}
	public String getAccountId() {
		return accountId;
	}
	public void setAccountId(String accountId) {
		this.accountId = accountId;
	}
	public String getGwansimMulgeonNum() {
		return gwansimMulgeonNum;
	}
	public void setGwansimMulgeonNum(String gwansimMulgeonNum) {
		this.gwansimMulgeonNum = gwansimMulgeonNum;
	}
}
