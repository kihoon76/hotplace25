package com.hotplace25.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.hotplace25.dao.SearchDao;
import com.hotplace25.domain.GyeongGongmaeIn;
import com.hotplace25.domain.GyeongGongmaeOut;

@Service("searchService")
public class SearchService {

	@Resource(name="searchDao")
	SearchDao searchDao; 
	
	public List<GyeongGongmaeOut> getGyeongGongSearch(GyeongGongmaeIn gyeongGongIn) {
		
		return searchDao.selectGyeongGongList(gyeongGongIn);
	}
}
