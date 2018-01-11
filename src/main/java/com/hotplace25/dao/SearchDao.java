package com.hotplace25.dao;

import java.util.List;

import com.hotplace25.domain.GyeongGongmaeIn;
import com.hotplace25.domain.GyeongGongmaeOut;

public interface SearchDao {

	List<GyeongGongmaeOut> selectGyeongGongList(GyeongGongmaeIn gyeongGongIn);

}
