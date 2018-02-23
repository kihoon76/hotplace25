package com.hotplace25.domain;

import org.apache.ibatis.type.Alias;

@Alias("GongmaeAroundNagchalMulgeon")
public class GongmaeAroundNagchalMulgeon extends GongmaeKey {

	private String number;			//번호
	private String mulgeonName;		//물건명
	private String nagchalPrice;	//낙찰금액
	
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getMulgeonName() {
		return mulgeonName;
	}
	public void setMulgeonName(String mulgeonName) {
		this.mulgeonName = mulgeonName;
	}
	public String getNagchalPrice() {
		return nagchalPrice;
	}
	public void setNagchalPrice(String nagchalPrice) {
		this.nagchalPrice = nagchalPrice;
	}
	
}
