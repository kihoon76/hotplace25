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
}
