package com.hotplace25.service;

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
	
}
