package com.hotplace25.service;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.hotplace25.dao.SystemDao;
import com.hotplace25.domain.SystemConfig;

@Service("systemService")
public class SystemService {
	@Resource(name="systemDao")
	SystemDao systemDao;
	
	public List<SystemConfig> getSystemConfigs() {
		return systemDao.selectSystemConfigs();
	}

	public SystemConfig getSystemConfig(String configKey) {
		return systemDao.selectSystemConfig(configKey);
	}
}
