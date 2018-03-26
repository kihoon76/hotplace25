package com.hotplace25.dao;

import java.util.List;

import com.hotplace25.domain.GyeongGongmaeIn;
import com.hotplace25.domain.GyeongGongmaeOut;
import com.hotplace25.domain.Jangmi;
import com.hotplace25.domain.ToojaSearchResult;

public interface SearchDao {

	List<GyeongGongmaeOut> selectGyeongGongList(GyeongGongmaeIn gyeongGongIn);

	List<ToojaSearchResult> selectJangmiList(Jangmi jangmiIn);

}
