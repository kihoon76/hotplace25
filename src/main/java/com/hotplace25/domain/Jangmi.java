package com.hotplace25.domain;

import org.apache.ibatis.type.Alias;

@Alias("Jangmi")
public class Jangmi extends Latlng {

	private int num;
	private String jibeon;
	private String cityPlan;
	private String cityPlanState;
	private String cityPlanStateJeon;  //전필
	private String cityPlanStateJeo;   //저촉
	private String cityPlanStateJeob;  //접함
	private String bosangPyeonib;
	private String jiyeok;
	private String jimok;
	private String gongsi;
	private String yongdoJiyeog;
	private String yongdoJigu;
	private String yongdoGuyeog;
	private String etcLawLimit;
	private String etcChamgo;
	private String hpGrade;
	private String gyeongsado;
	private String jyeobdoState;
	private String envGrade;
	private String tojiUseLimitCancel;
	
	public String getJibeon() {
		return jibeon;
	}
	public void setJibeon(String jibeon) {
		this.jibeon = jibeon;
	}
	public String getCityPlan() {
		return cityPlan;
	}
	public void setCityPlan(String cityPlan) {
		this.cityPlan = cityPlan;
	}
	public String getCityPlanState() {
		return cityPlanState;
	}
	public void setCityPlanState(String cityPlanState) {
		this.cityPlanState = cityPlanState;
	}
	public String getBosangPyeonib() {
		return bosangPyeonib;
	}
	public void setBosangPyeonib(String bosangPyeonib) {
		this.bosangPyeonib = bosangPyeonib;
	}
	public String getJiyeok() {
		return jiyeok;
	}
	public void setJiyeok(String jiyeok) {
		this.jiyeok = jiyeok;
	}
	public String getJimok() {
		return jimok;
	}
	public void setJimok(String jimok) {
		this.jimok = jimok;
	}
	public String getGongsi() {
		return gongsi;
	}
	public void setGongsi(String gongsi) {
		this.gongsi = gongsi;
	}
	public String getYongdoJiyeog() {
		return yongdoJiyeog;
	}
	public void setYongdoJiyeog(String yongdoJiyeog) {
		this.yongdoJiyeog = yongdoJiyeog;
	}
	public String getYongdoJigu() {
		return yongdoJigu;
	}
	public void setYongdoJigu(String yongdoJigu) {
		this.yongdoJigu = yongdoJigu;
	}
	public String getYongdoGuyeog() {
		return yongdoGuyeog;
	}
	public void setYongdoGuyeog(String yongdoGuyeog) {
		this.yongdoGuyeog = yongdoGuyeog;
	}
	public String getEtcLawLimit() {
		return etcLawLimit;
	}
	public void setEtcLawLimit(String etcLawLimit) {
		this.etcLawLimit = etcLawLimit;
	}
	public String getEtcChamgo() {
		return etcChamgo;
	}
	public void setEtcChamgo(String etcChamgo) {
		this.etcChamgo = etcChamgo;
	}
	public String getHpGrade() {
		return hpGrade;
	}
	public void setHpGrade(String hpGrade) {
		this.hpGrade = hpGrade;
	}
	public String getGyeongsado() {
		return gyeongsado;
	}
	public void setGyeongsado(String gyeongsado) {
		this.gyeongsado = gyeongsado;
	}
	public String getJyeobdoState() {
		return jyeobdoState;
	}
	public void setJyeobdoState(String jyeobdoState) {
		this.jyeobdoState = jyeobdoState;
	}
	public String getEnvGrade() {
		return envGrade;
	}
	public void setEnvGrade(String envGrade) {
		this.envGrade = envGrade;
	}
	public String getTojiUseLimitCancel() {
		return tojiUseLimitCancel;
	}
	public void setTojiUseLimitCancel(String tojiUseLimitCancel) {
		this.tojiUseLimitCancel = tojiUseLimitCancel;
	}
	public int getNum() {
		return num;
	}
	public void setNum(int num) {
		this.num = num;
	}
	public String getCityPlanStateJeon() {
		return cityPlanStateJeon;
	}
	public void setCityPlanStateJeon(String cityPlanStateJeon) {
		this.cityPlanStateJeon = cityPlanStateJeon;
	}
	public String getCityPlanStateJeo() {
		return cityPlanStateJeo;
	}
	public void setCityPlanStateJeo(String cityPlanStateJeo) {
		this.cityPlanStateJeo = cityPlanStateJeo;
	}
	public String getCityPlanStateJeob() {
		return cityPlanStateJeob;
	}
	public void setCityPlanStateJeob(String cityPlanStateJeob) {
		this.cityPlanStateJeob = cityPlanStateJeob;
	}
}
