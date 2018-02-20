package com.hotplace25.domain;

import java.util.List;

import org.apache.ibatis.type.Alias;

@Alias("GyeongGongmaeIn")
public class GyeongGongmaeIn {

	private String[] jiyeog;
	private String[] jimok;
	private String[] mulgeonKind;
	private String[] jiboon;
	private String[] yongdoJiyeog;
	private String[] yongdoJigu;
	private String[] yongdoGuyeog;
	private String[] etcLawLimit;
	private String[] etcChamgo;
	private String[] cityPlan;
	private String[] cityPlanState;
	private String[] bosangPyeonib;
	private String[] tojiUseLimitCancel;
	
	private List<MinMax> gamjeongga;
	private List<MinMax> minIbchalga;
	private List<MinMax> gongsi;
	private List<MinMax> minIbchalgaR;
	private MinMax hpGrade;
	private MinMax envGrade;
	

	public String[] getJiyeog() {
		return jiyeog;
	}

	public void setJiyeog(String[] jiyeog) {
		this.jiyeog = jiyeog;
	}

	public String[] getJimok() {
		return jimok;
	}

	public void setJimok(String[] jimok) {
		this.jimok = jimok;
	}

	public List<MinMax> getGamjeongga() {
		return gamjeongga;
	}

	public void setGamjeongga(List<MinMax> gamjeongga) {
		this.gamjeongga = gamjeongga;
	}

	public List<MinMax> getMinIbchalga() {
		return minIbchalga;
	}

	public void setMinIbchalga(List<MinMax> minIbchalga) {
		this.minIbchalga = minIbchalga;
	}

	public String[] getMulgeonKind() {
		return mulgeonKind;
	}

	public void setMulgeonKind(String[] mulgeonKind) {
		this.mulgeonKind = mulgeonKind;
	}

	public String[] getJiboon() {
		return jiboon;
	}

	public void setJiboon(String[] jiboon) {
		this.jiboon = jiboon;
	}

	public String[] getYongdoJiyeog() {
		return yongdoJiyeog;
	}

	public void setYongdoJiyeog(String[] yongdoJiyeog) {
		this.yongdoJiyeog = yongdoJiyeog;
	}

	public String[] getYongdoJigu() {
		return yongdoJigu;
	}

	public void setYongdoJigu(String[] yongdoJigu) {
		this.yongdoJigu = yongdoJigu;
	}

	public String[] getYongdoGuyeog() {
		return yongdoGuyeog;
	}

	public void setYongdoGuyeog(String[] yongdoGuyeog) {
		this.yongdoGuyeog = yongdoGuyeog;
	}

	public String[] getEtcLawLimit() {
		return etcLawLimit;
	}

	public void setEtcLawLimit(String[] etcLawLimit) {
		this.etcLawLimit = etcLawLimit;
	}

	public String[] getEtcChamgo() {
		return etcChamgo;
	}

	public void setEtcChamgo(String[] etcChamgo) {
		this.etcChamgo = etcChamgo;
	}

	public String[] getCityPlan() {
		return cityPlan;
	}

	public void setCityPlan(String[] cityPlan) {
		this.cityPlan = cityPlan;
	}

	public String[] getCityPlanState() {
		return cityPlanState;
	}

	public void setCityPlanState(String[] cityPlanState) {
		this.cityPlanState = cityPlanState;
	}

	public String[] getBosangPyeonib() {
		return bosangPyeonib;
	}

	public void setBosangPyeonib(String[] bosangPyeonib) {
		this.bosangPyeonib = bosangPyeonib;
	}

	public String[] getTojiUseLimitCancel() {
		return tojiUseLimitCancel;
	}

	public void setTojiUseLimitCancel(String[] tojiUseLimitCancel) {
		this.tojiUseLimitCancel = tojiUseLimitCancel;
	}

	public List<MinMax> getGongsi() {
		return gongsi;
	}

	public void setGongsi(List<MinMax> gongsi) {
		this.gongsi = gongsi;
	}

	public List<MinMax> getMinIbchalgaR() {
		return minIbchalgaR;
	}

	public void setMinIbchalgaR(List<MinMax> minIbchalgaR) {
		this.minIbchalgaR = minIbchalgaR;
	}

	public MinMax getHpGrade() {
		return hpGrade;
	}

	public void setHpGrade(MinMax hpGrade) {
		this.hpGrade = hpGrade;
	}

	public MinMax getEnvGrade() {
		return envGrade;
	}

	public void setEnvGrade(MinMax envGrade) {
		this.envGrade = envGrade;
	}
}
