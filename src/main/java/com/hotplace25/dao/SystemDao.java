package com.hotplace25.dao;

import java.util.List;

import com.hotplace25.domain.SystemConfig;

public interface SystemDao {

	public List<SystemConfig> selectSystemConfigs();

	public SystemConfig selectSystemConfig(String configKey);
}
