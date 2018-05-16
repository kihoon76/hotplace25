package com.hotplace25.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

public class SSLInterceptor extends HandlerInterceptorAdapter {
	//private static final Logger logger = LoggerFactory.getLogger(SSLInterceptor.class);
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		String url = request.getRequestURL().toString();
		
		if(url.startsWith("http://")) {
			url = url.replace("http://", "https://");
			response.sendRedirect(url);
			return false;
		}
		
		//logger.debug("url ===> " + url);
		if(url.startsWith("https://hotplace25.com")) {
			url = url.replace("https://hotplace25.com", "https://www.hotplace25.com");
			response.sendRedirect(url);
			return false;
		}
		

		return true;
	}
}
