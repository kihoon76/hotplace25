package com.hotplace25.util;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.hotplace25.domain.Account;

public class ValidationUtil {

	private final static String EMAIL_REGEX = "^[\\w-\\+]+(\\.[\\w]+)*@[\\w-]+(\\.[\\w]+)*(\\.[a-z]{2,})$";
	private final static String PASSWORD_REGEX = "(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,}";
	private final static String PHONE_REGEX = "\\d{2,4}-\\d{3,4}-\\d{4}";
	
	private static boolean isValid(String value, String regex) {
		if(value == null || "".equals(value.trim())) return false;
		
		Pattern pattern = Pattern.compile(regex, Pattern.CASE_INSENSITIVE);
		Matcher matcher = pattern.matcher(value);
		
		return matcher.matches();
	}
	
	public static boolean isValidEmail(String email) {
		return isValid(email, EMAIL_REGEX);
	}
	
	public static boolean isValidPassword(String password) {
		return isValid(password, PASSWORD_REGEX);
	}
	
	public static boolean isValidPhone(String phone) {
		return isValid(phone, PHONE_REGEX);
	}
	
	public static boolean isValidAccount(Account account) {
		return isValidEmail(account.getEmail()) &&
			   isValidPassword(account.getPassword()) &&
			   isValidPhone(account.getPhone());
	}
}
