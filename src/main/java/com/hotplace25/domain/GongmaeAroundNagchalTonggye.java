package com.hotplace25.domain;

import org.apache.ibatis.type.Alias;

@Alias("GongmaeAroundNagchalTonggye")
public class GongmaeAroundNagchalTonggye extends GongmaeKey {

	private String tonggyeGigan;		//통계기간
	private String buchalGeonsu;		//부찰건수
	private String nagchalGeonsu;		//낙찰건수
	private String nagchalRatio;		//낙찰률
	private String gamjeongga;			//감정가대비
	private String minIbchalga;			//최저입찰가대비
	
	public String getTonggyeGigan() {
		return tonggyeGigan;
	}
	public void setTonggyeGigan(String tonggyeGigan) {
		this.tonggyeGigan = tonggyeGigan;
	}
	public String getBuchalGeonsu() {
		return buchalGeonsu;
	}
	public void setBuchalGeonsu(String buchalGeonsu) {
		this.buchalGeonsu = buchalGeonsu;
	}
	public String getNagchalGeonsu() {
		return nagchalGeonsu;
	}
	public void setNagchalGeonsu(String nagchalGeonsu) {
		this.nagchalGeonsu = nagchalGeonsu;
	}
	public String getNagchalRatio() {
		return nagchalRatio;
	}
	public void setNagchalRatio(String nagchalRatio) {
		this.nagchalRatio = nagchalRatio;
	}
	public String getGamjeongga() {
		return gamjeongga;
	}
	public void setGamjeongga(String gamjeongga) {
		this.gamjeongga = gamjeongga;
	}
	public String getMinIbchalga() {
		return minIbchalga;
	}
	public void setMinIbchalga(String minIbchalga) {
		this.minIbchalga = minIbchalga;
	}
	
	
}
