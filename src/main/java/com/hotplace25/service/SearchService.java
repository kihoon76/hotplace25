package com.hotplace25.service;

import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.util.Base64Utils;

import com.hotplace25.dao.SearchDao;
import com.hotplace25.domain.GyeongGongmaeIn;
import com.hotplace25.domain.GyeongGongmaeOut;
import com.hotplace25.domain.Jangmi;
import com.hotplace25.domain.ToojaSearchResult;
import com.hotplace25.util.DataUtil;

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

	public Map<String, String> getLurisDrawing(String pnu) {
		Map<String, String> luris = searchDao.selectLurisDrawing(pnu);
		
		if(luris !=null && luris.get("image") != null) {
			String sImg = luris.get("image");
			byte[] bImg = DataUtil.hexStringToByteArray(sImg); 
			String b64 = Base64Utils.encodeToString(bImg);
			luris.put("image", "data:image/png;base64," + b64);
		}
		else {
			
		}
		
		return luris;
	}
}
