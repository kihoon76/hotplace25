package com.hotplace25.domain;

import org.apache.ibatis.type.Alias;

@Alias("GongmaeArea")
public class GongmaeArea extends GongmaeKey {

	private String number;		//번호
	private String jongbyeol;	//종별
	private String jimok;		//지목
	private String area;		//면적
	private String jiboon;		//지분
	private String bigo;		//비고
	
	public String getNumber() {
		return number;
	}
	public void setNumber(String number) {
		this.number = number;
	}
	public String getJongbyeol() {
		return jongbyeol;
	}
	public void setJongbyeol(String jongbyeol) {
		this.jongbyeol = jongbyeol;
	}
	public String getJimok() {
		return jimok;
	}
	public void setJimok(String jimok) {
		this.jimok = jimok;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public String getJiboon() {
		return jiboon;
	}
	public void setJiboon(String jiboon) {
		this.jiboon = jiboon;
	}
	public String getBigo() {
		return bigo;
	}
	public void setBigo(String bigo) {
		this.bigo = bigo;
	}
}
