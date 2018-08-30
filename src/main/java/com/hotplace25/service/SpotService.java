package com.hotplace25.service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.hotplace25.dao.SpotDao;
import com.hotplace25.domain.Consulting;
import com.hotplace25.domain.GwansimMulgeon;
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
		return 1 <= spotDao.selectRegistedConsulting(consulting);
	}

	public void regConsulting(Consulting consulting) {
		spotDao.insertConsulting(consulting);
		
	}

	public List<GwansimMulgeon> getMyGwansimList(String accountId) {
		return spotDao.selectMyGwansimList(accountId);
	}

	public GwansimMulgeon doRegistedGwansimMulgeon(GwansimMulgeon gwansimMulgeon) {
		return spotDao.selectRegistedGwansimMulgeon(gwansimMulgeon);
	}

	public boolean regGwansimMulgeon(GwansimMulgeon gwansimMulgeon) {
		return 1 <= spotDao.insertGwansimMulgeon(gwansimMulgeon);
		
	}

	public boolean removeMyGwansimMulgeon(GwansimMulgeon gwansimMulgeon) {
		return 1 == spotDao.deleteMyGwansimMulgeon(gwansimMulgeon);
		
	}

	public GwansimMulgeon getMyGwansim(GwansimMulgeon gm) {
		return spotDao.selectMyGwansim(gm);
	}

	public boolean modifyMyGwansimMulgeon(GwansimMulgeon gm) {
		return 1 == spotDao.updateMyGwansimMulgeon(gm);
	}

	public Map<String, String> getTojiDefaultInfo(String pnu) {
		return spotDao.selectTojiDefaultInfo(pnu);
	}
}
