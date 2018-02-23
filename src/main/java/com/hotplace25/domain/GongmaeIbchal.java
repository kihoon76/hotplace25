package com.hotplace25.domain;

import org.apache.ibatis.type.Alias;

@Alias("GongmaeIbchal")
public class GongmaeIbchal extends GongmaeKey {

	private String ibchalNum;		//입찰번호
	private String hoecha;			//회차
	private String chasu;			//차수
	private String gubun;			//구분
	private String daegeumNabbu;	//대금납부
	private String nabbuGihan;		//납부기한
	private String ibchalStart;		//입찰기간 시작
	private String ibchalEnd;		//입찰기간 종료
	private String gaechal;			//개찰일시
	private String gaechalJangso;	//개찰장소
	private String minIbchalga;		//최저입찰가
	
	public String getIbchalNum() {
		return ibchalNum;
	}
	public void setIbchalNum(String ibchalNum) {
		this.ibchalNum = ibchalNum;
	}
	public String getHoecha() {
		return hoecha;
	}
	public void setHoecha(String hoecha) {
		this.hoecha = hoecha;
	}
	public String getChasu() {
		return chasu;
	}
	public void setChasu(String chasu) {
		this.chasu = chasu;
	}
	public String getGubun() {
		return gubun;
	}
	public void setGubun(String gubun) {
		this.gubun = gubun;
	}
	public String getDaegeumNabbu() {
		return daegeumNabbu;
	}
	public void setDaegeumNabbu(String daegeumNabbu) {
		this.daegeumNabbu = daegeumNabbu;
	}
	public String getNabbuGihan() {
		return nabbuGihan;
	}
	public void setNabbuGihan(String nabbuGihan) {
		this.nabbuGihan = nabbuGihan;
	}
	public String getIbchalStart() {
		return ibchalStart;
	}
	public void setIbchalStart(String ibchalStart) {
		this.ibchalStart = ibchalStart;
	}
	public String getIbchalEnd() {
		return ibchalEnd;
	}
	public void setIbchalEnd(String ibchalEnd) {
		this.ibchalEnd = ibchalEnd;
	}
	public String getGaechal() {
		return gaechal;
	}
	public void setGaechal(String gaechal) {
		this.gaechal = gaechal;
	}
	public String getGaechalJangso() {
		return gaechalJangso;
	}
	public void setGaechalJangso(String gaechalJangso) {
		this.gaechalJangso = gaechalJangso;
	}
	public String getMinIbchalga() {
		return minIbchalga;
	}
	public void setMinIbchalga(String minIbchalga) {
		this.minIbchalga = minIbchalga;
	}
	
}
