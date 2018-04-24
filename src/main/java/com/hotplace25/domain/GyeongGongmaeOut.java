package com.hotplace25.domain;

import org.apache.ibatis.type.Alias;

@Alias("GyeongGongmaeOut")
public class GyeongGongmaeOut extends Latlng{

	private String pnu;
	private String gubun;
	private String gyeongmae;
	private String gongmae;
	private String address;
	private String jimokCode;
	private String hpgrade;
	private String bosang;
	private String pyeonib;
	
	public String getPnu() {
		return pnu;
	}
	public void setPnu(String pnu) {
		this.pnu = pnu;
	}
	public String getGubun() {
		return gubun;
	}
	public void setGubun(String gubun) {
		this.gubun = gubun;
	}
	public String getGyeongmae() {
		return gyeongmae;
	}
	public void setGyeongmae(String gyeongmae) {
		this.gyeongmae = gyeongmae;
	}
	public String getGongmae() {
		return gongmae;
	}
	public void setGongmae(String gongmae) {
		this.gongmae = gongmae;
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
	public String getBosang() {
		return bosang;
	}
	public void setBosang(String bosang) {
		this.bosang = bosang;
	}
	public String getPyeonib() {
		return pyeonib;
	}
	public void setPyeonib(String pyeonib) {
		this.pyeonib = pyeonib;
	} 
}
