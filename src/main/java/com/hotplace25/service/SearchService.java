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
import com.hotplace25.util.StringUtil;

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
		
		return luris;
	}

	public Map<String, String> getSujiboonseogBase(String pnu) {
		List<List<Map<String, Object>>> sujiBase = searchDao.selectSujiboonseogBase(pnu);
		Map<String, String> result = null;
		
		if(sujiBase != null) {
			result = new HashMap<String, String>();
			result.put("pnu", "");
			result.put("jimok", "");
			result.put("area", "");
			result.put("hpIndex", "");
			result.put("hpGrade", "");
			result.put("hpSuji", "");
			result.put("gongsi", "0");
			result.put("gugtolaw", "");
			result.put("etclaw", "");
			result.put("boochickadd", "");
			result.put("tojiuse", "");
			
			//pnu, jimok(지목), area(면적), gongsi(공시지가)
			if(sujiBase.get(0) != null && sujiBase.get(0).get(0) != null) {
				Map<String, Object> m = sujiBase.get(0).get(0);
				String gongsi = StringUtil.getStringNullValue(m.get("gongsi"));
				
				if("".equals(gongsi)) {
					gongsi = "0";
				}
				else {
					//. 제거
					String[] gongsiArr = gongsi.split("\\.");
					gongsi = gongsiArr[0];
				}
				
				result.put("pnu", String.valueOf(m.get("pnu")));
				result.put("jimok", StringUtil.getStringNullValue(m.get("jimok")));
				result.put("area", StringUtil.getStringNullValue(m.get("area")));
				result.put("gongsi", gongsi);
				result.put("hpIndex", StringUtil.getStringNullValue(m.get("hpIndex")));
				result.put("hpGrade", StringUtil.getStringNullValue(m.get("hpGrade")));
				result.put("hpSuji", StringUtil.getStringNullValue(m.get("hpSuji")));
			}
			
			//국토법지역지구
			if(sujiBase.get(1) != null) {
				result.put("gugtolaw", StringUtil.getStringNullValue(sujiBase.get(1).get(0)));
			}
			
			//다른법령지역지구
			if(sujiBase.get(2) != null) {
				result.put("etclaw", StringUtil.getStringNullValue(sujiBase.get(2).get(0)).replaceAll("&lt;", "").replaceAll("&gt;", " "));
			}
			
			//시행부칙추가확인
			if(sujiBase.get(3) != null) {
				result.put("boochickadd", StringUtil.getStringNullValue(sujiBase.get(3).get(0)));
			}
			
			//토지이용시행령
			if(sujiBase.get(4) != null) {
				result.put("tojiuse", StringUtil.getStringNullValue(sujiBase.get(4).get(0)));
			}
			
			Map<String, String> luris = getLurisDrawing(pnu);
			
			if(luris != null) result.put("luris", luris.get("image"));
		}

		
		return result;
	}

	public List<Map<String, String>> getSujiboonseogGongsiHistory(String pnu) {
		return searchDao.selectSujiboonseogGongsiHistory(pnu);
	}

	public String getAddrToPnu(String addr) {
		return searchDao.selectPnuFromAddress(addr);
	}
}
