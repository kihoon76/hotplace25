package com.hotplace25.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.hotplace25.domain.AcceptBuilding;
import com.hotplace25.domain.Address;
import com.hotplace25.domain.BosangPyeonib;
import com.hotplace25.domain.Gongmae;
import com.hotplace25.domain.GongmaeDetail;
import com.hotplace25.domain.Gyeongmae;
import com.hotplace25.domain.Silgeolae;
import com.hotplace25.domain.Yaggwan;

@Repository("hotplaceDao")
public class HotplaceDaoImpl implements HotplaceDao {

	private final static String namespace = "mappers.mssql.hotplaceMapper";
	
	@Resource(name = "msSqlSession")
	SqlSession msSqlSession;
	
	@Resource(name = "msSqlSessionAgent")
	SqlSession msSqlSessionAgent;
	
	@Resource(name = "msSqlSessionAgent2")
	SqlSession msSqlSessionAgent2;
	
	@Override
	public List<String> selectListGuGun(String si) {
		
		return msSqlSession.selectList(namespace + ".selectGuGun", si);
	}

	@Override
	public List<String> selectListRegionName(Address addr) {
		return msSqlSession.selectList(namespace + ".selectRegionName", addr);
	}

	@Override
	public List<String> selectListAddress(Address address) {
		return msSqlSession.selectList(namespace + ".selectAddress", address);
	}

	@Override
	public List<String> selectListLocationBounds(Map<String, String> param) {
		return msSqlSession.selectList(namespace + ".selectLocationBounds", param);
	}
	
	@Override
	public List<String> selectGyeongmaeMarker(Map<String, String> param) {
		return msSqlSessionAgent2.selectList(namespace + ".selectGyeongmaeMarker", param);
	}

	@Override
	public Gyeongmae selectGyeongmaeThumb(String unu) {
		return msSqlSessionAgent2.selectOne(namespace + ".selectGyeongmaeThumb", unu);
	}

	@Override
	public Gyeongmae selectGyeongmaeDetail(Map<String, String> param) {
		return msSqlSessionAgent2.selectOne(namespace + ".selectGyeongmaeDetail", param);
	}

	@Override
	public List<String> selectGongmaeMarker(Map<String, String> param) {
		return msSqlSessionAgent2.selectList(namespace + ".selectGongmaeMarker", param);
	}

	@Override
	public List<String> selectListMulgeonAddress(Address address) {
		return msSqlSession.selectList(namespace + ".selectMulgeonAddress", address);
	}

	@Override
	public Gongmae selectGongmaeThumb(String unu) {
		return msSqlSessionAgent2.selectOne(namespace + ".selectGongmaeThumb", unu);
	}

	@Override
	public List<String> selectBosangMarker(Map<String, String> param) {
		return msSqlSession.selectList(namespace + ".selectBosangPyeonibMarker", param);
	}

	@Override
	public BosangPyeonib selectBosangPyeonibThumb(String unu) {
		return msSqlSession.selectOne(namespace + ".selectBosangPyeonibThumb", unu);
	}

	@Override
	public List<String> selectSilgeolaeMarker(Map<String, String> param) {
		return msSqlSessionAgent.selectList(namespace + ".selectSilgeolaeMarker", param);
	}

	@Override
	public Silgeolae selectSilgeolaeThumb(String pnu) {
		return msSqlSessionAgent.selectOne(namespace + ".selectSilgeolaeThumb", pnu);
	}

	@Override
	public List<String> selectAcceptBuildingMarker(Map<String, String> param) {
		
		return msSqlSessionAgent2.selectList(namespace + ".selectAcceptBuildingMarker", param);
	}

	@Override
	public AcceptBuilding selectAcceptbuildingThumb(String unu) {
		return msSqlSessionAgent2.selectOne(namespace + ".selectAcceptbuildingThumb", unu);
	}

	@Override
	public List<String> selectBosangPyeonibGroupList(HashMap gunus) {
		
		return msSqlSession.selectList(namespace + ".selectBosangPyeonibGroupList", gunus);
	}

	@Override
	public List<Yaggwan> selectYaggwanList() {
		return msSqlSession.selectList(namespace + ".selectYaggwanList");
	}

	@Override
	public GongmaeDetail selectGongmaeDetail(String goyubeonho) {
		return msSqlSessionAgent2.selectOne(namespace + ".selectGongmaeDetail", goyubeonho);
	}

	@Override
	public String selectCurrentYear() {
		return msSqlSession.selectOne(namespace + ".selectCurrentYear");
	}
}
