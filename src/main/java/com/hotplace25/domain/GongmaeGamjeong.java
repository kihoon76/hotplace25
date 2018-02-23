package com.hotplace25.domain;

import org.apache.ibatis.type.Alias;

@Alias("GongmaeGamjeong")
public class GongmaeGamjeong extends GongmaeKey {

	private String pyeonggaGigwan;
	private String pyeonggaDate;
	private String pyeonggaPrice;
	
	public String getPyeonggaGigwan() {
		return pyeonggaGigwan;
	}
	public void setPyeonggaGigwan(String pyeonggaGigwan) {
		this.pyeonggaGigwan = pyeonggaGigwan;
	}
	public String getPyeonggaDate() {
		return pyeonggaDate;
	}
	public void setPyeonggaDate(String pyeonggaDate) {
		this.pyeonggaDate = pyeonggaDate;
	}
	public String getPyeonggaPrice() {
		return pyeonggaPrice;
	}
	public void setPyeonggaPrice(String pyeonggaPrice) {
		this.pyeonggaPrice = pyeonggaPrice;
	}
	
	
}
