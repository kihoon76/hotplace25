package com.hotplace25.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

import com.hotplace25.domain.Account;

public class SessionUtil {

	public static String getSessionUserId() {
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Account user = (Account)auth.getPrincipal();
		return user.getId();
	}
	
	public static Account getSessionAccount() {
		
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		Account user = (Account)auth.getPrincipal();
		return user;
	}
}
