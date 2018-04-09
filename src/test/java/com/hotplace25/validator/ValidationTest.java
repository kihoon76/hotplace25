package com.hotplace25.validator;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.junit.Test;

public class ValidationTest {

	@Test
	public void test01_Password() {
		
		String PASSWORD_REGEX = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[$@$!%*#?&])[A-Za-z\\d$@$!%*#?&]{8,}$";
		Pattern pattern = Pattern.compile(PASSWORD_REGEX, Pattern.CASE_INSENSITIVE);
		Matcher matcher = pattern.matcher("Nkh4320");
		
		System.err.println(matcher.matches());
	}
}
