package com.hotplace25.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class SSLInterceptor extends HandlerInterceptorAdapter {

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		String url = request.getRequestURL().toString();
		
//		if(url.startsWith("http://")) {
//			url = url.replace("http://", "https://");
//			response.sendRedirect(url);
//			return false;
//		}
		
		return true;
	}
	
	
}