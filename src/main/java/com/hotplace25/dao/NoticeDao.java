package com.hotplace25.dao;

import java.util.List;
import java.util.Map;

import com.hotplace25.domain.Notice;
import com.hotplace25.domain.NoticePage;

public interface NoticeDao {

	List<Notice> selectNoticeList();

	NoticePage selectPage(Map map);

	String selectNoticeContent(int writeNum);

}
