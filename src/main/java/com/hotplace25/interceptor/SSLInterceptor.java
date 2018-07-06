package com.hotplace25.interceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.hotplace25.util.HttpHeaderUtil;

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
		
		
		//개발계 접근은 내부에서만
		if(url.startsWith("https://hotplace.ddns.net") && url.indexOf("/noAccess") < 0) {
			System.err.println("------------------------");
			String ip = HttpHeaderUtil.getClientIP(request);
			if(!(ip.startsWith("192.") || ip.startsWith("106.253.61"))) {
				response.sendRedirect("https://hotplace.ddns.net/noAccess");
				return false;
			}
		}
		
		if(url.startsWith("https://hotplace25.com")) {
			url = url.replace("https://hotplace25.com", "https://www.hotplace25.com");
			response.sendRedirect(url);
			return false;
		}
		

		return true;
	}
}
