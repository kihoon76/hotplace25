package com.hotplace25.domain;

import org.apache.ibatis.type.Alias;

@Alias("GongmaeImage")
public class GongmaeImage extends GongmaeKey {

	private String image;
	private String ext;
	
	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getExt() {
		return ext;
	}

	public void setExt(String ext) {
		this.ext = ext;
	}
}
