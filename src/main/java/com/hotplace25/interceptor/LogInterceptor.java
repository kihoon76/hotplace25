package com.hotplace25.interceptor;

import java.net.URLDecoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import com.google.gson.Gson;
import com.hotplace25.amqp.Producer;
import com.hotplace25.domain.LogVO;
import com.hotplace25.util.HttpHeaderUtil;


public class LogInterceptor extends HandlerInterceptorAdapter {

	@Autowired
	private Producer producer;
	private Gson gson = new Gson();
	
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		
		String ip = HttpHeaderUtil.getClientIP(request);
		
		if(!ip.startsWith("192.")) {
			LogVO log = new LogVO();
			
			log.setIp(ip);
			log.setId(getId());
			log.setReferer(request.getHeader("referer"));
			log.setUrl(request.getRequestURL().toString());
			
			String param = request.getQueryString();
			if(param != null) {
				log.setParameter(URLDecoder.decode(param, "UTF-8"));
			}
			
			
			producer.sendMessage(gson.toJson(log));
		}
		
		return true;
	}
	
	private String getId() {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		return auth.getName();
	}

}
