package com.hotplace25.util;

public class StringUtil {

	public static String getStringNullValue(Object obj) {
		if(obj == null) return "";
		
		try {
			return String.valueOf(obj);
		}
		catch(Exception e) {
			return "";
		}
	}
	
	public static String getAuthNameKor(String authName) {
		String kor = null;
		
		switch(authName) {
		case "ROLE_ALL" :
			kor = "전체이용서비스";
			break;
		case "ROLE_TOOJA" :
			kor = "투자유망검색 서비스";
			break;
		case "ROLE_GYEONGGONG" :
			kor = "경공매검색 서비스";
			break;
		case "ROLE_MULGEON" :
			kor = "물건보기 서비스";
			break;
		case "ROLE_HEATMAP" :
			kor = "히트맵보기 서비스";
			break;
		}
		
		return kor;
	}
	
	
}
