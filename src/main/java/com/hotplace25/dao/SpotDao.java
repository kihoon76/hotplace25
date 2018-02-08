package com.hotplace25.dao;

import com.hotplace25.domain.Consulting;
import com.hotplace25.domain.Maemul;

public interface SpotDao {

	public int insertMaemulNoPic(Maemul maemul);

	public int selectRegistedMaemul(Maemul maemul);

	public int insertMaemul(Maemul maemul);

	public int insertMaemulImages(Maemul maemul);

	public int selectRegistedConsulting(Consulting consulting);

	public void insertConsulting(Consulting consulting);
}
