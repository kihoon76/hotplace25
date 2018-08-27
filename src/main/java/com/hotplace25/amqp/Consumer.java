package com.hotplace25.amqp;


import javax.annotation.Resource;

import org.apache.ibatis.session.SqlSession;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Component;

import com.google.gson.Gson;
import com.hotplace25.domain.LogVO;


//@Component
public class Consumer {
	
	private final static Logger logger = LoggerFactory.getLogger(Consumer.class);
	private final static String namespace = "mappers.mssql.logMapper";
	
	@Resource(name = "msSqlSession")
	private SqlSession msSqlSession;
	private Gson gson = new Gson();
	

	public void handleMessage(Object message) {
		try {
			LogVO log = gson.fromJson((String)message, LogVO.class);
			msSqlSession.insert(namespace + ".insertLog", log);
		}
		catch(Exception e) {
			//디비 에러처리
			logger.error(e.getMessage());
		}
		
	}
}
