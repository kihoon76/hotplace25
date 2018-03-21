package com.hotplace25.dao;

import com.hotplace25.domain.Account;

public interface UserDao {

	public Account getAccount(String id);

	public int selectIdCount(String id);

	public void insertJoin(Account account);

	public boolean updateUserInfo(Account account);
}
