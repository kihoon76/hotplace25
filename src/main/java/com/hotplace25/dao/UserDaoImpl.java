package com.hotplace25.dao;

import java.util.Map;

import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Repository;

import com.hotplace25.domain.Account;

@Repository("userDao")
public class UserDaoImpl implements UserDao {

	private final static String namespace = "mappers.mssql.userMapper";
	
	@Resource(name = "msSqlSession")
	SqlSession msSqlSession;
	
	@Override
	public Account getAccount(String id) {
		return msSqlSession.selectOne(namespace + ".selectUser", id);
	}

	@Override
	public int selectIdCount(String id) {
		return msSqlSession.selectOne(namespace + ".selectIdCount", id);
	}

	@Override
	public void insertJoin(Account account) {
		msSqlSession.insert(namespace + ".insertJoin", account);
		
	}

	@Override
	public boolean updateUserInfo(Account account) {
		return 1 == msSqlSession.update(namespace + ".updateUserInfo", account);
	}

	@Override
	public void updateUserPw(Account account) {
		msSqlSession.update(namespace + ".updateUserPw", account);
	}

	@Override
	public void updateUserLogInOut(Map<String, String> param) {
		msSqlSession.update(namespace + ".updateUserLogInOut", param);
	}

}
