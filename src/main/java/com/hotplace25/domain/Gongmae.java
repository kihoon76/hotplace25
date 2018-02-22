package com.hotplace25.domain;

import org.apache.ibatis.type.Alias;

@Alias("Gongmae")
public class Gongmae {

	private String pnu;							//PNU 코드
	private String goyubeonho;					//고유번호
	private String mulgeonCode;					//물건관리번호
	private String cheoboonJasan;				//처분방식/자산구분
	private String yongdo;						//용도
	private String area;						//면적
	private String gamjeongga;					//감정가
	private String ibchalMethod;				//입찰방식
	private String ibchalPeriodNumber;			//입찰기간_회차_차수
	private String yuchal;						//유찰횟수
	private String mulgeonAddress;				//물건주소지
	private String jibhaengGigwan;				//집행기관
	private String minIbchalga;					//최저입찰가
	
	public String getPnu() {
		return pnu;
	}
	public void setPnu(String pnu) {
		this.pnu = pnu;
	}
	public String getGoyubeonho() {
		return goyubeonho;
	}
	public void setGoyubeonho(String goyubeonho) {
		this.goyubeonho = goyubeonho;
	}
	public String getMulgeonCode() {
		return mulgeonCode;
	}
	public void setMulgeonCode(String mulgeonCode) {
		this.mulgeonCode = mulgeonCode;
	}
	public String getCheoboonJasan() {
		return cheoboonJasan;
	}
	public void setCheoboonJasan(String cheoboonJasan) {
		this.cheoboonJasan = cheoboonJasan;
	}
	public String getYongdo() {
		return yongdo;
	}
	public void setYongdo(String yongdo) {
		this.yongdo = yongdo;
	}
	public String getArea() {
		return area;
	}
	public void setArea(String area) {
		this.area = area;
	}
	public String getGamjeongga() {
		return gamjeongga;
	}
	public void setGamjeongga(String gamjeongga) {
		this.gamjeongga = gamjeongga;
	}
	public String getIbchalMethod() {
		return ibchalMethod;
	}
	public void setIbchalMethod(String ibchalMethod) {
		this.ibchalMethod = ibchalMethod;
	}
	public String getIbchalPeriodNumber() {
		return ibchalPeriodNumber;
	}
	public void setIbchalPeriodNumber(String ibchalPeriodNumber) {
		this.ibchalPeriodNumber = ibchalPeriodNumber;
	}
	public String getYuchal() {
		return yuchal;
	}
	public void setYuchal(String yuchal) {
		this.yuchal = yuchal;
	}
	public String getMulgeonAddress() {
		return mulgeonAddress;
	}
	public void setMulgeonAddress(String mulgeonAddress) {
		this.mulgeonAddress = mulgeonAddress;
	}
	public String getJibhaengGigwan() {
		return jibhaengGigwan;
	}
	public void setJibhaengGigwan(String jibhaengGigwan) {
		this.jibhaengGigwan = jibhaengGigwan;
	}
	public String getMinIbchalga() {
		return minIbchalga;
	}
	public void setMinIbchalga(String minIbchalga) {
		this.minIbchalga = minIbchalga;
	}
}
