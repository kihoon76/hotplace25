package com.hotplace25.dao;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.hotplace25.domain.Consulting;
import com.hotplace25.domain.Maemul;

@Repository("spotDao")
public class SpotDaoImpl implements SpotDao {

	private final static String namespace = "mappers.mssql.spotMapper";
	
	@Resource(name = "msSqlSession")
	SqlSession msSqlSession;
	
	@Override
	public int insertMaemulNoPic(Maemul maemul) {
		return msSqlSession.insert(namespace + ".insertMaemulNoPic", maemul);
	}

	@Override
	public int selectRegistedMaemul(Maemul maemul) {
		return msSqlSession.selectOne(namespace + ".selectRegistedMaemul", maemul);
	}

	@Override
	public int insertMaemul(Maemul maemul) {
		return msSqlSession.insert(namespace + ".insertMaemul", maemul);
	}

	@Override
	public int insertMaemulImages(Maemul maemul) {
		return msSqlSession.insert(namespace + ".insertMaemulImages", maemul);
	}

	@Override
	public int selectRegistedConsulting(Consulting consulting) {
		return msSqlSession.selectOne(namespace + ".selectRegistedConsulting", consulting);
	}

	@Override
	public void insertConsulting(Consulting consulting) {
		msSqlSession.insert(namespace + ".insertConsulting", consulting);		
	}
}
