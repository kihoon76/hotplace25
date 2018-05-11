package com.hotplace25.config;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.context.ApplicationListener;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.session.SessionDestroyedEvent;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import com.hotplace25.service.UserService;

@Component
public class LogoutListener implements ApplicationListener<SessionDestroyedEvent> {

	@Resource(name="userService")
	UserService userService;
	
	@Override
	public void onApplicationEvent(SessionDestroyedEvent event) {
		List<SecurityContext> lstSecurityContext = event.getSecurityContexts();
        UserDetails ud;
        for (SecurityContext securityContext : lstSecurityContext) {
            ud = (UserDetails) securityContext.getAuthentication().getPrincipal();
            Map<String, String> m = new HashMap<String, String>();
            m.put("ID", ud.getUsername());
            m.put("YN", "N");
            userService.writeLogInOut(m);
        }
	}
}
