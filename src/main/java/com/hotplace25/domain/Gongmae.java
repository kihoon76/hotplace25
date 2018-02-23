package com.hotplace25.domain;

import org.apache.ibatis.type.Alias;

@Alias("Gongmae")
public class Gongmae extends GongmaeKey{

	private String pnu;							//PNU 코드
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
	private String jeonjaBojeungseoYN;			//전자보증서 사용여부
	private String chasunwiMaesuYN;				//차순위매수신청가능여부
	private String gongdongIbchalYN;			//공동입찰가능여부
	private String twoPersonYN;					//2인미만 유찰여부
	private String twoTimeYN;					//2회이상 입찰가능여부
	
	
	public String getPnu() {
		return pnu;
	}
	public void setPnu(String pnu) {
		this.pnu = pnu;
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
	public String getJeonjaBojeungseoYN() {
		return jeonjaBojeungseoYN;
	}
	public void setJeonjaBojeungseoYN(String jeonjaBojeungseoYN) {
		this.jeonjaBojeungseoYN = jeonjaBojeungseoYN;
	}
	public String getChasunwiMaesuYN() {
		return chasunwiMaesuYN;
	}
	public void setChasunwiMaesuYN(String chasunwiMaesuYN) {
		this.chasunwiMaesuYN = chasunwiMaesuYN;
	}
	public String getGongdongIbchalYN() {
		return gongdongIbchalYN;
	}
	public void setGongdongIbchalYN(String gongdongIbchalYN) {
		this.gongdongIbchalYN = gongdongIbchalYN;
	}
	public String getTwoPersonYN() {
		return twoPersonYN;
	}
	public void setTwoPersonYN(String twoPersonYN) {
		this.twoPersonYN = twoPersonYN;
	}
	public String getTwoTimeYN() {
		return twoTimeYN;
	}
	public void setTwoTimeYN(String twoTimeYN) {
		this.twoTimeYN = twoTimeYN;
	}
}
