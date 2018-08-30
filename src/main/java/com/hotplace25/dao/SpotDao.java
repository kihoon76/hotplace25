package com.hotplace25.dao;

import java.util.List;
import java.util.Map;

import com.hotplace25.domain.Consulting;
import com.hotplace25.domain.GwansimMulgeon;
import com.hotplace25.domain.Maemul;

public interface SpotDao {

	public int insertMaemulNoPic(Maemul maemul);

	public int selectRegistedMaemul(Maemul maemul);

	public int insertMaemul(Maemul maemul);

	public int insertMaemulImages(Maemul maemul);

	public int selectRegistedConsulting(Consulting consulting);

	public void insertConsulting(Consulting consulting);

	public GwansimMulgeon selectRegistedGwansimMulgeon(GwansimMulgeon gwansimMulgeon);

	public int insertGwansimMulgeon(GwansimMulgeon gwansimMulgeon);

	public List<GwansimMulgeon> selectMyGwansimList(String accountId);

	public int deleteMyGwansimMulgeon(GwansimMulgeon gm);

	public GwansimMulgeon selectMyGwansim(GwansimMulgeon gm);

	public int updateMyGwansimMulgeon(GwansimMulgeon gm);

	public Map<String, String> selectTojiDefaultInfo(String pnu);

}
