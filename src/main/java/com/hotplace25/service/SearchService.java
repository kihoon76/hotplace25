package com.hotplace25.service;

import java.io.IOException;
import java.util.List;

import javax.annotation.Resource;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Service;

import com.hotplace25.dao.SearchDao;
import com.hotplace25.domain.GyeongGongmaeIn;
import com.hotplace25.domain.GyeongGongmaeOut;
import com.hotplace25.domain.Jangmi;
import com.hotplace25.domain.ToojaSearchResult;

@Service("searchService")
public class SearchService {

	@Resource(name="searchDao")
	SearchDao searchDao; 
	
	public List<GyeongGongmaeOut> getGyeongGongSearch(GyeongGongmaeIn gyeongGongIn) {
		
		return searchDao.selectGyeongGongList(gyeongGongIn);
	}

	public List<ToojaSearchResult> getJangmiList(Jangmi jangmiIn) {
		List<ToojaSearchResult> list =  searchDao.selectJangmiList(jangmiIn);
		ObjectMapper m = new ObjectMapper();
		try {
			System.err.println(m.writeValueAsString(list));
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return list;
	}
}
