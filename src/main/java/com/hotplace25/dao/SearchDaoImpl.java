package com.hotplace25.dao;

import java.util.List;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.hotplace25.domain.GyeongGongmaeIn;
import com.hotplace25.domain.GyeongGongmaeOut;
import com.hotplace25.domain.Jangmi;
import com.hotplace25.domain.ToojaSearchResult;

@Repository("searchDao")
public class SearchDaoImpl implements SearchDao {

	private final static String namespace = "mappers.mssql.searchMapper";
	
	@Resource(name = "msSqlSession")
	SqlSession msSqlSession;
	
	@Resource(name = "msSqlSessionAgent2")
	SqlSession msSqlSessionAgent2;
	
	@Override
	public List<GyeongGongmaeOut> selectGyeongGongList(GyeongGongmaeIn gyeongGongIn) {
		
		return msSqlSessionAgent2.selectList(namespace + ".selectGyeongGongList", gyeongGongIn);
	}

	@Override
	public List<ToojaSearchResult> selectJangmiList(Jangmi jangmiIn) {
		return msSqlSession.selectList(namespace + ".selectJangmiList", jangmiIn);
	}

}
