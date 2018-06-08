package com.hotplace25.dao;

import java.util.List;
import java.util.Map;

import com.hotplace25.domain.GyeongGongmaeIn;
import com.hotplace25.domain.GyeongGongmaeOut;
import com.hotplace25.domain.Jangmi;
import com.hotplace25.domain.ToojaSearchResult;

public interface SearchDao {

	List<GyeongGongmaeOut> selectGyeongGongList(GyeongGongmaeIn gyeongGongIn);

	List<ToojaSearchResult> selectJangmiList(Jangmi jangmiIn);

	Map<String, String> selectLurisDrawing(String pnu);

	List<List<Map<String, Object>>> selectSujiboonseogBase(String pnu);

	List<Map<String, String>> selectSujiboonseogGongsiHistory(String pnu);

	String selectPnuFromAddress(String addr);

}
