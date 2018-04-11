package com.hotplace25.domain;

import org.apache.ibatis.type.Alias;

@Alias("ToojaSearchResult")
public class ToojaSearchResult extends Address {

	private String pnu;
	private String jimokCode;
	private String jimok;
	private String area;
	private String gongsiCode;
	private String gongsiStandardDate;
	private String gongsi;
	private String jiyeokCode;
	public String getPnu() {
		return pnu;
	}
	public void setPnu(String pnu) {
		this.pnu = pnu;
	}
	public String getJimokCode() {
		return jimokCode;
	}
	public void setJimokCode(String jimokCode) {
		this.jimokCode = jimokCode;
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
	public String getGongsiCode() {
		return gongsiCode;
	}
	public void setGongsiCode(String gongsiCode) {
		this.gongsiCode = gongsiCode;
	}
	public String getGongsiStandardDate() {
		return gongsiStandardDate;
	}
	public void setGongsiStandardDate(String gongsiStandardDate) {
		this.gongsiStandardDate = gongsiStandardDate;
	}
	public String getGongsi() {
		return gongsi;
	}
	public void setGongsi(String gongsi) {
		this.gongsi = gongsi;
	}
	public String getJiyeokCode() {
		return jiyeokCode;
	}
	public void setJiyeokCode(String jiyeokCode) {
		this.jiyeokCode = jiyeokCode;
	}
}
