package com.hotplace25.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.hotplace25.domain.AcceptBuilding;
import com.hotplace25.domain.Address;
import com.hotplace25.domain.BosangPyeonib;
import com.hotplace25.domain.Gongmae;
import com.hotplace25.domain.GongmaeDetail;
import com.hotplace25.domain.Gyeongmae;
import com.hotplace25.domain.QnA;
import com.hotplace25.domain.Silgeolae;
import com.hotplace25.domain.Yaggwan;

public interface HotplaceDao {

	public List<String> selectListGuGun(String si);

	public List<String> selectListRegionName(Address addr);

	public List<String> selectListAddress(Address address);

	public List<String> selectListLocationBounds(Map<String, String> param);

	public List<String> selectGyeongmaeMarker(Map<String, String> param);
	
	public Gyeongmae selectGyeongmaeThumb(String unu);

	public Gyeongmae selectGyeongmaeDetail(Map<String, String> param);

	public List<String> selectGongmaeMarker(Map<String, String> param);

	public List<String> selectListMulgeonAddress(Address address);

	public Gongmae selectGongmaeThumb(String unu);

	public List<String> selectBosangMarker(Map<String, String> param);

	public BosangPyeonib selectBosangPyeonibThumb(String unu);

	public List<String> selectSilgeolaeMarker(Map<String, String> param);

	public Silgeolae selectSilgeolaeThumb(String pnu);

	public List<String> selectAcceptBuildingMarker(Map<String, String> param);

	public AcceptBuilding selectAcceptbuildingThumb(String unu);

	public List<String> selectBosangPyeonibGroupList(HashMap m);

	public List<Yaggwan> selectYaggwanList();

	public GongmaeDetail selectGongmaeDetail(String goyubeonho);

	public String selectCurrentYear();

	public void insertQuestion(QnA qna);
}
