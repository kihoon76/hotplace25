package com.hotplace25.config;

import java.util.List;

import javax.annotation.Resource;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import com.hotplace25.domain.ApplicationConfig;
import com.hotplace25.domain.SystemConfig;
import com.hotplace25.service.SystemService;

@Component
public class HotplaceListener {

	private final static Logger logger = LoggerFactory.getLogger(HotplaceListener.class);
	
	@Resource(name="systemService")
	SystemService systemService;
	
	@Resource(name="applicationConfig")
	ApplicationConfig applicationConfig;
	
	@EventListener
	public void initApp(ContextRefreshedEvent event) {
		try {
			
			List<SystemConfig> config = systemService.getSystemConfigs();
			int cnt = config.size();
			
			for(int i=0; i<cnt; i++) {
				applicationConfig.setConfig(config.get(i).getNum(), config.get(i));
			}
		}
		catch(Exception e) {
			//디비오류시 DEFAULT 동작
			logger.error("####################################################");
			logger.error("# 디비오류발생 DEFAULT 동작 #");
			logger.error(e.getMessage());
			logger.error("####################################################");
			
			ErrorPolicy.setDefaultSystemConfig(applicationConfig);
		}
	}
	
}
