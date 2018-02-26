package com.hotplace25.domain;

import java.util.List;

import org.apache.ibatis.type.Alias;

@Alias("GongmaeDetail")
public class GongmaeDetail extends Gongmae {

	private List<GongmaeIbchal> ibchalList;
	private List<GongmaeArea> areaList;
	private List<GongmaeAroundNagchalMulgeon> mulgeonList;
	private List<GongmaeAroundNagchalTonggye> tonggyeList;
	private List<GongmaeGamjeong> gamjeongList;
	private List<GongmaeImage> images;
	

	public List<GongmaeArea> getAreaList() {
		return areaList;
	}

	public void setAreaList(List<GongmaeArea> areaList) {
		this.areaList = areaList;
	}

	public List<GongmaeIbchal> getIbchalList() {
		return ibchalList;
	}

	public void setIbchalList(List<GongmaeIbchal> ibchalList) {
		this.ibchalList = ibchalList;
	}

	public List<GongmaeAroundNagchalMulgeon> getMulgeonList() {
		return mulgeonList;
	}

	public void setMulgeonList(List<GongmaeAroundNagchalMulgeon> mulgeonList) {
		this.mulgeonList = mulgeonList;
	}

	public List<GongmaeAroundNagchalTonggye> getTonggyeList() {
		return tonggyeList;
	}

	public void setTonggyeList(List<GongmaeAroundNagchalTonggye> tonggyeList) {
		this.tonggyeList = tonggyeList;
	}

	public List<GongmaeGamjeong> getGamjeongList() {
		return gamjeongList;
	}

	public void setGamjeongList(List<GongmaeGamjeong> gamjeongList) {
		this.gamjeongList = gamjeongList;
	}

	public List<GongmaeImage> getImages() {
		return images;
	}

	public void setImages(List<GongmaeImage> images) {
		this.images = images;
	}
}
