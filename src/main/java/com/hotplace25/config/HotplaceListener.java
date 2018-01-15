package com.hotplace25.config;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.context.ApplicationContext;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.hotplace25.domain.ApplicationConfig;
import com.hotplace25.domain.SystemConfig;
import com.hotplace25.service.SystemService;

@Component
public class HotplaceListener {

	@Resource(name="systemService")
	SystemService systemService;
	
	@Resource(name="applicationConfig")
	ApplicationConfig applicationConfig;
	
	@EventListener
	public void initApp(ContextRefreshedEvent event) {
		List<SystemConfig> config = systemService.getSystemConfigs();
		int cnt = config.size();
		
		for(int i=0; i<cnt; i++) {
			applicationConfig.setConfig(config.get(i).getNum(), config.get(i));
		}
	}

}
