package com.hotplace25.domain;

import org.apache.ibatis.type.Alias;

@Alias("ToojaSearchResult")
public class ToojaSearchResult extends Address {

	private String pnu;
	private String address;
	private String jimokCode;
	private String hpgrade;
	private String bosangPyeonib;
	private String pyeonib;
	private String gyeongGong;			
	
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
	public String getPyeonib() {
		return pyeonib;
	}
	public void setPyeonib(String pyeonib) {
		this.pyeonib = pyeonib;
	}
	public String getBosangPyeonib() {
		return bosangPyeonib;
	}
	public void setBosangPyeonib(String bosangPyeonib) {
		this.bosangPyeonib = bosangPyeonib;
	}
	public String getGyeongGong() {
		return gyeongGong;
	}
	public void setGyeongGong(String gyeongGong) {
		this.gyeongGong = gyeongGong;
	}
}
