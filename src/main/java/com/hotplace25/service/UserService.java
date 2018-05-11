package com.hotplace25.service;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.hotplace25.dao.UserDao;
import com.hotplace25.domain.Account;

@Service("userService")
public class UserService {

	@Resource(name="userDao")
	private UserDao userDao;
	
	public Account getUserInfo(String username) {
		return userDao.getAccount(username);
	}

	public boolean checkDuplicateId(String id) {
		int cnt = userDao.selectIdCount(id);
		return cnt > 0;
	}

	public void join(Account account) {
		userDao.insertJoin(account);
	}

	public boolean modifyUserInfo(Account account) {
		return userDao.updateUserInfo(account);
	}

	public void modifyUserPw(Account account) {
		userDao.updateUserPw(account);
	}
	
	
	public void writeLogInOut(Map<String, String> param) {
		userDao.updateUserLogInOut(param);
	}
	
	//시스템이 올라올때 계정의 모든 로그인 여부는 N 으로 초기화 한다
	public void initLogout() {
		Map<String, String> param = new HashMap<String, String>();
		param.put("YN", "N");
		userDao.updateUserLogInOut(param);
	}
	
}
