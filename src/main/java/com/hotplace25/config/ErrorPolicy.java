package com.hotplace25.config;

import com.hotplace25.domain.ApplicationConfig;
import com.hotplace25.domain.SystemConfig;

public class ErrorPolicy {

	public static void setDefaultSystemConfig(ApplicationConfig applicationConfig) {
		//장애공지
		SystemConfig systemConfig = new SystemConfig();
		systemConfig.setNum("C1");
		systemConfig.setValue("off");
		
		//debug
		SystemConfig systemConfig2 = new SystemConfig();
		systemConfig.setNum("C2");
		systemConfig.setValue("on");
		
		applicationConfig.setConfig("C1", systemConfig);
		applicationConfig.setConfig("C2", systemConfig);
	}
}
