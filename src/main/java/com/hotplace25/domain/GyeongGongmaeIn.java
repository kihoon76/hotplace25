package com.hotplace25.domain;

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
	
	private String[] gamjeongga;
	private String[] minIbchalga;
	private String[] gongsi;
	private String[] minIbchalgaR;
	private MinMax hpGrade;
	private MinMax envGrade;
	
	
	private String paramJiyeog;
	private String paramJimok;
	private String paramMulgeonKind;
	private String paramJiboon;
	private String paramYongdoJiyeog;
	private String paramYongdoJigu;
	private String paramYongdoGuyeog;
	private String paramEtcLawLimit;
	private String paramEtcChamgo;
	private String paramCityPlan;
	private String paramCityPlanStateJeon;  //전필
	private String paramCityPlanStateJeo;   //저촉
	private String paramCityPlanStateJeob;  //접함
	private String paramBosangPyeonib;
	private String paramGamjeongga;
	private String paramMinIbchalga;
	private String paramGongsi;
	private String paramMinIbchalgaR;
	
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

	public String[] getGamjeongga() {
		return gamjeongga;
	}

	public void setGamjeongga(String[] gamjeongga) {
		this.gamjeongga = gamjeongga;
	}

	public String[] getMinIbchalga() {
		return minIbchalga;
	}

	public void setMinIbchalga(String[] minIbchalga) {
		this.minIbchalga = minIbchalga;
	}

	public String[] getGongsi() {
		return gongsi;
	}

	public void setGongsi(String[] gongsi) {
		this.gongsi = gongsi;
	}

	public String[] getMinIbchalgaR() {
		return minIbchalgaR;
	}

	public void setMinIbchalgaR(String[] minIbchalgaR) {
		this.minIbchalgaR = minIbchalgaR;
	}

	public String getParamJiyeog() {
		return paramJiyeog;
	}

	public void setParamJiyeog(String paramJiyeog) {
		this.paramJiyeog = paramJiyeog;
	}

	public String getParamJimok() {
		return paramJimok;
	}

	public void setParamJimok(String paramJimok) {
		this.paramJimok = paramJimok;
	}

	public String getParamMulgeonKind() {
		return paramMulgeonKind;
	}

	public void setParamMulgeonKind(String paramMulgeonKind) {
		this.paramMulgeonKind = paramMulgeonKind;
	}

	public String getParamJiboon() {
		return paramJiboon;
	}

	public void setParamJiboon(String paramJiboon) {
		this.paramJiboon = paramJiboon;
	}

	public String getParamYongdoJiyeog() {
		return paramYongdoJiyeog;
	}

	public void setParamYongdoJiyeog(String paramYongdoJiyeog) {
		this.paramYongdoJiyeog = paramYongdoJiyeog;
	}

	public String getParamYongdoJigu() {
		return paramYongdoJigu;
	}

	public void setParamYongdoJigu(String paramYongdoJigu) {
		this.paramYongdoJigu = paramYongdoJigu;
	}

	public String getParamYongdoGuyeog() {
		return paramYongdoGuyeog;
	}

	public void setParamYongdoGuyeog(String paramYongdoGuyeog) {
		this.paramYongdoGuyeog = paramYongdoGuyeog;
	}

	public String getParamEtcLawLimit() {
		return paramEtcLawLimit;
	}

	public void setParamEtcLawLimit(String paramEtcLawLimit) {
		this.paramEtcLawLimit = paramEtcLawLimit;
	}

	public String getParamEtcChamgo() {
		return paramEtcChamgo;
	}

	public void setParamEtcChamgo(String paramEtcChamgo) {
		this.paramEtcChamgo = paramEtcChamgo;
	}

	public String getParamCityPlan() {
		return paramCityPlan;
	}

	public void setParamCityPlan(String paramCityPlan) {
		this.paramCityPlan = paramCityPlan;
	}

	public String getParamCityPlanStateJeon() {
		return paramCityPlanStateJeon;
	}

	public void setParamCityPlanStateJeon(String paramCityPlanStateJeon) {
		this.paramCityPlanStateJeon = paramCityPlanStateJeon;
	}

	public String getParamCityPlanStateJeo() {
		return paramCityPlanStateJeo;
	}

	public void setParamCityPlanStateJeo(String paramCityPlanStateJeo) {
		this.paramCityPlanStateJeo = paramCityPlanStateJeo;
	}

	public String getParamCityPlanStateJeob() {
		return paramCityPlanStateJeob;
	}

	public void setParamCityPlanStateJeob(String paramCityPlanStateJeob) {
		this.paramCityPlanStateJeob = paramCityPlanStateJeob;
	}

	public String getParamBosangPyeonib() {
		return paramBosangPyeonib;
	}

	public void setParamBosangPyeonib(String paramBosangPyeonib) {
		this.paramBosangPyeonib = paramBosangPyeonib;
	}

	public String getParamGamjeongga() {
		return paramGamjeongga;
	}

	public void setParamGamjeongga(String paramGamjeongga) {
		this.paramGamjeongga = paramGamjeongga;
	}

	public String getParamMinIbchalga() {
		return paramMinIbchalga;
	}

	public void setParamMinIbchalga(String paramMinIbchalga) {
		this.paramMinIbchalga = paramMinIbchalga;
	}

	public String getParamGongsi() {
		return paramGongsi;
	}

	public void setParamGongsi(String paramGongsi) {
		this.paramGongsi = paramGongsi;
	}

	public String getParamMinIbchalgaR() {
		return paramMinIbchalgaR;
	}

	public void setParamMinIbchalgaR(String paramMinIbchalgaR) {
		this.paramMinIbchalgaR = paramMinIbchalgaR;
	}

	
}
