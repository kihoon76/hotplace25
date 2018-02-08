package com.hotplace25.service;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.hotplace25.dao.SpotDao;
import com.hotplace25.domain.Consulting;
import com.hotplace25.domain.Maemul;

@Service("spotService")
public class SpotService {

	@Resource(name="spotDao")
	SpotDao spotDao;
	
	public boolean regMaemulNoPic(Maemul maemul) {
		return 1 == spotDao.insertMaemulNoPic(maemul);
	}
	
	public boolean doRegistedMaemul(Maemul maemul) {
		return 1 == spotDao.selectRegistedMaemul(maemul);
	}

	@Transactional(isolation=Isolation.DEFAULT, 
				   propagation=Propagation.REQUIRED, 
				   rollbackFor=Exception.class,
				   timeout=10)//timeout 초단위
	public void regMaemul(Maemul maemul) {
		int r1 = spotDao.insertMaemul(maemul);
		int r2 = spotDao.insertMaemulImages(maemul);
		
		if((r1 + r2) != maemul.getFiles().size() + 1) {
			throw new RuntimeException("Error!!!!!");
		}
	}

	public boolean doRegistedConsulting(Consulting consulting) {
		return 1 == spotDao.selectRegistedConsulting(consulting);
	}

	public void regConsulting(Consulting consulting) {
		spotDao.insertConsulting(consulting);
		
	}
}
