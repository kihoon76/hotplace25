package com.hotplace25.dao;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

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
		
		return msSqlSession.selectList(namespace + ".selectGyeongGongList", gyeongGongIn);
	}

	@Override
	public List<ToojaSearchResult> selectJangmiList(Jangmi jangmiIn) {
		return msSqlSession.selectList(namespace + ".selectJangmiList", jangmiIn);
	}

	@Override
	public Map<String, String> selectLurisDrawing(String pnu) {
		return msSqlSessionAgent2.selectOne(namespace + ".selectLurisDrawing", pnu);
	}

	@Override
	public Map<String, String> selectSujiboonseokBase(String pnu) {
		return msSqlSession.selectOne(namespace + ".selectSujiboonseokBase", pnu);
	}
	
}
