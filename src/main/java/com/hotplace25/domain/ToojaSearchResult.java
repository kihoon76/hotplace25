package com.hotplace25.domain;

import org.apache.ibatis.type.Alias;

@Alias("ToojaSearchResult")
public class ToojaSearchResult extends Latlng {

	private String pnu;
	private String unuGyeongmae;
	private String unuGongmae;
	private String gyeongGongmae;
	private String address;
	private String jimokCode;
	private String hpgrade;
	private String bosangPyeonib;
				
	
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
	public String getJimokCode() {
		return jimokCode;
	}
	public void setJimokCode(String jimokCode) {
		this.jimokCode = jimokCode;
	}
	public String getHpgrade() {
		return hpgrade;
	}
	public void setHpgrade(String hpgrade) {
		this.hpgrade = hpgrade;
	}
	public String getBosangPyeonib() {
		return bosangPyeonib;
	}
	public void setBosangPyeonib(String bosangPyeonib) {
		this.bosangPyeonib = bosangPyeonib;
	}
	public String getUnuGyeongmae() {
		return unuGyeongmae;
	}
	public void setUnuGyeongmae(String unuGyeongmae) {
		this.unuGyeongmae = unuGyeongmae;
	}
	public String getUnuGongmae() {
		return unuGongmae;
	}
	public void setUnuGongmae(String unuGongmae) {
		this.unuGongmae = unuGongmae;
	}
}
